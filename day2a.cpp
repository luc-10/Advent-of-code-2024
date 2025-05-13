#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

using std::cout;
using std::ifstream;
using std::istringstream;
using std::string;
using std::vector;

bool isSafe(vector<int> &arr)
{
    if (arr.size() <= 1)
        return 1;
    if (arr[0] > arr[1])
        reverse(arr.begin(), arr.end());
    for (int i = 0; i < arr.size() - 1; i++)
    {
        int diff = arr[i + 1] - arr[i];
        if (diff < 1 || diff > 3)
            return 0;
    }
    return 1;
}

int main()
{
    ifstream file("input.txt");

    string line;
    int safes = 0;
    while (getline(file, line))
    {
        istringstream iss(line);
        vector<int> report;
        int num;

        while (iss >> num)
        {
            report.push_back(num);
        }
        if (isSafe(report))
            safes++;
    }
    cout << safes << '\n';
    return 0;
}