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

bool outOfBounds(vector<vector<char>> &mat, int posX, int posY)
{
    return (posX < 0 || posY < 0 || posX >= mat.size() || posY >= mat[posX].size());
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

int getDir(vector<vector<char>> &mat, int posX, int posY, int dir)
{
    // cout << posX << ' ' << posY << ' ' << dir << '\n';
    pair<int, int> p;
    do
    {
        p = getNext(mat, dir, posX, posY);
        // cout << p.first << ' ' << p.second << '\n';
        if (outOfBounds(mat, p.first, p.second))
            return -1;
        if (mat[p.first][p.second] != '#')
            return dir;
        dir = (dir + 1) % 4;
    } while (1);
}

bool isVisited(vector<vector<vector<bool>>> &visited, int posX, int posY)
{
    for (int dir = 0; dir < 4; dir++)
    {
        if (visited[posX][posY][dir])
            return true;
    }
    return false;
}

bool checkLoop(vector<vector<char>> &mat, int posX, int posY, int dir, vector<vector<vector<bool>>> &visited)
{
    cout << "Sim Now on " << posX << ' ' << posY << '\n';
    dir = getDir(mat, posX, posY, dir);
    if (dir == -1)
    {
        cout << "Loop not found\n";
        return false;
    }

    if (visited[posX][posY][dir])
    {
        cout << "Found loop at " << posX << ' ' << posY;
        cout << " with direction " << dir << '\n';

        return true;
    }

    visited[posX][posY][dir] = true;

    auto p = getNext(mat, dir, posX, posY);

    bool retVal = checkLoop(mat, p.first, p.second, dir, visited);

    visited[posX][posY][dir] = false;

    return retVal;
}

int countLoops(vector<vector<char>> &mat)
{
    int posX, posY;
    findStartingPoint(mat, posX, posY);
    int loops = 0, dir = UP;

    vector<vector<vector<bool>>> visited(mat.size(), vector<vector<bool>>(mat[posX].size(), vector<bool>(4)));

    while (1)
    {
        cout << "Now on " << posX << " " << posY << '\n';
        dir = getDir(mat, posX, posY, dir);
        // cout << "Dir: " << dir << '\n';
        if (dir == -1)
            break;

        visited[posX][posY][dir] = true;

        auto p = getNext(mat, dir, posX, posY);

        if (mat[p.first][p.second] != '#' && !isVisited(visited, p.first, p.second))
        {
            mat[p.first][p.second] = '#';
            cout << "Putting # at " << p.first << ' ' << p.second << '\n';
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
    cout << countLoops(mat) << '\n';
    return 0;
}