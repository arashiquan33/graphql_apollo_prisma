var {gql } = require('apollo-server');
 


 const typeDefs=` 

type Query { 
    humans:[Human]!
    human(id:ID!): Human 
    getMessage(id:ID):Message 
    getMessages:[Message!]
   }

type Mutation{
    setMessage(messageInput:MessageInput!):Message
    updateMessage(id:ID!,messageInput:MessageInput):Message
}

type Human{
  id:String!
  name:String!
  age:Int
  childrens:[Human]
 }            

 type Message{
     id:ID!
     content:String
     author:String
 }
 
 input MessageInput{
     content:String
     author:String!
 }


`;

 const list =[
    {id:'11',name:'quantianchao',age:44,
                                 childrens:[{
                                      id:'11-11',
                                      name:'quantianchao-children-11',
                                      age:12
                                 }]},
    {id:'22',name:'shanghao',age:30}
]

const messages=[
     {
         id:"m-1",
         author:'qtc',
         content:'weqeqeqweqe'
     }
]

 var reslover ={ 
     
    human:(args, context)=>{
         return  list.find(item=>item.id === args.id)
     },
    humans:(args, context)=>{
         return  list
     },
     getMessage:(args,context)=>{
        return  messages.find(item=>item.id === args.id)
     },
     getMessages:()=>{
         return messages
     },
     setMessage:(args,context)=>{
         let id=new Date().getTime();
         let newMes={id,...args.messageInput};
         messages.push(newMes);
         return newMes;    
     },
     updateMessage:(args,context)=>{
        let m =messages.find(item=>item.id === args.id);
        m.author=args.messageInput.author;
        m.content=args.messageInput.content;
        return m;
     }
};

 var source =`{
    humans{
         id
         name
         childrens{
              id
              name
              age
         }
    }
    human(id:"11"){
         id
         name
         childrens{
             id
             name
             age
         }
    } 
}`;

const gqlTypeDefs = gql`${typeDefs}`


module.exports={
    typeDefs,
    source,
    reslover,
    list,
    gqlTypeDefs
}