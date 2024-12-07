
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
   let text= &args[1];
    echo(text);
}

fn echo(text: &String){
 print!("{}", text);
}

