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

void simulate(std::vector<std::vector<char>> &mat, int posX, int posY)
{
    int dir = UP;

    while (posX >= 0 && posY >= 0 && posX < mat.size() && posY < mat[posX].size())
    {

        mat[posX][posY] = 'X';
        auto p = getNext(mat, dir, posX, posY);
        if (p.first < 0 || p.second < 0 || p.first >= mat.size() || p.second >= mat[p.first].size())
            break;
        if (mat[p.first][p.second] == '#')
        {
            dir = (dir + 1) % 4;
            p = getNext(mat, dir, posX, posY);
        }
        posX = p.first;
        posY = p.second;
    }
}

int countPos(std::vector<std::vector<char>> &mat)
{
    int x, y;
    findStartingPoint(mat, x, y);
    simulate(mat, x, y);

    int ret = 0;
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            if (mat[i][j] == 'X')
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
    std::cout << countPos(mat) << '\n';
    return 0;
}