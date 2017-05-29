import { GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as todoCtrl from '../controllers/Todo';
import TodoType from '../types/Todo';

export default mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    title: {
      type: GraphQLString
    },
    completed: {
      type: GraphQLBoolean
    }
  },
  outputFields: {
    todoList: {
      type: new GraphQLList(TodoType),
      resolve: savedDoc => savedDoc
    }
  },
  mutateAndGetPayload: async (inputFields) => {
    const aa = await todoCtrl.addTodo(inputFields)
    let todosList = await todoCtrl.getTodoList();
    return todosList;
  }
});
