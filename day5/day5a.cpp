#include <iostream>
#include <fstream>
#include <unordered_map>
#include <vector>
#include <sstream>
#include <algorithm>

bool correct(std::vector<int> &arr, std::vector<std::unordered_map<int, bool>> &g, std::unordered_map<int, int> &mapper)
{
    for (int i = 0; i < arr.size() - 1; i++)
    {
        if (!g[mapper[arr[i]]][mapper[arr[i + 1]]])
        {
            return false;
        }
    }
    return true;
}
int main()
{
    std::unordered_map<int, int> mapper;
    std::vector<std::unordered_map<int, bool>> graph(1);
    std::ifstream file("input.txt");

    std::string line;
    bool readingLists = false;
    int index = 1;
    int sum = 0;

    while (getline(file, line))
    {
        if (!readingLists)
        {

            if (line.find('|') != std::string::npos)
            {
                std::stringstream ss(line);
                int num1, num2;
                char sep;
                if (ss >> num1 >> sep >> num2 && sep == '|')
                {
                    if (!mapper[num1])
                    {
                        mapper[num1] = index;
                        index++;
                    }
                    if (!mapper[num2])
                    {
                        mapper[num2] = index;
                        index++;
                    }
                    if (graph.size() < index)
                    {
                        graph.resize(index);
                    }
                    graph[mapper[num1]][mapper[num2]] = true;
                }
            }
            else
            {
                readingLists = true;
            }
        }
        if (readingLists)
        {
            std::vector<int> nums;
            std::stringstream ss(line);
            int num;
            char sep;

            while (ss >> num)
            {
                nums.push_back(num);
                ss >> sep;
            }
            if (nums.empty())
                continue;
            if (correct(nums, graph, mapper))
            {
                sum += nums[nums.size() / 2];
            }
        }
    }
    std::cout << sum << '\n';

    return 0;
}