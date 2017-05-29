import { db } from '../../database'

let addTodo = ( args ) => {
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

let deleteTodo = ( args ) => {
  return new Promise(( resolve, reject )=>{
    db.todo.findByIdAndRemove(args.id, (err) => {
      if( err ){
        reject( err )
      }else{
        resolve( true )
      }
    })
  })
}

let getTodoList = () => {
  return new Promise(( resolve, reject )=>{
    db.todo.find({}).exec((err, todos ) => {
      if( err ){
        reject( err )
      }else{
        resolve( todos )
      }
    })
  })  
}

export{
  getTodoList,
  addTodo,
  deleteTodo
}