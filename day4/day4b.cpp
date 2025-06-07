#include <iostream>
#include <vector>
#include <fstream>

bool checkMAS(std::vector<std::vector<char>> &mat, int i, int j)
{
    return ((mat[i - 1][j - 1] == mat[i + 1][j - 1] && mat[i + 1][j + 1] == mat[i - 1][j + 1] && ((mat[i - 1][j - 1] == 'M' && mat[i + 1][j + 1] == 'S') || (mat[i - 1][j - 1] == 'S' && mat[i + 1][j + 1] == 'M'))) ||
            (mat[i - 1][j - 1] == mat[i - 1][j + 1] && mat[i + 1][j + 1] == mat[i + 1][j - 1] && ((mat[i - 1][j - 1] == 'M' && mat[i + 1][j + 1] == 'S') || (mat[i - 1][j - 1] == 'S' && mat[i + 1][j + 1] == 'M'))));
}

int findMAS(std::vector<std::vector<char>> &mat)
{
    int ret = 0;
    for (int i = 1; i < mat.size() - 1; i++)
    {
        for (int j = 1; j < mat[i].size() - 1; j++)
        {
            if (mat[i][j] == 'A')
            {
                if (checkMAS(mat, i, j))
                {
                    ret++;
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
    std::cout << findMAS(mat) << '\n';
}