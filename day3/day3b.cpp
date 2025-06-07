#include <fstream>
#include <iostream>

int n1, n2, tot;

char getNextChar(char c);
void fsmOnNum(std::ifstream &file, int num, int size, bool num1);
void fsmOnChar(std::ifstream &file, char ch);
void fsmOnNothing(std::ifstream &file);
void fsmOnDont(std::ifstream &file, char ch);

int main()
{
    std::ifstream file("input.txt");
    fsmOnNothing(file);
    std::cout << tot << '\n';
}

void fsmOnDont(std::ifstream &file, char ch)
{
    char c;
    if (!file.get(c))
    {
        return;
    }
    if (ch == 0 && c == 'd')
    {
        fsmOnDont(file, 1);
    }
    else if (ch == 1 && c == 'o')
    {
        fsmOnDont(file, 2);
    }
    else if (ch == 2 && c == '(')
    {
        fsmOnDont(file, 3);
    }
    else if (ch == 3)
    {
        fsmOnNothing(file);
    }
    else
    {
        fsmOnDont(file, 0);
    }
}

char getNextChar(char c)
{
    switch (c)
    {
    case 'm':
        return 'u';
        break;
    case 'u':
        return 'l';
        break;
    case 'l':
        return '(';
        break;
    case '(':
        return '0';
        break;
    case 'd':
        return 'o';
        break;
    case 'o':
        return 'n';
        break;
    case 'n':
        return '\'';
        break;
    case '\'':
        return 't';
        break;
    case 't':
        return 1;
        break;
    default:
        break;
    }
    return 0;
}

void fsmOnNum(std::ifstream &file, int num, int size, bool num1)
{
    char c;
    if (!file.get(c))
    {
        return;
    }
    if (c == ',')
    {
        if (num1)
        {
            n1 = num;
            fsmOnNum(file, 0, 0, 0);
        }
        else
        {
            fsmOnNothing(file);
        }
    }
    else if (c == ')')
    {
        if (num1)
        {
            fsmOnNothing(file);
        }
        else
        {
            n2 = num;
            tot += n1 * n2;
            fsmOnNothing(file);
        }
    }
    else if (c < '0' || c > '9')
    {
        fsmOnNothing(file);
    }
    else if (size >= 4)
    {
        fsmOnNothing(file);
    }
    else
    {
        num *= 10;
        num += c - '0';
        fsmOnNum(file, num, size + 1, num1);
    }
}

void fsmOnChar(std::ifstream &file, char ch)
{

    char c;
    if (ch == '0')
    {
        fsmOnNum(file, 0, 0, 1);
    }
    if (!file.get(c))
    {
        return;
    }
    if (c == ch)
    {
        fsmOnChar(file, getNextChar(c));
    }
    else if (ch == 1)
    {
        if (c == '(')
        {
            fsmOnChar(file, 2);
        }
        else
        {
            fsmOnNothing(file);
        }
    }
    else if (ch == 2)
    {
        if (c == ')')
        {
            fsmOnDont(file, 0);
        }
        else
        {
            fsmOnNothing(file);
        }
    }
    else
    {
        fsmOnNothing(file);
    }
}

void fsmOnNothing(std::ifstream &file)
{
    char c;
    if (!file.get(c))
    {
        return;
    }
    if (c == 'm' || c == 'd')
    {
        fsmOnChar(file, getNextChar(c));
    }
    else
    {
        fsmOnNothing(file);
    }
}