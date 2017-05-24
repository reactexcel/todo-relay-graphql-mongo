import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString,
            resolve: ( todo ) => {
                return todo.get('title')
            }
        },
        completed: {
            type: GraphQLBoolean,
            resolve: ( todo ) => {
                return todo.get('completed')
            }
        }
    })
})