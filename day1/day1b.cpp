#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>
#include <unordered_map>

void findDist(std::vector<int> &l1, std::vector<int> &l2)
{
    std::unordered_map<int, int> freq;
    for (int i : l2)
    {
        freq[i]++;
    }
    int dist = 0;
    for (int i : l1)
    {
        dist += i * freq[i];
    }
    std::cout << dist << '\n';
}
int main()
{
    std::ifstream file("input.txt");

    std::vector<int> l1, l2;
    int n1, n2;
    while (file >> n1 >> n2)
    {
        l1.push_back(n1);
        l2.push_back(n2);
    }

    findDist(l1, l2);

    return 0;
}