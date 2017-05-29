import Relay from 'react-relay';

export default class DeleteTodo extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{deleteTodo}`;
  }

  getVariables() {
    return {
      id: this.props.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteTodoPayload {
        todoList
      }
    `;
  }

  getConfigs() {
    return [];
  }
}
