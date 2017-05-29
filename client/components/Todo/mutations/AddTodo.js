import Relay from 'react-relay';

export default class AddTodo extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{addTodo}`;
  }

  getVariables() {
    return {
      title: this.props.title,
      completed: this.props.completed
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload {
        todoList
      }
    `;
  }

  getConfigs() {
    return [];
  }
}
