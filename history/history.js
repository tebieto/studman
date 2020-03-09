import {config} from "../config.js";

const  xhr = new XMLHttpRequest();
let isActive = false;
let isLoggedin = false;

$( document ).ready(function() {
    validateToken({"token":localStorage.getItem('token')});
    findHistory()
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


 let findHistory = () => {
    xhr.open("GET", config.api+'/auth/history', true);
    xhr.setRequestHeader('token', localStorage.getItem('token'));
    xhr.send()
    xhr.onload = function() {
    let data = JSON.parse(this.response)
    let result = '<h1 class="widget_title" style="margin-bottom: 50px;">Comparison History</h1>';
    data.history.forEach(i=> {
        result+=`<div class="media post_item"><div class="media-body"><a href="details/?history_id=${i.id}"><h5>${i.student_a_name} vs ${i.student_b_name}</h5></a><p>${i.date}</p></div></div>`
    });
    $('#history-container').html(result);
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





