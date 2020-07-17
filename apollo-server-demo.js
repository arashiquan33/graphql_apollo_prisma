var {ApolloServer ,gql } = require('apollo-server');
var {schema,typeDefs} = require('./apollo-server-schema')
var {WorkStationAPI,UserAPI,LibAPI} = require('./apollo-server-datasource')
var resolvers = require("./apollo-server-resolver");

//cache datasources
var storeDataSources = {
    workStationAPI:new WorkStationAPI(),
    userAPI:new UserAPI(),
    libAPI:new LibAPI()
}
var apolloServer = new ApolloServer({
    typeDefs:schema,
    resolvers,
    dataSources:function(){
        return storeDataSources
    },
    context:async function({req,res}){
         const auth = req.headers && req.headers.auth || '';
         const email = Buffer.from(auth,'base64').toString('utf-8');
         const user = await storeDataSources.userAPI.findUser(email);
      //   if(!user) throw new Error('please login in');
         return {
             user:{
                 ...user
             }
         }
    }
})

apolloServer.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
