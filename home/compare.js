import {config} from "../config.js";

const  xhr = new XMLHttpRequest();
let isActive = false;
let isLoggedin = false;

$( document ).ready(function() {
    validateToken({"token":localStorage.getItem('token')});
});


let validateToken = (data) => {
    isActive = true
    xhr.open("POST", config.api+'/verify/token', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    let onload =false
    xhr.onload = function() {
    var data = JSON.parse(this.response);
    completeVerification(data);
    isActive= false;
    }
}

let completeVerification = (data) => {
    if(data['status'] != 'verified') {
        alert('Invalid Session, Login again');
        window.location="../";
        isLoggedin = true;
    }
}

window.initCompare = () => {
    isActive = true;
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

 let compare = (data) => {
    xhr.open("POST", config.api+'/compare', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    let onload =false;
    xhr.onload = function() {
    let data = JSON.parse(this.response);
    let result = '<span style="color: blueviolet; font-weight: bold; font-size: 20px;">'+data.similarities+'</span>';
    $('#compare-result').html(result);
    config.result();
    isActive= false;
    $('#compare-btn').html("Compare");
    
    }
}


window.logUserOut = () => {
    remoteLogout({"token":localStorage.getItem('token')});
    setTimeout(()=> {
     localStorage.removeItem('token');
     config.logout();
    }, 1000);
 }
 

let remoteLogout = (data) => {
    isActive = true;
    xhr.open("POST", config.api+'/staff/logout', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    xhr.onload = function() {
     var data = JSON.parse(this.response);
     alert(data.msg);
    }
    isActive= false;
}





