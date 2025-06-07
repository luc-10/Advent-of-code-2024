#include <iostream>
#include <vector>
#include <sstream>
#include <fstream>

bool checkRecursive(std::vector<long long> &nums, int index, long long tot)
{
    if (tot > nums[0])
        return false;
    if (index >= nums.size())
        return tot == nums[0];
    else
    {
        return checkRecursive(nums, index + 1, tot + nums[index]) || checkRecursive(nums, index + 1, tot * nums[index]);
    }
}

bool checkLine(std::vector<long long> &nums)
{
    return checkRecursive(nums, 2, (long long)nums[1]);
}

int main()
{
    std::ifstream file("input.txt");

    long long sum = 0;
    std::string line;
    while (std::getline(file, line))
    {
        std::stringstream ss(line);
        long long num;
        char sep;

        ss >> num >> sep;

        std::vector<long long> nums;
        nums.push_back(num);
        while (ss >> num)
        {
            nums.push_back(num);
        }
        if (checkLine(nums))
        {
            sum += nums[0];
        }
    }
    std::cout << sum << '\n';
    return 0;
}