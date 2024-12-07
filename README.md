# YSWS-examples

These are Different ways cli app can be implemented, while developing this I especially enjoyed Rust and Go as the second I am still learning those langauge not profieceny in them but I see ways I can use them as a programmer.


Enough from that, so they are many things I would have done to make the cli apps much more better but that wasn't my target while creating so anyone reading this can take them where I left them and add more functionality on.

-----------------------
# CLi Example of using yargs using options

This is another example of using options while developing Cli tools to use this one you can use it in multpile ways.

### Ways of Installing:

- `npm i cli-todo-yargs -g` and then after `cli-todo-yargs -n "Finish homework" "Study math" -l`
- `npx cli-todo-yargs  -n "Finish homework" "Study math" -l`

Either way work perfectly

----------------------------
# Cli todo ysws using javascript
You can run this example right now on your laptop use `npx cli-todo-ysws-js`

## Tools used: 

- @clack/prompts for building the interface
- cli-table for displaying table
- picocolors used for coloring

## Publish the package

Before publish the package make sure it works on your machine you can use either `npm install -g` or `npm link` this will install your package globally make sure in the package.json you have `"bin": "./index.js"`

Use **npm login** and after run **npm publish** next is to run your pacage ***npx nameofyourpackage*** 

or you can choose to run ***npm install nameofyourpackage -g*** after just run the name of the package ***nameofyourpackage*** 


--------------------

# TODO RUST CLI

In this repo they are two folders one is a `todo-cli` and another is called `tools`, so `tools` are basic command we know like `Echo` and `Cat`


# Installation

If you have rust on your system clone this repo and then `cd` into it after that run `cargo run` and that's it, same goes for `tools`.

Another way you can run is through `cargo install cli-todo-rust` but it won't include the `tools` folder. I suggest doing the first step.


But that's not the only way we can test our programs, we can even use binary  by using `cargo build` I won't use it in this example but that is also an option.

----------------------

# TODO GO CLi

This is todo cli app made in go, nothing special about it only to just that it save files to your laptop in a folder named todo.

# Installing 

The first way is to git clone the rpo and if you have go you can run it `go run main.go todo.go` 

The second way is that you can just build it and use it as an exec file `go build`


The third way is to just download an exceutable from this repo and run it on any os


