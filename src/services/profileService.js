import axios from 'axios'


const apiCall = axios.create({
   withCredentials:false,
   headers:{
     Accept: 'application/json',
     'Content-Type' : 'application/json'
   } 
});

export default{
    getProfiles(){
        return apiCall.get('https://randomuser.me/api/?results=50')
    },
    getProfile20(){
        return apiCall.get('https://randomuser.me/api/?results=20')
    }
}