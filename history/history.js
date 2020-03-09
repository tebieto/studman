import {config} from "../config.js";
import {validateToken, findHistory, remoteLogout} from "../server.js";

$( document ).ready(function() {
    validateToken({"token":localStorage.getItem('token')}, "../");
    findHistory();
});


window.logUserOut = () => {
    remoteLogout({"token":localStorage.getItem('token')});
    setTimeout(()=> {
     localStorage.removeItem('token');
     config.logout();
    }, 1000);
 }





