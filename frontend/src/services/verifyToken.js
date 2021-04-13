
export default function verifyToken(){
    if(localStorage.getItem('token') !=null){
        return true;
    }
    return false;
}