const {RESTDataSource } = require('apollo-datasource-rest');

const http = require('http');

const ebrDevEndPoint = 'http://ebr.hollicube.com';


class WorkStationAPI extends RESTDataSource {
      constructor(){
          super();
          this.baseURL = ebrDevEndPoint
      }
      async getAllWorkStations(){
         try {
            const response = await this.get('/api/pass/workStations');   
            const data = response.data;
            return Array.isArray(data)? data:[]
         } catch (error) {
             throw error;
         }
      }

      async getWorkStationByCode(code){
        try {
            const response = await this.get('/api/pass/workStations');   
            const data = response.data;
            return Array.isArray(data)? data.find(item=>item.code ==code ):{}
         } catch (error) {
             throw error;
         }
      }
}


class UserAPI {

      constructor(){

          this.users =[
            {
                id:"1",
                email:"304033826@qq.com",
                name:"quantianchao"
            }
        ]
      }

     

      async findUser(email){
            let result = this.users.find(user=> user.email === email);
            if(result){
                return result 
            }
      }

      async loginEBR(username,password,workStation){
  
         return new Promise((resolve,reject)=>{

                let resData='';                    
                const writableStream=http.request({
                    host:'ebr.hollicube.com',
                    protocol:'http:',
                    path:'/api/login',
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",
                        "x-requresed-with":"XMLHttpRequrest"
                    }
                },(res)=>{
                    res.setEncoding('utf8');
                    res.on('data',(chunk)=>{
                        resData += chunk;
                    })
                    res.on('end',()=>{
                        let toObj = JSON.parse(resData).data;
                        resolve(toObj);
                    })
                })
                let requestParam ={username,password,workStation};
                requestParam = JSON.stringify(requestParam);  
                writableStream.write(requestParam);
                writableStream.end();
         })

      }
}

class LibAPI {
      constructor(){
          this.libs = [
              {
                  name:'xi-an-lib',
                  books:[
                      {
                          name:'book-1',
                          author:{
                              name:'qtc',
                              age:32
                          }
                      }
                  ]
              }
          ]
      }

      getLibs(){
          return this.libs
      }
}

module.exports={
    WorkStationAPI,
    UserAPI,
    LibAPI
}