import React from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import AddTodoMutation from './mutations/AddTodo';
import DeleteTodoMutation from './mutations/DeleteTodo';
import UpdateTodoMutation from './mutations/UpdateTodo';

export default class Todo extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  constructor( props ){
    super( props );
    this._addTodo = this._addTodo.bind( this );
    this._handleTodoText = this._handleTodoText.bind( this );
    this._deleteTodo = this._deleteTodo.bind( this );
    this._markTodo = this._markTodo.bind( this );
    this._handleUpdateTodoText = this._handleUpdateTodoText.bind( this );
    this._updateTitle = this._updateTitle.bind( this );
    this._resetUpdateForm = this._resetUpdateForm.bind( this );
  }

  state = {
    todoText: '',
    tobeUpdateTitle: '',
    tobeUpdateId: false
  }

  _handleTodoText(e){
    this.setState({
      todoText: e.target.value
    })
  }

  _handleUpdateTodoText(e){
    this.setState({
      tobeUpdateTitle: e.target.value
    })
  }

  _resetUpdateForm(){
    this.setState({
      tobeUpdateId: false,
      tobeUpdateTitle:'',
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

  _markTodo( id, completed ){
    let _this = this;
    Relay.Store.commitUpdate(new UpdateTodoMutation({
      updatetype: 'status',
      id: id,
      completed: completed
    }),{
      onSuccess: (res) => {
        _this.props.relay.forceFetch();
      }
    })
  }

  _updateTitle( ){
    let _this = this;
    Relay.Store.commitUpdate(new UpdateTodoMutation({
      updatetype: 'title',
      id: _this.state.tobeUpdateId,
      title: _this.state.tobeUpdateTitle
    }),{
      onSuccess: (res) => {
        _this._resetUpdateForm();
        _this.props.relay.forceFetch();
      }
    })
  }

  _setEditTodo( todo ){
    this.setState({
      tobeUpdateId: todo._id,
      tobeUpdateTitle: todo.title
    })
  }

  _getEditForm( todo ){
    return(
      <div>
        <input type='text' value={this.state.tobeUpdateTitle} onChange={this._handleUpdateTodoText}/>
        <button onClick={this._resetUpdateForm} style={{marginLeft:'10px'}}>Cancel</button> 
        <button onClick={this._updateTitle} style={{marginLeft:'10px'}}>Update</button>
      </div>
    )
  }

  render() {
    return (
      <div style={{margin:'0 auto', width:'60%'}}>
        <h3>Todo List</h3>
        <div>
          <input type='text' value={this.state.todoText} onChange={this._handleTodoText}/> <button onClick={this._addTodo}>Add Todo</button>
        </div>
        <div>
        {this.props.viewer.todoList.map(( todo, key )=>{
            // check for is editable
            let bgColor = "#94dc94";
            let td = <input type="checkbox" name="vehicle" value={todo._id} defaultChecked onClick={() => {this._markTodo(todo._id, false)}}/>
            if( todo.completed === false ){
              bgColor = "#d6aeae";
              td = <input type="checkbox" name="vehicle" value={todo._id} onClick={() => {this._markTodo(todo._id, true)}}/>
            }
            if( todo._id === this.state.tobeUpdateId ){
              let updateForm = this._getEditForm( todo );
              return (
                <div key={key} style={{marginTop:'10px', padding:'10px', background:`${bgColor}`}}> 
                  {updateForm}
                </div>
              )
            }else{              
              return (
                <div key={key} style={{marginTop:'10px', padding:'10px', background:`${bgColor}`}}>              
                  <span>{td} {todo.title}</span>  
                  <button onClick={() => {this._deleteTodo(todo._id)}} style={{float:'right',marginLeft:'10px'}}>Delete</button>
                  <button onClick={() => {this._setEditTodo(todo)}} style={{float:'right',marginLeft:'10px'}}>Edit</button>
                </div>
              )
            }            
        })}
        </div>
      </div>
    );
  }
}