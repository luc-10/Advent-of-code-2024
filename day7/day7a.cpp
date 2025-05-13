#include <iostream>
#include <vector>
#include <sstream>
#include <fstream>

using std::cout;
using std::ifstream;
using std::string;
using std::stringstream;
using std::vector;

bool checkRecursive(vector<long long> &nums, int index, long long tot)
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

bool checkLine(vector<long long> &nums)
{
    return checkRecursive(nums, 2, (long long)nums[1]);
}

int main()
{
    ifstream file("input.txt");

    long long sum = 0;
    string line;
    while (getline(file, line))
    {
        stringstream ss(line);
        long long num;
        char sep;

        ss >> num >> sep;

        vector<long long> nums;
        nums.push_back(num);
        cout << num << ' ';
        while (ss >> num)
        {
            cout << num << ' ';
            nums.push_back(num);
        }
        cout << '\n';
        if (checkLine(nums))
        {
            sum += nums[0];
        }
    }
    cout << sum << '\n';
    return 0;
}