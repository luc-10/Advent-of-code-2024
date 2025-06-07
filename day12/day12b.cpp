#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>

using std::cout;
using std::ifstream;
using std::pair;
using std::vector;

bool partOf(vector<vector<char>> &mat, int i, int j, char c)
{
    return (i >= 0 && j >= 0 && i < mat.size() && j < mat[i].size() && (mat[i][j] == c || mat[i][j] == c - 'A' + 'a'));
}

int getCorners(vector<vector<char>> &mat, int i, int j, char c)
{
    if (i < 0 || j < 0 || i >= mat.size() || j >= mat[i].size() || mat[i][j] != c)
    {
        return 0;
    }
    else
    {
        int corners = 0;
        mat[i][j] = mat[i][j] - 'A' + 'a';

        if ((!partOf(mat, i - 1, j, c) && !partOf(mat, i, j - 1, c)) ||
            (partOf(mat, i - 1, j, c) && partOf(mat, i, j - 1, c) && !partOf(mat, i - 1, j - 1, c)))

            corners++;

        if ((!partOf(mat, i + 1, j, c) && !partOf(mat, i, j - 1, c)) ||
            (partOf(mat, i + 1, j, c) && partOf(mat, i, j - 1, c) && !partOf(mat, i + 1, j - 1, c)))

            corners++;

        if ((!partOf(mat, i - 1, j, c) && !partOf(mat, i, j + 1, c)) ||
            (partOf(mat, i - 1, j, c) && partOf(mat, i, j + 1, c) && !partOf(mat, i - 1, j + 1, c)))

            corners++;

        if ((!partOf(mat, i + 1, j, c) && !partOf(mat, i, j + 1, c)) ||
            (partOf(mat, i + 1, j, c) && partOf(mat, i, j + 1, c) && !partOf(mat, i + 1, j + 1, c)))
            corners++;

        return corners + getCorners(mat, i - 1, j, c) + getCorners(mat, i + 1, j, c) + getCorners(mat, i, j - 1, c) + getCorners(mat, i, j + 1, c);
    }
}

int getArea(vector<vector<char>> &mat, int i, int j, char c)
{
    if (i < 0 || j < 0 || i >= mat.size() || j >= mat[i].size() || mat[i][j] != c)
    {
        return 0;
    }
    else
    {
        mat[i][j] = 0;
        return 1 + getArea(mat, i - 1, j, c) + getArea(mat, i + 1, j, c) + getArea(mat, i, j - 1, c) + getArea(mat, i, j + 1, c);
    }
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
                price += getCorners(mat, i, j, mat[i][j]) * getArea(mat, i, j, mat[i][j]);
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