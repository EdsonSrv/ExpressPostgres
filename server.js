const {Client} = require('pg')

const client = new Client({
  "user": "postgres",
  "password": "secret",
  "host": "172.17.0.2",
  "port": 5432,
  "database": "youtube"
})

start()
async function start(){
    await connect()
    const youtube = await readYoutube()
    console.log(youtube)

    const successCreate = await createYoutube("Go to trader joes")
    console.log(`Creating was ${successCreate}`)

   // const successDelete = await deleteYoutube(1)
   // console.log(`Deleting was ${successDelete}`)
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

async function createYoutube(text){
  try {
    await client.query("insert into videos (id, title, description) values (1, 'hola mundo', 'description text')")
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
