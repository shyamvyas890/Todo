import React from "react";

const EditTodo = (props)=>{

    const [newDesc, setNewDesc]= React.useState("");

    console.log(newDesc);


    function handleChange(event){
        console.log(event)
        setNewDesc(event.target.value)
    }

    const editThis = async (event, theId, theNewDescription) =>{
        event.preventDefault();
    
        try{
            
            const response= await fetch(`http://localhost:5001/todos/${theId}`, {
                method:"PUT",
                headers: {
                    "Content-type":"application/json"
                },
                body:JSON.stringify({description:theNewDescription})
            }).then(res=>res.json());
    
            console.log(response);

            let updateArr=[];
            for(let i=0;i<props.updateFormDisplay.length;i++){
                if(i!==props.stateArrayIndex){
                    updateArr.push(props.updateFormDisplay[i]);
                }
                else{
                    updateArr.push(!props.updateFormDisplay[i]);
                }
            }
            props.setUpdateFormDisplay(updateArr);


            props.setTheTodos(function(prev){
                let newArray= [...prev];
                for(let i=0;i<newArray.length;i++){
                        if(newArray[i].todo_id===theId){
                            newArray[i].description=theNewDescription;
                        }
                }
                return newArray;


            })
    
        }
    
        catch(err){
            console.error(err);
        }
    
    
    
    
    }



    return (


        <form onSubmit={(event)=>{editThis(event,props.todoId,newDesc)}}>

            <input type="text" defaultValue={props.oldDescription} placeholder="New Description" onChange={(e)=>{handleChange(e)}}/>
            <button type="submit">Change the Description!</button>
        </form>
    )







}

export default EditTodo;
