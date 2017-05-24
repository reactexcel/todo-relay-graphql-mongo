import { db } from '../../database'

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
  getTodoList
}