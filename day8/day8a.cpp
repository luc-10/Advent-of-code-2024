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

                if (antennas[i].first + dist.first >= 0 && antennas[i].first + dist.first < antinodes.size() && antennas[i].second + dist.second >= 0 && antennas[i].second + dist.second < antinodes[i].size())
                {

                    antinodes[antennas[i].first + dist.first][antennas[i].second + dist.second] = '#';
                }

                if (antennas[j].first - dist.first >= 0 && antennas[j].first - dist.first < antinodes.size() && antennas[j].second - dist.second >= 0 && antennas[j].second - dist.second < antinodes[i].size())
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