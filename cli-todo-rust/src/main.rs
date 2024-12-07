use cliclack::{clear_screen, confirm, input, intro, outro, select, spinner};
use console::style;
use std::{io, thread, time::Duration};

use cli_table::{format::Justify, print_stdout, Cell, Style, Table};
fn main() -> io::Result<()> {
    // set two todos and keep them in an arry of string  be able to slect them mark them as done and diplay a table
    ctrlc::set_handler(move || {}).expect("Ctrl-c Handler");
    clear_screen()?;
    intro(style("Welcome to rust todo app").on_cyan().black())?;
    'cont: loop {
        let mut todo_arr = vec![];
        let mut track = 0;
        let mut todo_table = vec![];

        loop {
            track += 1;
            let todo: String = input("What are your todos Today!")
                .placeholder("Run a mile")
                .interact()?;

            todo_arr.push((todo.clone(), todo.clone(), "Mark as done"));
            todo_table.push(todo);

            if track == 2 {
                break;
            }
        }

        if todo_arr.len() != 2 {
            println!("Bro I don't how you didn't but consider entering two todos")
        }

        let spinner = spinner();
        spinner.start("creating...");
        thread::sleep(Duration::from_secs(5));
        spinner.stop("Created....");

        let select_todo = select("Nice!! Now it's time to select your todo")
            .items(&todo_arr)
            .interact()?;

        let confirm =
            confirm("Do you wish to continue or do you want to display a table").interact()?;

        if confirm != true {
            for t in todo_table {
                let complete = if &select_todo == &t {
                    "Yes"
                } else if select_todo == t {
                    "Yes"
                } else {
                    "No"
                };

                let table = vec![vec![
                    Cell::cell(&t),
                    Cell::cell(complete).justify(Justify::Right),
                ]]
                .table()
                .title(vec![
                    Cell::cell("Todo Name").bold(true),
                    Cell::cell("Completed").bold(true),
                ])
                .bold(true);
                print_stdout(table)?;
            }

            break 'cont;
        }
    }

    outro(style("Thank you for turning in with us").on_green().black())?;
    Ok(())
}
