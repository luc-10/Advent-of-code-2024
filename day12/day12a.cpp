#include <iostream>
#include <vector>
#include <fstream>

using std::cout;
using std::ifstream;
using std::pair;
using std::vector;

pair<int, int> getAreaPerimeter(vector<vector<char>> &mat, int i, int j, char c)
{
    if (i < 0 || j < 0 || i >= mat.size() || j >= mat[i].size())
        return {0, 1};
    else if (mat[i][j] == c - 'A' + 'a')
        return {0, 0};
    else if (mat[i][j] == c)
    {
        mat[i][j] = mat[i][j] - 'A' + 'a';
        auto up = getAreaPerimeter(mat, i - 1, j, c);
        auto down = getAreaPerimeter(mat, i + 1, j, c);
        auto left = getAreaPerimeter(mat, i, j - 1, c);
        auto right = getAreaPerimeter(mat, i, j + 1, c);
        return {1 + up.first + down.first + left.first + right.first, up.second + down.second + left.second + right.second};
    }
    return {0, 1};
}

int findPrice(vector<vector<char>> &mat)
{
    int price = 0;
    for (int i = 0; i < mat.size(); i++)
    {
        for (int j = 0; j < mat[i].size(); j++)
        {
            if (mat[i][j] >= 'A' && mat[i][j] <= 'Z')
            {
                auto p = getAreaPerimeter(mat, i, j, mat[i][j]);
                price += p.first * p.second;
            }
        }
    }
    return price;
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
    cout << findPrice(mat) << '\n';
}