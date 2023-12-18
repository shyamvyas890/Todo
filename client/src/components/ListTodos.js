import React from "react";


import EditTodo from "./EditTodo"
import InputTodo from "./InputTodo"

const ListTodos= ()=>{    
    const [theTodos, setTheTodos]= React.useState([]);
    const [updateFormDisplay, setUpdateFormDisplay]= React.useState([]);
    console.log(theTodos);
    console.log(updateFormDisplay);
    React.useEffect( ()=>{
        getTheTodos();
    },[]
    );
    const getTheTodos = async () => {
        try{
            const response= await fetch("http://localhost:5001/todos", {
                method:"GET"
                // headers: {
                //     "Content-type":"application/json"
                // }
            }).then(res=>res.json());
            setUpdateFormDisplay(Array(response.length).fill(false));
            setTheTodos(response);
        }
        catch(err){
            console.error(err.message)
        }
    }

    const deleteThis = async (theId) =>{
        try{
            const response= await fetch(`http://localhost:5001/todos/${theId}`, {
                method:"DELETE",
                headers: {
                    "Content-type":"application/json"
                }
            }).then(res=>res.json())
            console.log(response)
            let updateArr=[];
            for(let i=0;i<theTodos.length;i++){
                if(theTodos[i].todo_id!==theId){
                    updateArr.push(updateFormDisplay[i]);
                }
            }

            setUpdateFormDisplay(updateArr);
            setTheTodos(function(prev){
                return prev.filter(function(theElement){
                    return theElement.todo_id !== theId;
                })
            })
        }
        catch(err){
            console.error(err.message)
        }
    }
    const updateIndexFinder= (id)=>{
        let theIndex=-1;
        for(let i=0;i<theTodos.length;i++){
            if(theTodos[i].todo_id===id){
                theIndex=i;
            }
        }
        return theIndex;    
    }
    const updater= (id)=>{
        const index= updateIndexFinder(id);
        const newUpdateRow= [...updateFormDisplay];
        newUpdateRow[index]=!newUpdateRow[index];
        setUpdateFormDisplay(newUpdateRow);
    }
    return (
        <>
            <InputTodo 
                setUpdateFormDisplay={setUpdateFormDisplay}
                setTheTodos={setTheTodos}   
            />
            <h1>Current Todos</h1>
            {
                theTodos.map(function(theTodo){
                    return (<>
                        <p>{theTodo.description}</p>
                        <button onClick={()=>{updater(theTodo.todo_id)}}>Edit</button>
                        {updateFormDisplay[updateIndexFinder(theTodo.todo_id)] && <EditTodo 
                        oldDescription= {theTodo.description}
                        todoId= {theTodo.todo_id}
                        stateArrayIndex= {updateIndexFinder(theTodo.todo_id)}
                        updateFormDisplay={updateFormDisplay}
                        setUpdateFormDisplay={setUpdateFormDisplay}
                        theTodos={theTodos}
                        setTheTodos={setTheTodos}                        
                        />}
                        <button onClick={()=>{deleteThis(theTodo.todo_id)}}>Delete</button>
                        </>
                    )
                })
            }                
        </>
    )
}

export default ListTodos;