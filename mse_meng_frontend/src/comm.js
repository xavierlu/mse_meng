import axios from 'axios';

export default class Comm {

   BASE_URL = "http://127.0.0.1:8000/";

   login(username, password) {
       axios.post(BASE_URL + 'auth/api-token-auth/', {
           username: username,
           password: password
       }).then(/*do stuff */)
   }

   register(username, email, first_name, last_name, bio, picture, is_company, password) {

   }

   logout() {

   }

   fetchAllPosts() {

   }

   fetchPost(id) {

   }

   createPost() {

   }

   deletePost() {

   }


}

