#include <iostream>
#include <vector>
#include <fstream>

int countTrails(std::vector<std::vector<int>> &mat, int i, int j, int num, std::vector<std::vector<bool>> &visited)
{
    if (i < 0 || j < 0 || i >= mat.size() || j >= mat[i].size() || visited[i][j] || mat[i][j] != num)
        return 0;
    else if (mat[i][j] == 9)
    {
        visited[i][j] = 1;
        return 1;
    }
    else
    {
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
    std::ifstream file("input.txt");
    char c;
    int index = 0;
    std::vector<std::vector<int>> mat(0, std::vector<int>(0));
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
                std::vector<std::vector<bool>> visited(mat.size(), std::vector<bool>(mat[i].size(), 0));
                trails += countTrails(mat, i, j, 0, visited);
            }
        }
    }
    std::cout << trails << '\n';
    return 0;
}