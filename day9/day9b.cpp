#include <iostream>
#include <vector>
#include <fstream>
#include <unordered_map>

int getMax(std::vector<int> &arr)
{
    for (int i = arr.size() - 1; i >= 0; i--)
    {
        if (arr[i] != -1)
            return arr[i];
    }
    return 0;
}
void fix(std::vector<int> &disk)
{
    int lastDone = getMax(disk) + 1;
    int length;
    int emptyLength;
    while (1)
    {
        int i;
        length = 0;
        for (i = disk.size() - 1; i >= 0; i--)
        {
            if (disk[i] < lastDone && disk[i] != -1)
            {
                lastDone = disk[i];
                while (disk[i] == lastDone)
                {
                    length++;
                    i--;
                }
                break;
            }
        }
        if (lastDone == 0)
            break;
        for (int j = 0; j <= i; j++)
        {
            emptyLength = 0;
            if (disk[j] == -1)
            {
                while (disk[j] == -1)
                {
                    emptyLength++;
                    j++;
                    if (emptyLength == length)
                    {
                        break;
                    }
                }
                if (emptyLength == length)
                {
                    while (length > 0)
                    {
                        disk[j - length] = lastDone;
                        length--;
                        disk[i + length + 1] = -1;
                    }
                }
            }
        }
    }
}
int main()
{
    std::ifstream file("input.txt");
    char c;
    bool block = true;
    int id = 0;
    std::vector<int> disk;
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
    long long sum = 0;
    for (int i = 0; i < disk.size(); i++)
    {
        if (disk[i] == -1)
        {
            continue;
        }
        sum += disk[i] * i;
    }
    std::cout << sum << '\n';
    return 0;
}