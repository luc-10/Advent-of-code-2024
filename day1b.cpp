#include <iostream>
#include <vector>
#include <fstream>
#include <algorithm>
#include <unordered_map>

using std::cout;
using std::ifstream;
using std::unordered_map;
using std::vector;

void findDist(vector<int> &l1, vector<int> &l2)
{
    unordered_map<int, int> freq;
    for (int i : l2)
    {
        freq[i]++;
    }
    int dist = 0;
    for (int i : l1)
    {
        dist += i * freq[i];
    }
    cout << dist << '\n';
}
int main()
{
    ifstream file("input.txt");

    vector<int> l1, l2;
    int n1, n2;
    while (file >> n1 >> n2)
    {
        l1.push_back(n1);
        l2.push_back(n2);
    }

    findDist(l1, l2);

    return 0;
}