import {config} from "./config.js";

const  xhr = new XMLHttpRequest();
let isActive = false;


/* Begin export functions */

export const compare = (data) => {
    let isActive = true;
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

export const validateToken = (data, redirect) => {
    isActive = true
    xhr.open("POST", config.api+'/verify/token', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    let onload =false;
    xhr.onload = function() {
    var data = JSON.parse(this.response);
    completeVerification(data, redirect);
    isActive= false;
    }
}

export const login = (data) => {
    isActive = true;
    xhr.open("POST", config.api+'/staff/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    let onload =false;
    xhr.onload = function() {
    var data = JSON.parse(this.response);
    completeLogin(data);
    isActive= false;
    $('#login-btn').html("Login")
    
    }
}

export const remoteLogout = (data) => {
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


export const findHistory = () => {
    xhr.open("GET", config.api+'/auth/history', true);
    xhr.setRequestHeader('token', localStorage.getItem('token'));
    xhr.send();
    xhr.onload = function() {
    let data = JSON.parse(this.response);
    let result = '<h1 class="widget_title" style="margin-bottom: 50px;">Comparison History</h1>';
    data.history.forEach(i=> {
        result+=`<div class="media post_item"><div class="media-body"><a href="details/?history_id=${i.id}"><h5>${i.student_a_name} vs ${i.student_b_name}</h5></a><p>${i.date}</p></div></div>`;
    });
    $('#history').html(result);
    isActive= false;
    $('#compare-btn').html("Compare");
    
    }
}


export const findHistoryDetail = (id) => {
    xhr.open("GET", config.api+'/history/id/'+id, true);
    xhr.setRequestHeader('token', localStorage.getItem('token'));
    xhr.send();
    xhr.onload = function() {
    let data = JSON.parse(this.response);
    $('#detail-h1').html(`${data.student_a_name} vs ${data.student_b_name}`);
    $('#a-h4').html(data.student_a_name);
    $('#b-h4').html(data.student_b_name);
    $('#compare-result').html(`<span style="color: blueviolet; font-weight: bold; font-size: 20px;">${data.similarities}</span>`);
    }
}

/* End export functions */


/* Begin Support Functions */

const completeVerification = (data, redirect) => {
    if(data['status'] != 'verified') {
        alert('Invalid Session, Login again');
        window.location=redirect;
        isLoggedin = true;
    }
}

const completeLogin = (data) => {
    if(!data['token']) {
        return alert("Invalid Login Credentials");
    }
    //Save token
    localStorage.setItem('token', JSON.stringify(data['token']));

    setTimeout (() => {
        // Redirect to Homepage
        window.location= "home";
    }, 1000);
}


/* End support finctions */