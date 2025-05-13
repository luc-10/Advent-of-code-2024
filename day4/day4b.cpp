#include <iostream>
#include <vector>
#include <fstream>

using std::cout;
using std::ifstream;
using std::vector;

bool checkMAS(vector<vector<char>> &mat, int i, int j)
{
    return ((mat[i - 1][j - 1] == mat[i + 1][j - 1] && mat[i + 1][j + 1] == mat[i - 1][j + 1] && ((mat[i - 1][j - 1] == 'M' && mat[i + 1][j + 1] == 'S') || (mat[i - 1][j - 1] == 'S' && mat[i + 1][j + 1] == 'M'))) ||
            (mat[i - 1][j - 1] == mat[i - 1][j + 1] && mat[i + 1][j + 1] == mat[i + 1][j - 1] && ((mat[i - 1][j - 1] == 'M' && mat[i + 1][j + 1] == 'S') || (mat[i - 1][j - 1] == 'S' && mat[i + 1][j + 1] == 'M'))));
}

int findMAS(vector<vector<char>> &mat)
{
    int ret = 0;
    for (int i = 1; i < mat.size() - 1; i++)
    {
        for (int j = 1; j < mat[i].size() - 1; j++)
        {
            if (mat[i][j] == 'A')
            {
                cout << "checking " << i << ' ' << j << '\n';
                if (checkMAS(mat, i, j))
                {
                    cout << "found " << i << ' ' << j << '\n';
                    ret++;
                }
            }
        }
    }
    return ret;
}

int main()
{
    ifstream file("input.txt");
    char c;
    int index = 0;
    vector<vector<char>> mat(0, vector<char>(0));
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
    cout << findMAS(mat) << '\n';
}