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
    await connect();
   // const youtube = await readYoutube();
   // console.log(youtube)

   // const successCreate = await createYoutube("Go to trader joes")
   // console.log(`Creating was ${successCreate}`)

   // const successDelete = await deleteYoutube(1)
   // console.log(`Deleting was ${successDelete}`)
}

async function connect(){
  try{
    await client.connect();
    console.log(`Success`)
  }
  catch(e){
    console.log(`Failed to connect ${e}`)
  }
}