#include <iostream>
#include <fstream>
#include <cmath>

long long calcTokens(std::pair<long long, long long> &buttonA, std::pair<long long, long long> &buttonB, std::pair<long long, long long> &prize)
{
    long long det = buttonA.first * buttonB.second - buttonB.first * buttonA.second;
    long long na = prize.first * buttonB.second - prize.second * buttonB.first;
    if (na % det != 0)
    {
        return 0;
    }
    long long nb = buttonA.first * prize.second - buttonA.second * prize.first;
    if (nb % det != 0)
    {
        return 0;
    }
    long long a = na / det, b = nb / det;
    return a * 3 + b;
}
int main()
{
    std::ifstream file("input.txt");
    std::string buttonAString;
    std::string buttonBString;
    std::string prizeString;
    std::string emptyString;

    std::pair<long long, long long> buttonA;
    std::pair<long long, long long> buttonB;
    std::pair<long long, long long> prize;
    long long tokens = 0;
    while (std::getline(file, buttonAString))
    {
        std::getline(file, buttonBString);
        std::getline(file, prizeString);
        std::getline(file, emptyString);

        sscanf(buttonAString.c_str(), "Button A: X+%lld, Y+%lld", &buttonA.first, &buttonA.second);
        sscanf(buttonBString.c_str(), "Button B: X+%lld, Y+%lld", &buttonB.first, &buttonB.second);

        sscanf(prizeString.c_str(), "Prize: X=%lld, Y=%lld", &prize.first, &prize.second);
        prize.first += 10000000000000;
        prize.second += 10000000000000;
        tokens += calcTokens(buttonA, buttonB, prize);
    }
    std::cout << tokens << '\n';
    return 0;
}
