#include <fstream>
#include <iostream>
#include <vector>
#include <cmath>
#include <unordered_map>

using std::cout;
using std::ifstream;
using std::pair;
using std::pow;
using std::string;
using std::to_string;
using std::unordered_map;
using std::vector;

int countDigits(long long num)
{
    int digits = 0;
    while (num > 0)
    {
        digits++;
        num /= 10;
    }
    return digits;
}

pair<long, long> split(long long num)
{
    int digits = countDigits(num) / 2;
    pair<long, long> ret;
    ret.second = num % (long long)pow(10, digits);
    ret.first = num / (long long)pow(10, digits);
    return ret;
}

string stringify(long long a, long long b)
{
    return to_string(a) + "," + to_string(b);
}

long long getStones(long long stone, int blinks, unordered_map<string, long long> &futureStones)
{
    cout << stone << ' ' << blinks << '\n';
    if (blinks == 0)
        return 1;
    else if (futureStones[stringify(stone, blinks)] == 0)
    {
        if (stone == 0)
        {
            futureStones[stringify(stone, blinks)] = getStones(1, blinks - 1, futureStones);
        }
        else if (countDigits(stone) % 2 == 0)
        {
            auto p = split(stone);
            futureStones[stringify(stone, blinks)] = getStones(p.first, blinks - 1, futureStones) + getStones(p.second, blinks - 1, futureStones);
        }
        else
        {
            futureStones[stringify(stone, blinks)] = getStones(stone * 2024, blinks - 1, futureStones);
        }
    }
    return futureStones[stringify(stone, blinks)];
}

long long findStones(vector<long long> &stones, int blinks)
{
    long long allStones = 0;
    unordered_map<string, long long> futureStones;
    for (long long stone : stones)
    {
        allStones += getStones(stone, blinks, futureStones);
        cout << "Now " << allStones << '\n';
    }
    return allStones;
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
    unordered_map<string, long long> futureStones;
    cout << findStones(stones, 75) << '\n';

    return 0;
}