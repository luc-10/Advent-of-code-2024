#include <vector>
#include <fstream>
#include <iostream>
#include <cmath>

// Basically find cases where there are many robots close together and print the grid on a file to check

#define width 101
#define height 103

void printOnFile(int from, int to, std::vector<std::vector<int>> &grid, std::vector<std::pair<int, int>> posArr, std::vector<std::pair<int, int>> velArr)
{
    for (int i = 0; i < posArr.size(); i++)
    {
        grid[posArr[i].second][posArr[i].first]--;

        posArr[i].first = (width + ((posArr[i].first + from * velArr[i].first) % width)) % width;
        posArr[i].second = (height + ((posArr[i].second + from * velArr[i].second) % height)) % height;

        grid[posArr[i].second][posArr[i].first]++;
    }
    std::ofstream outputFile("output.txt");
    for (; from < to; from++)
    {
        bool skip = true;
        for (int i = 0; i < height; i++)
        {
            if (!skip)
                break;
            for (int j = 0; j < width - 10; j++)
            {

                int k = j;
                int count = 0;
                for (; k < j + 10; k++)
                {
                    if (grid[i][k])
                    {
                        count++;
                        if (count >= 10)
                        {
                            skip = false;
                            break;
                        }
                    }
                }
            }
        }
        if (!skip)
        {
            outputFile << from << '\n';
            for (const auto &v : grid)
            {
                for (int i : v)
                {
                    if (i == 0)
                    {
                        outputFile << '.';
                    }
                    else
                    {
                        outputFile << '#';
                    }
                }
                outputFile << '\n';
            }
            outputFile << '\n'
                       << '\n';
        }

        outputFile.flush();
        for (int i = 0; i < posArr.size(); i++)
        {
            grid[posArr[i].second][posArr[i].first]--;

            posArr[i].first = (width + ((posArr[i].first + velArr[i].first) % width)) % width;
            posArr[i].second = (height + ((posArr[i].second + velArr[i].second) % height)) % height;

            grid[posArr[i].second][posArr[i].first]++;
        }
    }
}

int main()
{
    std::ifstream inputFile("input.txt");
    std::string line;

    std::vector<std::vector<int>> grid(height, std::vector<int>(width, 0));
    std::vector<std::pair<int, int>> posArr(0);
    std::vector<std::pair<int, int>> velArr(0);
    while (std::getline(inputFile, line))
    {
        std::pair<int, int> pos;
        std::pair<int, int> vel;
        sscanf(line.c_str(), "p=%d,%d v=%d,%d\n", &pos.first, &pos.second, &vel.first, &vel.second);
        grid[pos.second][pos.first]++;
        posArr.push_back(pos);
        velArr.push_back(vel);
    }
    printOnFile(0, 10000, grid, posArr, velArr);
}