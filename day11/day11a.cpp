#include <fstream>
#include <iostream>
#include <vector>
#include <cmath>

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

void transform(std::vector<long long> &stones, int blinks)
{
    std::vector<long long> newStones;
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
    std::ifstream file("input.txt");
    std::vector<long long> stones;
    long long num;
    while (file >> num)
    {
        stones.push_back(num);
    }
    transform(stones, 25);
    std::cout << stones.size() << '\n';

    return 0;
}