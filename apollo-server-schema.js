var {gql} = require('apollo-server');

const {GraphQLScalarType} = require('graphql')

const DateType = new GraphQLScalarType({
    name:'Date',
    description:'define date type',
    parseValue(value){
        return new Date(value);
    },
    serialize(value){
        return value.getTime()
    },
})


const schema = `
 
        scalar Date

        type WorkStation{
            code:String!
            name:String!
            workStations:[WorkStation]
        }

        type LoginInfo{
             expires:Date
             role:String
             status:String
             token:String
        }
        
       
        type Lib{
              name:String!
              books:[Book]!
        }

        type Book{
              author:Author!
              name:String!
        }

        type Author{
               name:String!
               age:Int!
        }

        type Query{
               workStations:[WorkStation]!
               workStation(code:String!):WorkStation!
               loginEBR(username:String!,password:String!,workStation:String!):LoginInfo
               libs:[Lib]!

        }
        type Mutation{
               login(email:String):String
        }


`

const typeDefs = gql `${schema}`;

module.exports = {typeDefs,schema};