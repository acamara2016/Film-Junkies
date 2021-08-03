export default function headers(){
    const client = JSON.parse(localStorage.getItem('client'));
    if(client.accessToken){
        return { 'x-access-token': client.accessToken };   
    } else {
      return {};
    }
}