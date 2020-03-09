import {config} from "../config.js";
import {compare, validateToken, remoteLogout} from "../server.js";

$( document ).ready(function() {
    validateToken({"token":localStorage.getItem('token')}, "../");
});

window.initCompare = () => {
    $('#compare-btn').html('<i class="fa fa-spinner fa-spin"></i>');     
    let form = document.compare;
    let data= {
        student_a_name: form.student_a_name.value, 
        text_file_a: form.text_file_a.value, 
        student_b_name: form.student_b_name.value, 
        text_file_b: form.text_file_b.value,
    };

    compare(data);
}


window.logUserOut = () => {
    remoteLogout({"token":localStorage.getItem('token')});
    setTimeout(()=> {
     localStorage.removeItem('token');
     config.logout();
    }, 1000);
 }





