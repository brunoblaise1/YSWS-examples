#!/usr/bin/env node

import yargs, { alias,  describe } from 'yargs'
import ora from 'ora'
import Table from 'cli-table';


let table = new Table({
    head:["Name of Todo", "Is commplete"],
    colWidths: [20, 20],
    style:{
        head:['grey']
    }
})

function showTodo(arr: {name: string, complete: string}[], complete: string){

 let displayTodo: any =[];

 for (const t of arr){
    if(complete === t.name){
        displayTodo.push([t.name, "Yes"])
    }else{
        displayTodo.push([t.name, t.complete])
    }
    
   
 }
 displayTodo.forEach((e: string[] | { [x: string]: string; } | { [x: string]: string[]; }) => {
    table.push(e)
 });

 console.log(table.toString());
   }

async function main (){
    try{

        const args:any = yargs(process.argv.slice(2)).option({
            'name': {type: "array", alias: "n", describe: "Name your todo"},
            'list': {type: "boolean", alias: "l", describe: "Display the table" },
            'complete': {type: "string", alias:"c", describe: "Mark as done"}
        }).version('v', 'The version of Todo Cli', '1.0').argv
        const spinner = ora(`Creating the todos....`).start();

        const arr: string[] = args['name'];
        let obj: {name: string, complete: string}[]= []
       
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = 'Finalising...';
          
        }, 5000);

        setTimeout(()=>{  
            spinner.stop();

            for (let i =0; i <= arr?.length; ++i){
                if(arr[i] !== undefined) {        
                obj.push({name: arr[i], complete: "No"})
                }
               }
            if(args['list'] === true){
                showTodo(obj, args['complete'])
            }
        }, 8000)
     
    

   
       
    
    }catch(err){
        console.error(err)
    }

}


main()



