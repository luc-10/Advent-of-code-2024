#include <iostream>
#include <vector>
#include <fstream>
#include <unordered_map>

int plotAntinodes(std::vector<std::vector<char>> &mat)
{
    std::unordered_map<char, std::vector<std::pair<int, int>>> m;
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat.size(); j++)
        {
            if (mat[i][j] != '.')
            {
                m[mat[i][j]].push_back({i, j});
            }
        }
    }
    std::vector<std::vector<char>> antinodes(mat.size(), std::vector<char>(mat[0].size(), '.'));
    for (const auto &p : m)
    {
        std::vector<std::pair<int, int>> antennas = p.second;
        for (int i = 0; i < antennas.size(); i++)
        {
            for (int j = i + 1; j < antennas.size(); j++)
            {

                std::pair<int, int> dist = {antennas[i].first - antennas[j].first, antennas[i].second - antennas[j].second};
                std::pair<int, int> coords = antennas[i];
                antinodes[coords.first][coords.second] = '#';
                while (coords.first + dist.first >= 0 && coords.first + dist.first < mat.size() && coords.second + dist.second >= 0 && coords.second + dist.second < mat[i].size())
                {
                    if (antinodes[coords.first + dist.first][coords.second + dist.second] == '.')
                    {
                        antinodes[coords.first + dist.first][coords.second + dist.second] = '#';
                    }
                    coords.first += dist.first;
                    coords.second += dist.second;
                }
                coords.first -= dist.first;
                coords.second -= dist.second;
                dist.first *= -1;
                dist.second *= -1;
                while (coords.first + dist.first >= 0 && coords.first + dist.first < mat.size() && coords.second + dist.second >= 0 && coords.second + dist.second < mat[i].size())
                {
                    if (antinodes[coords.first + dist.first][coords.second + dist.second] == '.')
                    {
                        antinodes[coords.first + dist.first][coords.second + dist.second] = '#';
                    }
                    coords.first += dist.first;
                    coords.second += dist.second;
                }
                coords = antennas[j];
                antinodes[coords.first][coords.second] = '#';
                while (coords.first + dist.first >= 0 && coords.first + dist.first < mat.size() && coords.second + dist.second >= 0 && coords.second + dist.second < mat[i].size())
                {
                    if (antinodes[coords.first + dist.first][coords.second + dist.second] == '.')
                    {
                        antinodes[coords.first + dist.first][coords.second + dist.second] = '#';
                    }
                    coords.first += dist.first;
                    coords.second += dist.second;
                }
                coords.first -= dist.first;
                coords.second -= dist.second;
                dist.first *= -1;
                dist.second *= -1;
                while (coords.first + dist.first >= 0 && coords.first + dist.first < mat.size() && coords.second + dist.second >= 0 && coords.second + dist.second < mat[i].size())
                {
                    if (antinodes[coords.first + dist.first][coords.second + dist.second] == '.')
                    {
                        antinodes[coords.first + dist.first][coords.second + dist.second] = '#';
                    }
                    coords.first += dist.first;
                    coords.second += dist.second;
                }
                continue;

                if (antennas[i].first + dist.first >= 0 && antennas[i].first + dist.first < mat.size() && antennas[i].second + dist.second >= 0 && antennas[i].second + dist.second < mat[i].size() && antinodes[antennas[i].first + dist.first][antennas[i].second + dist.second] == '.' && mat[antennas[i].first + dist.first][antennas[i].second + dist.second] != p.first)
                {
                    antinodes[antennas[i].first + dist.first][antennas[i].second + dist.second] = '#';
                }

                if (antennas[j].first + dist.first >= 0 && antennas[j].first + dist.first < mat.size() && antennas[j].second + dist.second >= 0 && antennas[j].second + dist.second < mat[j].size() && antinodes[antennas[j].first + dist.first][antennas[j].second + dist.second] == '.' && mat[antennas[j].first + dist.first][antennas[j].second + dist.second] != p.first)
                {
                    antinodes[antennas[j].first + dist.first][antennas[j].second + dist.second] = '#';
                }

                if (antennas[i].first - dist.first >= 0 && antennas[i].first - dist.first < mat.size() && antennas[i].second - dist.second >= 0 && antennas[i].second - dist.second < mat[i].size() && antinodes[antennas[i].first - dist.first][antennas[i].second - dist.second] == '.' && mat[antennas[i].first - dist.first][antennas[i].second - dist.second] != p.first)
                {
                    antinodes[antennas[i].first - dist.first][antennas[i].second - dist.second] = '#';
                }

                if (antennas[j].first - dist.first >= 0 && antennas[j].first - dist.first < mat.size() && antennas[j].second - dist.second >= 0 && antennas[j].second - dist.second < mat[j].size() && antinodes[antennas[j].first - dist.first][antennas[j].second - dist.second] == '.' && mat[antennas[j].first - dist.first][antennas[j].second - dist.second] != p.first)
                {
                    antinodes[antennas[j].first - dist.first][antennas[j].second - dist.second] = '#';
                }
            }
        }
    }
    int ret = 0;
    for (int i = 0; i < antinodes.size(); i++)
    {
        for (int j = 0; j < antinodes[i].size(); j++)
        {
            if (antinodes[i][j] == '#')
                ret++;
        }
    }
    return ret;
}

int main()
{
    std::ifstream file("input.txt");
    std::vector<std::vector<char>> mat(0, std::vector<char>(0));
    char c;
    int index = 0;
    while (file.get(c))
    {
        if (c == '\n')
        {
            index++;
            continue;
        }
        if (index >= mat.size())
        {
            mat.resize(index + 1);
        }
        mat[index].push_back(c);
    }
    std::cout << plotAntinodes(mat) << '\n';
}