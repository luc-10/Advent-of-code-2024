#include <iostream>
#include <fstream>
#include <unordered_map>
#include <vector>
#include <sstream>
#include <algorithm>

using std::cout;
using std::ifstream;
using std::string;
using std::stringstream;
using std::unordered_map;
using std::vector;

bool correct(vector<int> &arr, vector<unordered_map<int, bool>> &g, unordered_map<int, int> &mapper)
{
    cout << "Correct?\n";
    for (int i = 0; i < arr.size() - 1; i++)
    {
        cout << mapper[arr[i]] << ' ' << mapper[arr[i + 1]] << '\n';
        if (!g[mapper[arr[i]]][mapper[arr[i + 1]]])
        {
            cout << "No\n";
            return false;
        }
    }
    cout << "Yes\n";
    return true;
}
int main()
{
    unordered_map<int, int> mapper;
    vector<unordered_map<int, bool>> graph(1);
    ifstream file("input.txt");

    string line;
    bool readingLists = false;
    int index = 1;
    int sum = 0;

    while (getline(file, line))
    {
        if (!readingLists)
        {

            if (line.find('|') != string::npos)
            {
                stringstream ss(line);
                int num1, num2;
                char sep;
                if (ss >> num1 >> sep >> num2 && sep == '|')
                {
                    if (!mapper[num1])
                    {
                        cout << "Mapped " << num1 << " to " << index << '\n';
                        mapper[num1] = index;
                        index++;
                    }
                    if (!mapper[num2])
                    {
                        cout << "Mapped " << num2 << " to " << index << '\n';
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
                cout << "Finished mapping\n";
                readingLists = true;
            }
        }
        if (readingLists)
        {
            vector<int> nums;
            stringstream ss(line);
            int num;
            char sep;

            while (ss >> num)
            {
                nums.push_back(num);
                ss >> sep;
            }
            if (nums.empty())
                continue;
            for (int i : nums)
            {
                cout << i << ' ';
            }
            cout << '\n';
            if (correct(nums, graph, mapper))
            {
                sum += nums[nums.size() / 2];
            }
            /*
            if (!correct(nums, graph, mapper))
            {
                sort(nums.begin(), nums.end(), [&mapper, &graph](int a, int b)
                     { return graph[mapper[a]][mapper[b]]; });
                sum += nums[nums.size() / 2];
            }
            */
        }
    }
    cout << sum << '\n';

    return 0;
}