import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import AddTodoMutation from './mutations/AddTodo';
import DeleteTodoMutation from './mutations/DeleteTodo';

export default class Todo extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  constructor( props ){
    super( props );
    this._addTodo = this._addTodo.bind( this );
    this._handleTodoText = this._handleTodoText.bind( this );
    this._deleteTodo = this._deleteTodo.bind( this );
  }

  state = {
    todoText : ''
  }

  _handleTodoText(e){
    this.setState({
      todoText: e.target.value
    })
  }

  _addTodo(){
    let _this = this;
    let newTodo = this.state.todoText;
    if( newTodo !== ''){
      Relay.Store.commitUpdate(new AddTodoMutation({
        title: newTodo,
        completed: false
      }), {
        onSuccess: (res) => {
          this.setState({
            todoText: ''
          })
          _this.props.relay.forceFetch();
        }
      });
    }
  }

  _deleteTodo( id ){
    let _this = this;
    Relay.Store.commitUpdate(new DeleteTodoMutation({
      id: id
    }),{
      onSuccess: (res) => {
        _this.props.relay.forceFetch();
      }
    })
  }

  render() {
    return (
      <div style={{margin:'0 auto', width:'60%'}}>
        <h3>Todo Page</h3>
        <div>
          <h5>Add Todo</h5>
          <input type='text' value={this.state.todoText} onChange={this._handleTodoText}/> <button onClick={this._addTodo}>Add Todo</button>
        </div>
        <div>
        {this.props.viewer.todoList.map(( todo, key )=>{
            let todoStatus = 'Done';
            if( todo.completed === false ){
              todoStatus = 'Pending';
            }
            return (
              <div key={key}>
                <span>{todoStatus} -- {todo.title}</span> -- <button onClick={() => {this._deleteTodo(todo._id)}}>Delete</button>
              </div>
            )
        })}
        </div>
      </div>
    );
  }
}