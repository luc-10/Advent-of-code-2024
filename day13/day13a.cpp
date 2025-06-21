#include <iostream>
#include <fstream>
#include <cmath>

int calcTokens(std::pair<int, int> &buttonA, std::pair<int, int> &buttonB, std::pair<int, int> &prize)
{
    double intersectionX = ((double)buttonA.first * ((double)prize.second * buttonB.first - buttonB.second * prize.first) / ((double)buttonA.second * buttonB.first - buttonB.second * buttonA.first));
    double intersectionY = (double)intersectionX * buttonA.second / buttonA.first;

    if (floor(intersectionX) != ceil(intersectionX) || floor(intersectionY) != ceil(intersectionY))

        return 0;
    int tokens = 0;
    tokens += (intersectionX / buttonA.first) * 3;
    tokens += (prize.second - intersectionY) / buttonB.second;
    return tokens;
}

int main()
{
    std::ifstream file("input.txt");
    std::string buttonAString;
    std::string buttonBString;
    std::string prizeString;
    std::string emptyString;

    std::pair<int, int> buttonA;
    std::pair<int, int> buttonB;
    std::pair<int, int> prize;
    int tokens = 0;
    while (std::getline(file, buttonAString))
    {
        std::getline(file, buttonBString);
        std::getline(file, prizeString);
        std::getline(file, emptyString);

        sscanf(buttonAString.c_str(), "Button A: X+%d, Y+%d", &buttonA.first, &buttonA.second);
        sscanf(buttonBString.c_str(), "Button B: X+%d, Y+%d", &buttonB.first, &buttonB.second);

        sscanf(prizeString.c_str(), "Prize: X=%d, Y=%d", &prize.first, &prize.second);

        tokens += calcTokens(buttonA, buttonB, prize);
    }
    std::cout << tokens << '\n';
    return 0;
}