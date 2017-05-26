import { db } from '../../database'

function addTodo( args ){
  return new Promise((resolve, reject)=>{
    let newTodo = {
      title: args.title,
      completed: args.completed
    }
    let model = new db.todo(newTodo);
    model.save(function (err) {
      if (err) {
        reject( err )
      } else {
        resolve( model )
      }
    });
  })
}

function getTodoList(){
  return new Promise(( resolve, reject )=>{
    db.todo.find({}).exec((err, todos ) => {
      if( err ){
        reject( err )
      }else{
        resolve( todos )
      }
    })
  })
  // return [
  //   {
  //     title: 'one',
  //     completed: false
  //   },
  //   {
  //     title: 'two',
  //     completed: true
  //   }
  // ]  
}



export{
  getTodoList,
  addTodo
}