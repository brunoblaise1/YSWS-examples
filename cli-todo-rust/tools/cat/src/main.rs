use std::env;
use std::fs;
fn main() {
    let args: Vec<String> = env::args().collect();
    let file = &args[1];
    cat(file);
}

fn cat (file:  &String) {
    let content = fs::read_to_string(file).expect("error occured");
    println!("File read! {content}");
}
