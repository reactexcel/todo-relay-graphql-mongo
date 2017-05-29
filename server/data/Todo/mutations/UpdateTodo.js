import { GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as todoCtrl from '../controllers/Todo';
import TodoType from '../types/Todo';

export default mutationWithClientMutationId({
  name: 'UpdateTodo',
  inputFields: {
    updatetype: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
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
    let fieldsToUpdate = {

    }
    if( inputFields.updatetype === 'title' ){
      fieldsToUpdate = {
        title :  inputFields.title
      }
    }else if( inputFields.updatetype === 'status' ){
      fieldsToUpdate = {
        completed :  inputFields.completed
      }
    }
    const aa = await todoCtrl.updateTodo(inputFields.id, fieldsToUpdate)
    let todosList = await todoCtrl.getTodoList();
    return todosList;
  }
});
