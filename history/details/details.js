import {config} from "../../config.js";

const  xhr = new XMLHttpRequest();
let isActive = false;
let isLoggedin = false;

$( document ).ready(function() {
    validateToken({"token":localStorage.getItem('token')});
   findHistoryDetail(config.getUrlVars()['history_id'])
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


 let findHistoryDetail = (id) => {
    xhr.open("GET", config.api+'/history/id/'+id, true);
    xhr.setRequestHeader('token', localStorage.getItem('token'));
    xhr.send()
    xhr.onload = function() {
    let data = JSON.parse(this.response)
    $('#detail-h1').html(`${data.student_a_name} vs ${data.student_b_name}`);
    $('#a-h4').html(data.student_a_name);
    $('#b-h4').html(data.student_b_name);
    $('#compare-result').html(`<span style="color: blueviolet; font-weight: bold; font-size: 20px;">${data.similarities}</span>`)
    isActive= false;
    
    }
}

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

 let compare = (data) => {
    xhr.open("POST", config.api+'/compare', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    let onload =false;
    xhr.onload = function() {
    let data = JSON.parse(this.response);
    let result = '<span style="color: blueviolet; font-weight: bold; font-size: 20px;">'+data.similarities+'</span>';
    $('#result').html(result);
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





