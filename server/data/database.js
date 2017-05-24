import mongoose from 'mongoose'

let db = {
  todo : false
}

function connect(){
  try{
    let conn = mongoose.connect('mongodb://localhost/todo');
    console.log('Mongo - Database has been connected');
    let todo = mongoose.Schema({}, {
        strict: false,
        collection: 'todo'
    });
    db = {
      todo : conn.model('todo', todo )
    }
  }catch( err ){
    console.error(err.stack);
  }  
}



export {
  connect,
  db
};