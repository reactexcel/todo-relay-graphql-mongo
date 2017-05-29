import Relay from 'react-relay';

export default class UpdateTodo extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updateTodo}`;
  }

  getVariables() {
    return {
      updatetype: this.props.updatetype,
      id: this.props.id,
      title: this.props.title,
      completed: this.props.completed
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTodoPayload {
        todoList
      }
    `;
  }

  getConfigs() {
    return [];
  }
}
