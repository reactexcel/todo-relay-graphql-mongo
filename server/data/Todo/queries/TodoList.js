import { GraphQLString, GraphQLList } from 'graphql';
import Todo from '../types/Todo';
import * as todoCtrl from '../controllers/Todo';

export default {
  todoList: {
    type: new GraphQLList(Todo),
    resolve: async() => {
        let todosList = await todoCtrl.getTodoList();
        return todosList;
    }
  }
};