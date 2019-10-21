#include <iostream>
#include <fstream>
#include <list>
#include <stdio.h>
#include <sstream>

using namespace std;

int singleFileDelete()	{
	int flag = 0;
	string ans;
	string line;
	list<string> l;
	fstream f;
	while(flag == 0)	{
		cout << "Enter the name of the file you wish to delete, including the extension: ";
		cin >> ans;
		f.open(ans.c_str());
		if(!f.is_open())	{
			cout << "No such file exists." << endl;
		}
		else	{
			flag = 1;
		}
	}
	while(getline(f, line))	{
		l.push_back(line);
	}
	f.clear();
	f.seekg(0, ios::beg);
	list<string>::iterator it;
	for(it = l.begin(); it != l.end(); it++)	{
		string s = *it;
		for(int i = 0; i < s.length(); i++)	{
			s[i] = 'a';
		}
		f << s << endl;
	}
	f.close();
	remove(ans.c_str());
}

int drivePurge()	{
	int flag = 0;
	int innerFlag = 0;
	int count = 1;
	int innerCount = 1;
	while(flag == 0)	{
		string s = "file";
		ostringstream convert;
		convert << count;
		s = s + convert.str() + ".txt";
		ofstream out;
		out.open(s.c_str());
		if(out.is_open())	{
			while(innerFlag == 0)	{
				out << "empty data being printed into file" << endl;
				if(out.fail())	{
					flag = 1;
					innerFlag = 1;
					break;
				}
				innerCount++;
				if(innerCount == 1000)	{
					innerFlag = 1;
				}
			}	
		}
		out.flush();
		out.close();
	}
	for(int i = 1; i < count; i++)	{
		string s = "file";
		ostringstream convert;
		convert << count;
		s = s + convert.str() + ".txt";
		remove(s.c_str());
	}
	
}

int main()	{
	string ans;
	int flag = 0;
	while(flag == 0)	{
		cout << "Would you like to delete a file or purge the drive?: ";
		cin >> ans;
		if(toupper(ans.at(0)) == 'D')	{
			singleFileDelete();
			flag = 1;
		}
		if(toupper(ans.at(0)) == 'P')	{
			drivePurge();
			flag = 1;
		}
		if(flag == 0)	{
			cout << "Invalid command." << endl;
		}
	}
}
