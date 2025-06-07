#include <iostream>
#include <vector>
#include <fstream>

char getNextChar(char c)
{
    switch (c)
    {
    case 'X':
        return 'M';
    case 'M':
        return 'A';
    case 'A':
        return 'S';
    case 'S':
        return 1;
    }
    return 0;
}

bool check(std::vector<std::vector<char>> &mat, int x, int y, int dx, int dy, char c)
{
    if (c == 1)
        return 1;
    if (x < 0 || y < 0 || x >= mat.size() || y >= mat[x].size())
    {
        return 0;
    }
    if (mat[x][y] == c)
    {
        return check(mat, x + dx, y + dy, dx, dy, getNextChar(c));
    }
    return 0;
}

int findXMAS(std::vector<std::vector<char>> &mat)
{
    int ret = 0;
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            for (int x = -1; x <= 1; x++)
            {
                for (int y = -1; y <= 1; y++)
                {
                    if (x != 0 || y != 0)
                    {
                        if (check(mat, i, j, x, y, 'X'))
                        {
                            ret++;
                        }
                    }
                }
            }
        }
    }
    return ret;
}

int main()
{
    std::ifstream file("input.txt");
    char c;
    int index = 0;
    std::vector<std::vector<char>> mat(0, std::vector<char>(0));
    while (file.get(c))
    {
        if (c == '\n')
        {
            index++;
            continue;
        }
        if (index >= mat.size())
            mat.resize(index + 1);
        mat[index].push_back(c);
    }
    std::cout << findXMAS(mat) << '\n';
}