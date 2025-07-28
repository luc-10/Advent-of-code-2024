#include <vector>
#include <fstream>
#include <iostream>
#include <cmath>

#define width 101
#define height 103

int calcSafetyFactor(std::vector<std::vector<int>> &grid)
{
    int safetyFactor = 1;
    int currSF = 0;
    for (int i = 0; i < floor(height / 2.0); i++)
    {
        for (int j = 0; j < floor(width / 2.0); j++)
        {
            currSF += grid[i][j];
        }
    }
    safetyFactor *= currSF;
    currSF = 0;
    for (int i = ceil(height / 2.0); i < height; i++)
    {
        for (int j = 0; j < floor(width / 2.0); j++)
        {
            currSF += grid[i][j];
        }
    }
    safetyFactor *= currSF;
    currSF = 0;
    for (int i = 0; i < floor(height / 2.0); i++)
    {
        for (int j = ceil(width / 2.0); j < width; j++)
        {
            currSF += grid[i][j];
        }
    }
    safetyFactor *= currSF;
    currSF = 0;
    for (int i = ceil(height / 2.0); i < height; i++)
    {
        for (int j = ceil(width / 2.0); j < width; j++)
        {
            currSF += grid[i][j];
        }
    }

    safetyFactor *= currSF;
    return safetyFactor;
}

int main()
{
    std::ifstream file("input.txt");
    std::string line;

    std::vector<std::vector<int>> grid(height, std::vector<int>(width, 0));

    while (std::getline(file, line))
    {
        std::pair<int, int> pos;
        std::pair<int, int> vel;
        sscanf(line.c_str(), "p=%d,%d v=%d,%d\n", &pos.first, &pos.second, &vel.first, &vel.second);

        pos.first = (width + ((pos.first + 100 * vel.first) % width)) % width;
        pos.second = (height + ((pos.second + 100 * vel.second) % height)) % height;

        grid[pos.second][pos.first]++;
    }
    std::cout << calcSafetyFactor(grid) << '\n';
}