import Relay from 'react-relay';
import TodoComponent from './TodoComponent';

export default Relay.createContainer(TodoComponent, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        todoList{
          _id
          title
          completed
        }
      }`
  }
});
