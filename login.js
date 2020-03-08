 import {config} from "./config.js";

const  xhr = new XMLHttpRequest();
let isActive = false;

window.initLogin = () => {
    isActive = true;
    $('#login-btn').html('<i class="fa fa-spinner fa-spin"></i>');     
    let form = document.login;
    let data= {email: form.email.value, password: form.password.value};
    login(data)
}

 let login = (data) => {
    xhr.open("POST", config.api+'/staff/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(data);
    let onload =false
    xhr.onload = function() {
    var data = JSON.parse(this.response);
    completeLogin(data) //
    isActive= false
    $('#login-btn').html("Login")
    
    }
}

let completeLogin = (data) => {
    if(!data['token']) {
        return alert("Invalid Login Credentials")
    }
    //Save token
    localStorage.setItem('token', JSON.stringify(data['token']))

    setTimeout (() => {
        // Redirect to Homepage
        window.location= "home"
    }, 1000)
}





