#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

bool isSafe(std::vector<int> &arr)
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
    std::ifstream file("input.txt");

    std::string line;
    int safes = 0;
    while (getline(file, line))
    {
        std::istringstream iss(line);
        std::vector<int> report;
        int num;

        while (iss >> num)
        {
            report.push_back(num);
        }
        if (isSafe(report))
            safes++;
    }
    std::cout << safes << '\n';
    return 0;
}