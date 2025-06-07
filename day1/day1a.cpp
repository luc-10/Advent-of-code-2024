#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>

void findDist(std::vector<int> &l1, std::vector<int> &l2)
{

    sort(l1.begin(), l1.end());
    sort(l2.begin(), l2.end());
    int dist = 0;
    for (int i = 0; i < l1.size(); i++)
    {
        dist += abs(l1[i] - l2[i]);
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