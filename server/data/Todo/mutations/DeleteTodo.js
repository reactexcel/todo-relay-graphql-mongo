import { GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as todoCtrl from '../controllers/Todo';
import TodoType from '../types/Todo';

export default mutationWithClientMutationId({
  name: 'DeleteTodo',
  inputFields: {
    id: {
      type: GraphQLString
    }
  },
  outputFields: {
    todoList: {
      type: new GraphQLList(TodoType),
      resolve: savedDoc => savedDoc
    }
  },
  mutateAndGetPayload: async (inputFields) => {
    const aa = await todoCtrl.deleteTodo(inputFields)
    let todosList = await todoCtrl.getTodoList();
    return todosList;
  }
});
