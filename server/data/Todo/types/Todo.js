import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        title: {
            type: GraphQLString,
        },
        completed: {
            type: GraphQLBoolean
        }
    })
})