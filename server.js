const {Client} = require('pg')
const express = require('express')
const app = express();
app.use(express.json())

const client = new Client({
  "user": "postgres",
  "password": "secret",
  "host": "172.17.0.2",
  "port": 5432,
  "database": "youtube"
})

app.get("/youtube", async (req, res) => {
  const rows = await readYoutube()
  res.setHeader("content-type", "application/json")
  res.send(JSON.stringify(rows))
})
/* app.post("/youtube", async (req, res) => {
let result = {}
  try {
    const reqJson = req.body
    await createYoutube(reqJson.youtube)
    result.success = true
  } catch (error) {
    result.success = false
  }
  finally {
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
  }
})
 */

app.listen(8090, () => console.log("Web server is listening... on port 8090"))

start()
async function start(){
    await connect()

    //const youtube = await readYoutube()
    //console.log(youtube)
    
    //const successCreate = await createYoutube(["Title example","Go to trader joes"])
    //console.log(`Creating was ${successCreate}`)
    
    //const successDelete = await deleteYoutube(1)
    //console.log(`Deleting was ${successDelete}`)
}

async function connect(){
  try{
    await client.connect()
    console.log(`Connection Success`)
  }
  catch(e){
    console.log(`Failed to connect ${e}`)
  }
}

async function readYoutube(){
  try {
    const result = await client.query("select id, title, description from videos")
    return result.rows
  } catch (error) {
    return []    
  }
}

async function createYoutube(values){
  try {
    await client.query("insert into videos (id, title, description) values (2, $1, $2)",values)
    return true
  } catch (error) {
    return false
  }  
}

async function deleteYoutube(id){
  try {
    await client.query("delete from videos where id = $1",[id])
    return true
  } catch (error) {
    return false
  }
}
