#include <fstream>
#include <iostream>
#include <vector>
#include <cmath>
#include <unordered_map>

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

std::pair<long, long> split(long long num)
{
    int digits = countDigits(num) / 2;
    std::pair<long, long> ret;
    ret.second = num % (long long)pow(10, digits);
    ret.first = num / (long long)pow(10, digits);
    return ret;
}

std::string stringify(long long a, long long b)
{
    return std::to_string(a) + "," + std::to_string(b);
}

long long getStones(long long stone, int blinks, std::unordered_map<std::string, long long> &futureStones)
{
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

long long findStones(std::vector<long long> &stones, int blinks)
{
    long long allStones = 0;
    std::unordered_map<std::string, long long> futureStones;
    for (long long stone : stones)
    {
        allStones += getStones(stone, blinks, futureStones);
    }
    return allStones;
}

int main()
{
    std::ifstream file("input.txt");
    std::vector<long long> stones;
    long long num;
    while (file >> num)
    {
        stones.push_back(num);
    }
    std::unordered_map<std::string, long long> futureStones;
    std::cout << findStones(stones, 75) << '\n';

    return 0;
}