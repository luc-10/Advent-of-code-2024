#include <fstream>
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>

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

int findOther(std::vector<std::vector<char>> &mat, int i, int j)
{
    if (mat[i][j] == ']')
    {
        return -1;
    }
    else if (mat[i][j] == '[')
    {
        return 1;
    }
    return 0;
}

bool tryMove(std::vector<std::vector<char>> &mat, int x, int y, std::pair<int, int> &dir, std::vector<std::vector<bool>> &checked, std::queue<std::pair<int, int>> &q)
{
    if (mat[x][y] == '#')
    {
        return false;
    }
    else if (mat[x][y] == '.' || checked[x][y])
    {
        return true;
    }
    else if (dir.first != 0)
    {
        checked[x][y] = true;
        int other = findOther(mat, x, y);
        if (other == 0)
        {

            if (tryMove(mat, x + dir.first, y + dir.second, dir, checked, q))
            {
                q.push({x, y});

                return true;
            }
            else
            {
                return false;
            }
        }
        if (tryMove(mat, x + dir.first, y + dir.second, dir, checked, q) && tryMove(mat, x, y + findOther(mat, x, y), dir, checked, q))
        {
            q.push({x, y});
            return true;
        }
        else
        {
            return false;
        }
    }
    else if (dir.second != 0)
    {

        checked[x][y] = true;
        if (tryMove(mat, x + dir.first, y + dir.second, dir, checked, q))
        {
            q.push({x, y});
            return true;
        }
        else
        {
            return false;
        }
    }
    return false;
}

void simulateMovement(std::vector<std::vector<char>> &mat, std::vector<char> &movement)
{
    std::pair<int, int> pos = getBotPos(mat);
    std::queue<std::pair<int, int>> q;
    std::vector<std::vector<bool>> checked(mat.size(), std::vector<bool>(mat[0].size()));
    for (char c : movement)
    {
        for (int i = 0; i < mat.size(); i++)
        {
            for (int j = 0; j < mat[i].size(); j++)
            {
                checked[i][j] = 0;
            }
        }
        auto dir = getDirection(c);
        if (tryMove(mat, pos.first, pos.second, dir, checked, q))
        {
            while (!q.empty())
            {
                int x = q.front().first, y = q.front().second;
                std::swap(mat[x][y], mat[x + dir.first][y + dir.second]);
                q.pop();
            }
            pos.first += dir.first;
            pos.second += dir.second;
        }
        else
        {
            while (!q.empty())
            {
                q.pop();
            }
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
            if (mat[i][j] == '[')
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
        switch (c)
        {
        case '#':
            mat[index].push_back(c);
            mat[index].push_back(c);
            break;
        case '.':
            mat[index].push_back(c);
            mat[index].push_back(c);
            break;
        case '@':
            mat[index].push_back(c);
            mat[index].push_back('.');
            break;
        case 'O':
            mat[index].push_back('[');
            mat[index].push_back(']');
            break;
        }
    }
    std::vector<char> movement(0);
    while (file.get(c))
    {
        if (c != '\n')
            movement.push_back(c);
    }
    movement.push_back('.');
    simulateMovement(mat, movement);
    std::cout
        << getDistance(mat) << '\n';
}