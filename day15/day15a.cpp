#include <fstream>
#include <iostream>
#include <vector>

std::pair<int, int> getDirection(char c)
{
    switch (c)
    {
    case '^':
        return {-1, 0};
    case '>':
        return {0, 1};
    case 'v':
        return {1, 0};
    case '<':
        return {0, -1};
    default:
        return {0, 0};
    }
}

std::pair<int, int> getBotPos(std::vector<std::vector<char>> &mat)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            if (mat[i][j] == '@')
                return {i, j};
        }
    }
    return {-1, -1};
}

bool tryMove(std::vector<std::vector<char>> &mat, int x, int y, std::pair<int, int> &dir)
{
    if (mat[x][y] == '#')
    {
        return false;
    }
    else if (mat[x][y] == '.')
    {
        return true;
    }
    else
    {
        if (tryMove(mat, x + dir.first, y + dir.second, dir))
        {
            std::swap(mat[x][y], mat[x + dir.first][y + dir.second]);
            return true;
        }
        else
        {
            return false;
        }
    }
}

void simulateMovement(std::vector<std::vector<char>> &mat, std::vector<char> &movement)
{
    std::pair<int, int> pos = getBotPos(mat);
    for (char c : movement)
    {
        auto dir = getDirection(c);
        if (tryMove(mat, pos.first, pos.second, dir))
        {
            pos.first += dir.first;
            pos.second += dir.second;
        }
    }
}

int getDistance(std::vector<std::vector<char>> &mat)
{
    int ret = 0;
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            if (mat[i][j] == 'O')
            {
                ret += 100 * i + j;
            }
        }
    }
    return ret;
}

int main()
{
    std::ifstream file("input.txt");
    char c, lastChar = 0;
    int index = 0;
    std::vector<std::vector<char>> mat(0, std::vector<char>(0));
    while (file.get(c))
    {
        if (c == '\n' && lastChar == '\n')
            break;
        lastChar = c;
        if (c == '\n')
        {
            index++;
            continue;
        }
        if (index >= mat.size())
            mat.resize(index + 1);
        mat[index].push_back(c);
    }
    std::vector<char> movement(0);
    while (file.get(c))
    {
        if (c != '\n')
            movement.push_back(c);
    }

    simulateMovement(mat, movement);
    std::cout << getDistance(mat) << '\n';
}