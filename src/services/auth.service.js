import axios from 'axios';
import config from "../config/api.config";
const new_guest = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key="+config.api_key;

class AuthService{
    create_guest_account(){
        return axios.post(new_guest,{})
        .then(response =>{
            console.log(response);
            if(response.data.guest_session_id){
                localStorage.setItem("client", JSON.stringify(response.data))
            }
            return response.data;
        });
    }
    signout() {
        localStorage.removeItem("client");
    }
    fetchCurrentUser() {
        return JSON.parse(localStorage.getItem('client'));;
    }
}

export default new AuthService();