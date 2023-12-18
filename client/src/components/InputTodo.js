import React, {useState} from "react";



const InputTodo= (props)=>{
    
    const [description, setDescription]= useState("");
   

    function handleChange(event){
        
        setDescription(event.target.value)


    }


    const onSubmitForm = async (e) => {
        e.preventDefault();

        try{
           
            const body= {description:description};
           

            const response= await fetch("http://localhost:5001/todos", {
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(body)
            }).then(res=>res.json())
            
            console.log(`Your response is....`,response)
            
            props.setUpdateFormDisplay(function(prev){
                let theUpdatedVersion= [...prev];
                theUpdatedVersion.push(false);
                return theUpdatedVersion;
            })

            props.setTheTodos(function(prev){
                let theUpdatedVersion= [...prev];
                if(theUpdatedVersion.length===0){
                    theUpdatedVersion.push({todo_id:response.todo_id, description: description});
                }
                else {
                    theUpdatedVersion.push({todo_id:theUpdatedVersion[theUpdatedVersion.length-1].todo_id+1, description: description});
                }
                return theUpdatedVersion;

            })
            setDescription("");


        }
        catch(err){
            console.error(err.message)
        }


    }
    
    return (

        <>
        
            <p className="AddTitle">Add a todo note!</p>
            <form onSubmit={onSubmitForm}> 
                <input type="text" value={description} onChange={handleChange}/>

                <button type="submit">Add</button>

            </form>
        
        
        
        
        </>

    )


}

export default InputTodo;