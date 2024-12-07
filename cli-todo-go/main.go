package main

import (
	"bufio"
	"fmt"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/common-nighthawk/go-figure"
	"github.com/leaanthony/spinner"
)

func getInput(r *bufio.Reader) (string, error) {
	input, err := r.ReadString('\n')
	return strings.TrimSpace(input), err
}

func createTodo() todo {
	fmt.Print(Gray + "\n Enter a name of your todos: " + Gray)
	reader := bufio.NewReader(os.Stdin)
	name, _ := getInput(reader)
	newtodo := newTodo(name)
	a := spinner.New("Initializing a new project...")
	a.Start()
	time.Sleep(time.Second * 2)
	a.Success()
	return newtodo
}
func option(t todo) {
	fmt.Println("Enter option like a (to add a new todo), c (to choose a todo to mark as done), d (display the table), s (save your todo on a txt file): ")
	reader := bufio.NewReader(os.Stdin)
	options, _ := getInput(reader)
	switch options {
	case "a":
		fmt.Println(Gray + "Enter a new todo" + Gray)
		add, _ := getInput(reader)
		t.AddTodo(add, false)
		a := spinner.New("Creating todo...")
		a.Start()
		time.Sleep(time.Second * 2)
		a.Success()
		option(t)
	case "c":
		fmt.Println(Gray + "Choose a todo By entering the name of your todo ........." + Gray)
		name, _ := getInput(reader)
		t.choose(name)
		option(t)
	case "d":
		fmt.Println(Gray + "Displaying todos...." + Gray)
		fmt.Println(t.format())
		option(t)
	case "s":
		a := spinner.New("Saving File..")
		a.Start()
		time.Sleep(time.Second * 2)
		a.Success()
		t.save()
	default:
		fmt.Println(Gray + "Please enter a valid option" + Gray)
		a := spinner.New("Starting again...")
		a.Start()
		time.Sleep(time.Second * 2)
		a.Success()
		option(t)
	}
}
func main() {
	myFigure := figure.NewColorFigure("Welcome To Todo App", "", "green", true)
	myFigure.Print()

	todo := createTodo()
	option(todo)

}

func init() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-c
		// Run Cleanup
		os.Exit(1)
	}()
}
