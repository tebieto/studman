import {config} from "./config.js";
import {login} from "./server.js";

window.initLogin = () => {
    $('#login-btn').html('<i class="fa fa-spinner fa-spin"></i>');     
    let form = document.login;
    let data= {email: form.email.value, password: form.password.value};
    login(data);
}




