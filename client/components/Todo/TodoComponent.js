import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import AddTodoMutation from './mutations/AddTodo';

export default class Todo extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  constructor( props ){
    super( props );
    this._testMutation = this._testMutation.bind( this );
    this._handleTodoText = this._handleTodoText.bind( this );
  }

  state = {
    todoText : ''
  }

  _handleTodoText(e){
    this.setState({
      todoText: e.target.value
    })
  }

  _testMutation(){
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

  render() {
    return (
      <div style={{margin:'0 auto', width:'60%'}}>
        <h3>Todo Page</h3>
        <div>
          <h5>Add Todo</h5>
          <input type='text' value={this.state.todoText} onChange={this._handleTodoText}/> <button onClick={this._testMutation}>Add Todo</button>
        </div>
        <div>
        {this.props.viewer.todoList.map(( todo, key )=>{
            let todoStatus = 'Done';
            if( todo.completed === false ){
              todoStatus = 'Pending';
            }
            return (
              <div key={key}>
                <span>{todoStatus} -- {todo.title}</span>
              </div>
            )
        })}
        </div>
      </div>
    );
  }
}