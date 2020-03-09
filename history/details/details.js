import {config} from "../../config.js";
import {compare, validateToken, remoteLogout, findHistoryDetail} from "../../server.js";

const  xhr = new XMLHttpRequest();
let isActive = false;
let isLoggedin = false;

$( document ).ready(function() {
    validateToken({"token":localStorage.getItem('token')});
    findHistoryDetail(config.getUrlVars()['history_id']);
});


window.initCompare = () => {
    isActive = true;
    $('#compare-btn').html('<i class="fa fa-spinner fa-spin"></i>');     
    let form = document.compare;
    let data= {
        student_a_name: $('#a-h4').text(), 
        text_file_a: form.text_file_a.value, 
        student_b_name: $('#b-h4').text(), 
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





