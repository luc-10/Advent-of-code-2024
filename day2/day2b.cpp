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

bool test1(vector<int> &arr)
{
    int inc = 0, dec = 0, same = 0;
    for (int i = 0; i < arr.size() - 1; i++)
    {
        if (arr[i] < arr[i + 1])
        {
            inc++;
        }
        else if (arr[i] > arr[i + 1])
        {
            dec++;
        }
        else
        {
            same++;
        }
        if (same > 1 || (dec >= 2 && inc >= 2))
            return 0;
    }
    return 1;
}

bool test2(vector<int> &arr)
{
    int last = 0, errors = 0;
    for (int i = 1; i < arr.size(); i++)
    {
        int diff = arr[i] - arr[last];
        if (diff >= 1 && diff <= 3)
        {
            last = i;
        }
        else
        {
            errors++;
            if (last == 0)
                last++;
        }
        if (errors >= 2)
        {
            return 0;
        }
    }
    return 1;
}

bool isSafeWithoutIndex(vector<int> &arr, int index)
{
    int upperLimit = (index == arr.size() - 1) ? arr.size() - 2 : arr.size() - 1;
    for (int i = 0; i < upperLimit; i++)
    {
        int diff;
        if (i == index)
        {
            continue;
        }
        else if (i + 1 == index)
        {
            diff = arr[i + 2] - arr[i];
        }
        else
        {
            diff = arr[i + 1] - arr[i];
        }
        if (diff < 1 || diff > 3)
        {
            return 0;
        }
    }
    return 1;
}

bool isSafe(vector<int> &arr)
{
    if (!test1(arr))
        return 0;
    int localMinMax = 0;
    for (int i = 1; i < arr.size() - 1; i++)
    {
        if ((arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) || (arr[i] < arr[i + 1] && arr[i] < arr[i - 1]))
        {
            localMinMax = i;
            break;
        }
    }
    if (isSafeWithoutIndex(arr, 0) || isSafeWithoutIndex(arr, localMinMax) || isSafeWithoutIndex(arr, arr.size() - 1))
        return 1;
    if (test2(arr))
        return 1;
    reverse(arr.begin(), arr.end());
    for (int i = 1; i < arr.size() - 1; i++)
    {
        if ((arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) || (arr[i] < arr[i + 1] && arr[i] < arr[i - 1]))
        {
            localMinMax = i;
            break;
        }
    }
    if (test2(arr))
        return 1;
    if (isSafeWithoutIndex(arr, 0) || isSafeWithoutIndex(arr, localMinMax) || isSafeWithoutIndex(arr, arr.size() - 1))
        return 1;
    return 0;
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