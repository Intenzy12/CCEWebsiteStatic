#include <ncurses.h>

int main(int argc, char** argv)
{
	initscr();
	printw("Hello World\n");
	getch();
	endwin();
}
