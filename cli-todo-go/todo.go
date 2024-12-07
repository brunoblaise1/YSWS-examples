package main

import (
	"fmt"
	"os"
)

var Gray string = "\033[34m"
var Red string = "\033[31m"
var Green string = "\033[32m"

type todo struct {
	name    string
	todoArr map[string]bool
}

func newTodo(name string) todo {
	b := todo{
		name:    name,
		todoArr: map[string]bool{},
	}

	return b

}

func (t *todo) format() string {
	fs := "List of Todos: \n"
	for k, v := range t.todoArr {
		fs += fmt.Sprintf("\n %-25v ..... %v \n", k+":", v)
	}
	return fs
}
func (t *todo) AddTodo(name string, compl bool) {
	t.todoArr[name] = compl
}

var chooseString string = Red + "No todo exist" + Red

func (t *todo) choose(name string) string {

	for k := range t.todoArr {
		if k != name {
			fmt.Println(chooseString)
		} else {
			chooseString = k
			t.todoArr[k] = true
		}
	}
	return chooseString

}

func (t *todo) save() {
	data := []byte(t.format())
	err := os.WriteFile("todo/"+t.name+".txt", data, 0644)

	if err != nil {
		panic(err)
	}
	fmt.Println(Green + "Todo is saved success" + Green)
}
