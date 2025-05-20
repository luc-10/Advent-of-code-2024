#include <iostream>
#include <vector>
#include <fstream>

using std::cout;
using std::ifstream;
using std::vector;

int countTrails(vector<vector<int>> &mat, int i, int j, int num, vector<vector<bool>> &visited)
{
    if (i < 0 || j < 0 || i >= mat.size() || j >= mat[i].size() || visited[i][j] || mat[i][j] != num)
        return 0;
    else if (mat[i][j] == 9)
    {
        cout << "Finished at " << i << ' ' << j << '\n';
        visited[i][j] = 1;
        return 1;
    }
    else
    {
        cout << "Now at " << i << ' ' << j << '\n';
        visited[i][j] = 1;
        int ret = 0;
        ret += countTrails(mat, i + 1, j, num + 1, visited);
        ret += countTrails(mat, i - 1, j, num + 1, visited);
        ret += countTrails(mat, i, j + 1, num + 1, visited);
        ret += countTrails(mat, i, j - 1, num + 1, visited);
        return ret;
    }
}

int main()
{
    ifstream file("input.txt");
    char c;
    int index = 0;
    vector<vector<int>> mat(0, vector<int>(0));
    while (file.get(c))
    {
        if (c == '\n')
        {
            index++;
            continue;
        }
        if (index >= mat.size())
            mat.resize(index + 1);
        mat[index].push_back(c - '0');
    }
    int trails = 0;
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            if (mat[i][j] == 0)
            {
                cout << "Starting trail at " << i << ' ' << j << '\n';
                vector<vector<bool>> visited(mat.size(), vector<bool>(mat[i].size(), 0));
                trails += countTrails(mat, i, j, 0, visited);
            }
        }
    }
    cout << trails << '\n';
    return 0;
}