const express= require("express");
const app= express();
const cors= require("cors")
const pool= require("./db")

app.use(cors())
app.use(express.json())


app.post("/todos", async (req, res) => {
    try{
       const {description}= req.body;
       const newTodo=  await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        return res.json(newTodo.rows[0]);

    }
    catch(err){
        console.error(err)

        return res.json("It failed")

    }
})



app.get("/todos", async (req, res)=>{
    try {

        const allTodos= await pool.query("SELECT * FROM todo ORDER BY todo_id ASC")

        return res.json(allTodos.rows)

        
    } catch (err) {
        console.error(err)
        return res.json("there was an error")
    }

})

app.get("/todos/:id", async (req, res)=>{
    try {

        const allTodos= await pool.query(`SELECT * FROM todo WHERE todo_id='${req.params.id}'`)

        return res.json(allTodos.rows[0])

        
    } catch (err) {
        console.error(err)
        return res.json("there was an error")
    }

})

app.put("/todos/:id", async (req,res)=>{
    try {
        const theId= req.params.id;
        const theUpdatedDescription= req.body.description;

        const updateIt= await pool.query(`UPDATE todo SET description='${theUpdatedDescription}' WHERE todo_id='${theId}'`)

        return res.json(updateIt)


    }
    catch(err){
        console.error(err);
        return res.json("there was an error")
    }



})

app.delete("/todos/:id", async (req,res)=>{
    try {
        const theId= req.params.id;

        const deleteIt= await pool.query(`DELETE from todo WHERE todo_id='${theId}'`);

        return res.json(deleteIt)

    }

    catch{
        console.error(err);
        return res.json("there was an error")


    }



})



app.listen(5001, ()=>{
    console.log("server started on port 5001")
});