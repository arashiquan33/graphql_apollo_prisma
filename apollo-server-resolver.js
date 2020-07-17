

module.exports = {

    Query:{

        workStations(parent,args,context,info){
            let dataSources = context.dataSources;
            return dataSources.workStationAPI.getAllWorkStations()
        },

        workStation(parent,args,context,info){
            let code = args.code;
            let dataSources = context.dataSources;
            return dataSources.workStationAPI.getWorkStationByCode(code)
        },

        loginEBR(parent,args,context,info){
            let dataSources = context.dataSources;
            return dataSources.userAPI.loginEBR(args.username,args.password,args.workStation)
        },

        libs(parent,args,context,info){
            let dataSources = context.dataSources;
            return dataSources.libAPI.getLibs();
          
        }

    },

    //lib schema resolve chain

    Lib:{
          
          books(parent,args,context,inf){
            let books = parent.books;
            let newBooks = books.concat(books);
            //copy books and return 
            return newBooks
          }  
    },

    Mutation:{
         async login(parent,{email},context,info){
              const user = await context.dataSources.userAPI.findOrCreateUser(email);
              if(user) return Buffer.from(email).toString('base64');
         }
    }

}