#!/usr/bin/env node

import * as p from '@clack/prompts'
import color from 'picocolors'
import { setTimeout } from 'timers/promises'

import Table from 'cli-table'


class Todo {
    value
    start
    end
    constructor(value, start, end){
        this.value = value
        this.start = start
        this.end = end
    }
}

async function onCancel (){
   p.cancel("Todo Cli has been cancelled")
   process.exit(0)
}



let table = new Table({
   head: ['Name Todo', "Start of the todo", "End of the todo"]
   , colWidths: [21, 20, 20]
   , style : {
      head:["grey"]
   }
});
async function createTodo(numberOfTodo){
    const textResult= [];
    let todoClass
    const options = []

for (let i =1; i <= numberOfTodo; i++){
      const newTodo = await p.group({
         value: async ()=>  
            await p.text({
               message: "Enter text here",
               placeholder: `Enter the name of your ${i} todo here`,
               validate(value) {
                  if(value.length === 0){
                     p.log.error("Invalid Lenght")
                     process.exit(0)
                  }
               }
            }),
        
         start: async ()=>
           await p.text({
               message: "The starting time",
               placeholder: "When are you starting to work on this",
               validate(value) {
                  if(value.length === 0){
                     p.log.error("Invalid Lenght")
                     process.exit(0)
                  }
               }
            }),
           
         end: async ()=> 
           await p.text({
               message: "Time of ending",
               placeholder: "At what time is this todo is going to be done",
               validate(value) {
                  if(value.length === 0){
                     p.log.error("Invalid Lenght")
                     process.exit(0)
                  }
               }
            }),  
      }, {
        onCancel
      });

      if(newTodo.end && newTodo.name && newTodo.start){
        const s = p.spinner()
        s.start("Creating new todo ....")
        await setTimeout(2000)
        s.stop("Finished creating new todos")
      }


      todoClass = new Todo(
         newTodo.value,
         newTodo.start,
         newTodo.end
      )

    textResult.push(todoClass) 
   }

   for(const t of textResult){
     options.push({ value: t.value, label: t.value })
     }
    await ShowTodos(options, textResult)
 
}

async function ShowTodos (options, textResult){
   const doneTodo= [] 
   const workingTodo = await p.group ({
      selectTodo: async ()=>
        await p.select({
         message: "You can either select one todo to work on",
         options: options,
         
       }) 
      ,
       
      markDone: async ({results})=> {
         const answer = await p.select({
            message: "Mark as done",
            initialValue: "Yes",
            options: [
               {value: "Yes", label: "Yes"},
               {value: "No", label: "No"}
            ]
         })
    
         if(answer === "Yes" ){
            doneTodo.push({todo: results.selectTodo, complete: "Yes" })      
         } 
      },
      continueTodo: async ()=> {
         const filtered = []
         let wishContinue  
         while(doneTodo.length !== textResult.length){

            if(doneTodo.length === textResult.length){
            wishContinue = await p.select({
               message: "This is the end bye",
               initialValue: "Yes",
               options: [
                  {value: "Yes", label: "Yes"}
               ]
            }) 
         }else{
            wishContinue = await p.select({
               message: "Do you wish to continue",
               initialValue: "Yes",
               options: [
                  {value: "Yes", label: "Yes"},
                  {value: "No", label: "No"}
               ]
            }) 
         }
            if(wishContinue === "Yes"){
            for (const r of options){
             for (const d of doneTodo){
              
                if(d.todo !== r.value){
              
                  filtered.push(r)
              
                }             
             }
            }
          const continueTodo =  await p.select({
             message: "Select another to work on",
             options: filtered
           })
 
           const mark =  await p.select({
             message: "Mark as done",
             initialValue: "Yes",
             options: [
                {value: "Yes", label: "Yes"},
                {value: "No", label: "No"}
             ]
          })
          if(mark === "Yes" ){
             doneTodo.push({todo: continueTodo, complete: "Yes" })      
          } 
         }
          }
      },
      showTable: async ()=> {
         const fullTable=[]
            for (const d of textResult){
               fullTable.push([d.value, d.start, d.end])     
               } 


         await p.select({
            message: "Display the table",
            options: [
               {value: "Yes", label: "Yes"},
               {value: "No", label:"No"}
            ]
         })
      fullTable.forEach((r)=>table.push(r))
        
      
         console.log(table.toString()); 
      }

   },
{
 onCancel
})
}


async function main (){
 console.clear()

 await setTimeout(1000)
 p.intro(`${color.bgCyanBright('Hey here! mate so good to see you')}, ${color.cyan('Create a list of todos')} you can work today good luck`)

 const ready = await p.select({
   message: `Are you ready to write down todos for today`,
   initialValue: "Yes",
   options:[
        {value: "Yes", label: "Yes"},
        {value: "No", label: "No"}
   ]
 });

 if(ready === "Yes"){
   const numberTodo = await p.text({
      message: "How many todos are you working on Today",
      placeholder: "Number of your todos",
      validate(value) {
         if(value.length === 0 ){
            p.log.error("Invalid length or you have entered a number great than 2")
            process.exit(0)
           
         }else if(typeof value ==='number'){
            p.log.error("You entered a string instead of a number")
            process.exit(0)
         }     
      },
   }) 
   
   const numberOfTodo = numberTodo
   
   if(!(numberOfTodo <= 2) || numberOfTodo === 0 ){
      p.log.error("Invalid number, enter two or less but zero")
   }else{
      await createTodo(numberOfTodo)
      p.outro(`Thanking for choosing us to manage your todos`)
 
   }
   
 }else{
    p.outro(`Thank you but make sure to come back again`)
 }
}


main().catch(console.error)