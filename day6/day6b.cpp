#include <fstream>
#include <iostream>
#include <vector>

#define UP 0
#define RIGHT 1
#define DOWN 2
#define LEFT 3

void findStartingPoint(std::vector<std::vector<char>> &mat, int &x, int &y)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            if (mat[i][j] == '^')
            {
                x = i;
                y = j;
                return;
            }
        }
    }
}

bool outOfBounds(std::vector<std::vector<char>> &mat, int posX, int posY)
{
    return (posX < 0 || posY < 0 || posX >= mat.size() || posY >= mat[posX].size());
}

std::pair<int, int> getNext(std::vector<std::vector<char>> &mat, int dir, int posX, int posY)
{
    switch (dir)
    {
    case UP:
        return {posX - 1, posY};
    case DOWN:
        return {posX + 1, posY};
    case RIGHT:
        return {posX, posY + 1};
    case LEFT:
        return {posX, posY - 1};
    }
    return {-1, -1};
}

int getDir(std::vector<std::vector<char>> &mat, int posX, int posY, int dir)
{
    std::pair<int, int> p;
    do
    {
        p = getNext(mat, dir, posX, posY);
        if (outOfBounds(mat, p.first, p.second))
            return -1;
        if (mat[p.first][p.second] != '#')
            return dir;
        dir = (dir + 1) % 4;
    } while (1);
}

bool isVisited(std::vector<std::vector<std::vector<bool>>> &visited, int posX, int posY)
{
    for (int dir = 0; dir < 4; dir++)
    {
        if (visited[posX][posY][dir])
            return true;
    }
    return false;
}

bool checkLoop(std::vector<std::vector<char>> &mat, int posX, int posY, int dir, std::vector<std::vector<std::vector<bool>>> &visited)
{
    dir = getDir(mat, posX, posY, dir);
    if (dir == -1)
    {
        return false;
    }

    if (visited[posX][posY][dir])
    {

        return true;
    }

    visited[posX][posY][dir] = true;

    auto p = getNext(mat, dir, posX, posY);

    bool retVal = checkLoop(mat, p.first, p.second, dir, visited);

    visited[posX][posY][dir] = false;

    return retVal;
}

int countLoops(std::vector<std::vector<char>> &mat)
{
    int posX, posY;
    findStartingPoint(mat, posX, posY);
    int loops = 0, dir = UP;

    std::vector<std::vector<std::vector<bool>>> visited(mat.size(), std::vector<std::vector<bool>>(mat[posX].size(), std::vector<bool>(4)));

    while (1)
    {
        dir = getDir(mat, posX, posY, dir);
        if (dir == -1)
            break;

        visited[posX][posY][dir] = true;

        auto p = getNext(mat, dir, posX, posY);

        if (mat[p.first][p.second] != '#' && !isVisited(visited, p.first, p.second))
        {
            mat[p.first][p.second] = '#';
            loops += checkLoop(mat, posX, posY, dir, visited);
            mat[p.first][p.second] = '.';
        }

        posX = p.first;
        posY = p.second;
    }
    return loops;
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
    std::cout << countLoops(mat) << '\n';
    return 0;
}