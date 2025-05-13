#include <iostream>
#include <vector>
#include <fstream>
#include <unordered_map>

using std::cout;
using std::ifstream;
using std::pair;
using std::unordered_map;
using std::vector;

int plotAntinodes(vector<vector<char>> &mat)
{
    unordered_map<char, vector<pair<int, int>>> m;
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
    vector<vector<char>> antinodes(mat.size(), vector<char>(mat[0].size(), '.'));
    for (const auto &p : m)
    {
        vector<pair<int, int>> antennas = p.second;
        for (int i = 0; i < antennas.size(); i++)
        {
            for (int j = i + 1; j < antennas.size(); j++)
            {

                pair<int, int> dist = {antennas[i].first - antennas[j].first, antennas[i].second - antennas[j].second};

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
            cout << antinodes[i][j];
            if (antinodes[i][j] == '#')
                ret++;
        }
        cout << '\n';
    }
    return ret;
}

int main()
{
    ifstream file("input.txt");
    vector<vector<char>> mat(0, vector<char>(0));
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
    cout << plotAntinodes(mat) << '\n';
}