var{ graphql, buildSchema }=require('graphql');
var util=require('util');
var logger = function(content){
     console.log(util.inspect(content,{depth:10}))
}
//demo
var {typeDefs,list,reslover,source}=require('./first-demo');
var schema =buildSchema(typeDefs);


//graphql(schema,source, reslover).then((response)=>{ logger(response)});

var express =require('express');
var graphqlHTTP =require('express-graphql');
var app =express();
app.use('/graphql',
            graphqlHTTP({ 
                 schema: schema, 
                 rootValue: reslover, graphiql:true,})); 

app.listen(4000,function(){
     console.log('Running a GraphQL API server at http://localhost:4000/graphql')
}); 