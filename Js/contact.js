//HTML Elements 
var nameValidation = document.querySelector('.name-validation');
var emailValidation = document.querySelector('.email-validation');
var messageValidation = document.querySelector('.message-validation');
var passwordValidation = document.querySelector('.password-validation');
var input = document.getElementsByTagName('input');
var Name = document.getElementById("name");
var email = document.getElementById("email");
var message = document.getElementById("message");
var password = document.getElementById("password");
var submitButton = document.querySelector('.submit');

// Functions
function emailCheck() {
    var reg = /[a-z]/;
    console.log(reg.test(email.value));
    if (reg.test(email.value[0])) {
        emailValidation.style.display = "none";
        reg = /[a-z]{3,12}[\._]{0,1}\w{3,12}\d{0,7}@((yahoo)|(gmail)|(hotmail)|(outlook)|(aol)|(protonmail)|(zohocorp)|(icloud)|(me)|(mac))\.com/;
        if (reg.test(email.value)) {
            emailValidation.style.display = "none";
            return 1;
        } else {
            emailValidation.style.display = "block";
            emailValidation.innerHTML = "Email should end with @domain.com";
            emailValidation.style.color = "red";
            return 0;
        }
    } else {
        emailValidation.style.display = "block";
        emailValidation.innerHTML = "Email Should Start With a letter";
        emailValidation.style.color = "red";
        return 0;
    }
}
function nameCheck() {
    var reg = /[a-z]/ig;
    if (reg.test(Name.value[0])) {
        nameValidation.style.display = 'none';
        reg = /[a-z]{3}/ig;
        if (reg.test(Name.value)) {
            nameValidation.style.display = 'none';
            reg = /([a-z]{3,12}[-_\.]{0,1}\w{0,8})/ig;
            if (reg.test(Name.value) && Name.value.length <= 20) {
                nameValidation.style.display = 'none';
                return 1;
            } else {
                nameValidation.style.display = 'block';
                nameValidation.innerHTML = "Max length is 20 letters";
                nameValidation.style.color = 'red';
                return 0;
            }
        } else {
            nameValidation.style.display = 'block';
            nameValidation.innerHTML = "Minimum length is 3 letters";
            nameValidation.style.color = 'red';
            return 0;
        }
    } else {
        nameValidation.style.display = 'block';
        nameValidation.innerHTML = "Name should start with a letter";
        nameValidation.style.color = 'red';
        return 0;
    }
}
function messageCheck() {
    var reg = message.value.split(" ");
    if (reg.length <= 20) {
        messageValidation.style.display = 'block';
        messageValidation.innerHTML = "Minimun Message length Should be 20 words.";
        messageValidation.style.color = "red";
        return 0;
    } else {
        if (/\s{20,60}/g.test(message.value)) {
            messageValidation.style.display = 'block';
            messageValidation.innerHTML = "Message Can't Be Empty.";
            messageValidation.style.color = "red";
            return 0;
        } else {
            if (reg.length > 60) {
                messageValidation.style.display = 'block';
                messageValidation.innerHTML = "Max Message length Should be 60 words.";
                messageValidation.style.color = "red";
                return 0;
            }
            else {
                messageValidation.style.display = 'none';
                return 1;
            }
        }

    }
}
function passwordCheck() {
    var reg = /\w{8}/g;
    if (reg.test(password.value)) {
        passwordValidation.style.display = 'none';
        reg = password.value.match(/[A-Z]/g);
        if (reg < 2) {
            passwordValidation.style.display = 'block';
            passwordValidation.innerHTML = "Password Should Contains at least one upper case letter";
            passwordValidation.style.color = 'red';
            return 0;
        } else {
            reg = password.value.match(/[_!@\.\*&%$#]/);
            if (reg < 2) {
                passwordValidation.style.display = 'block';
                passwordValidation.innerHTML = "Password Should Contains at least one Special letter";
                passwordValidation.style.color = 'red';
                return 0;
            } else {
                if (password.value.length > 15) {
                    passwordValidation.style.display = 'block';
                    passwordValidation.innerHTML = "Max Password length is 15 Characters";
                    passwordValidation.style.color = 'red';
                    return 1;
                } else {
                    return 1;
                }
            }
        }
    } else {
        passwordValidation.style.display = 'block';
        passwordValidation.innerHTML = "Min Password length is 8 Characters";
        passwordValidation.style.color = 'red';
        return 0;
    }
}
function submitCheck(e) {
    if (passwordCheck() && nameCheck() && emailCheck() && messageCheck()) {
        submitButton.innerHTML = "SUCESS";
        submitButton.style.backgroundColor = 'green';
        e.preventDefault();
    } else {
        emailCheck();
        nameCheck();
        messageCheck();
        passwordCheck();
        e.preventDefault();
    }
}

//Events
input[0].addEventListener("input", nameCheck);
input[1].addEventListener('input', emailCheck);
message.addEventListener('input', messageCheck);
password.addEventListener('input', passwordCheck);
submitButton.addEventListener('click', function (e) {
    submitCheck(e);
});
