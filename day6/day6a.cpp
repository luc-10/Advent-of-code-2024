#include <fstream>
#include <iostream>
#include <vector>

using std::cout;
using std::ifstream;
using std::pair;
using std::vector;

#define UP 0
#define RIGHT 1
#define DOWN 2
#define LEFT 3

void print(vector<vector<char>> &mat)
{
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            cout << mat[i][j] << ' ';
        }
        cout << '\n';
    }
}

void findStartingPoint(vector<vector<char>> &mat, int &x, int &y)
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

pair<int, int> getNext(vector<vector<char>> &mat, int dir, int posX, int posY)
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

void simulate(vector<vector<char>> &mat, int posX, int posY)
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

int countPos(vector<vector<char>> &mat)
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
    // print(mat);
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
    cout << countPos(mat) << '\n';
    return 0;
}