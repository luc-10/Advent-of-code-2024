#include <fstream>
#include <iostream>
#include <vector>
#include <cmath>

using std::cout;
using std::ifstream;
using std::pair;
using std::pow;
using std::vector;

int countDigits(long long num)
{
    cout << num;
    int digits = 0;
    while (num > 0)
    {
        digits++;
        num /= 10;
    }
    cout << " has " << digits << '\n';
    return digits;
}

pair<long, long> split(long long num)
{
    int digits = countDigits(num) / 2;
    pair<long, long> ret;
    ret.second = num % (long long)pow(10, digits);
    ret.first = num / (long long)pow(10, digits);
    cout << num << " is split in " << ret.first << ' ' << ret.second << '\n';
    return ret;
}

void transform(vector<long long> &stones, int blinks)
{
    vector<long long> newStones;
    for (int b = 0; b < blinks; b++)
    {
        for (long long stone : stones)
        {
            if (stone == 0)
            {
                newStones.push_back(1);
            }
            else if (countDigits(stone) % 2 == 0)
            {
                auto p = split(stone);
                newStones.push_back(p.first);
                newStones.push_back(p.second);
            }
            else
            {
                newStones.push_back(stone * 2024);
            }
        }
        stones = newStones;
        newStones = {};
    }
}

int main()
{
    ifstream file("input.txt");
    vector<long long> stones;
    long long num;
    while (file >> num)
    {
        cout << num << '\n';
        stones.push_back(num);
    }
    transform(stones, 25);
    cout << stones.size() << '\n';

    return 0;
}