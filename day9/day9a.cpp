#include <iostream>
#include <vector>
#include <fstream>

using std::cout;
using std::ifstream;
using std::swap;
using std::vector;

void fix(vector<int> &arr)
{
    int left = 0, right = arr.size() - 1;
    while (left < right)
    {
        cout << left << " " << right << '\n';
        while (arr[left] != -1)
        {
            left++;
            if (left >= arr.size())
                return;
        }
        while (arr[right] == -1)
        {
            right--;
            if (right < 0)
                return;
        }
        swap(arr[left], arr[right]);
    }
    int i = arr.size() - 1;
    for (; arr[i] == -1; i--)
    {
    }
    swap(arr[i], arr[i - 1]);
}

int main()
{
    ifstream file("input.txt");
    char c;
    bool block = true;
    int id = 0;
    vector<int> disk;
    while (file.get(c))
    {
        int num = c - '0';
        for (int i = 0; i < num; i++)
        {
            if (block)
            {
                disk.push_back(id);
            }
            else
            {
                disk.push_back(-1);
            }
        }
        if (block)
        {
            id++;
        }
        block = !block;
    }
    fix(disk);
    for (int i : disk)
    {
        cout << i << ' ';
    }
    cout << '\n';
    long long sum = 0;
    for (int i = 0; disk[i] != -1; i++)
    {
        sum += disk[i] * i;
    }
    cout << sum << '\n';
}