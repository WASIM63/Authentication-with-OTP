// script.js functions which are not imporint rightly because of the route path

function myFunction(pass,eye) {
    var x = document.getElementById(pass);
    var y=document.getElementById(eye);
    if (x.type === "password") {
        x.type = "text";
        y.classList.replace("fa-eye-slash","fa-eye");
    } else {
        x.type = "password";
        y.classList.replace("fa-eye", "fa-eye-slash");
    }
};

let verifyBtn=document.getElementById('otpVerify');

function countDown(){
    verifyBtn.innerText='Verify';
    verifyBtn.style.backgroundColor='#1f8fff';
    verifyBtn.setAttribute('onclick','verifyOtp()');
    
    let otpBtn=document.getElementById("getOtp");
    otpBtn.style.fontSize='10px';
    otpBtn.style.backgroundColor='grey';
    let time=6;
    otpBtn.onclick=false;
    let countDown=setInterval(()=>{
        otpBtn.innerText=`Resend OTP\n ${time--}s`;
        if(time==0){
            otpBtn.style.fontSize='16px';
            otpBtn.style.backgroundColor='#1f8fff';
            otpBtn.innerText='Resend OTP';
            otpBtn.setAttribute('onclick','getOtp()');
            clearInterval(countDown);
            return;
        }
    },1000);
}

function verified(data){
    if(data.success){
        verifyBtn.innerText='Verified';
        verifyBtn.style.backgroundColor='green';
        verifyBtn.onclick=false;
    }
    else{
        verifyBtn.innerText='Verify';
        verifyBtn.style.backgroundColor='red';
        alert('Not varified');
    }
}



// forgot password functions
const elements={
    email:document.getElementById('email'),
    otp:document.getElementById('otp'),
    newPassword:document.getElementById('newPassword'),
    confirmNewPassword:document.getElementById('confirmNewPassword')
}

function isValidPassword(password, conPass) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passwordPattern.test(password)){
        if(password!=conPass){
            alert('Confirm password not matched');
            return false;
        }
    }else{
        alert('Password should be 8 characterd along with\n minimum 1 uppercase,lowercase,spaciel character,number');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

async function getOtp(){
    if(isValidEmail(elements.email.value)){
        let data={email:elements.email.value};

        const response=await fetch('/findUser',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        });
        const result=await response.json();
        if(result.success){
            alert(`OTP is sent to ${data.email}`);
            countDown();
        }else{
            alert('User not found');
        }
    }else{
        alert('Enter a valid email id');
    }
};

async function api(data,route){
    const response=await fetch(`/${route}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
    let result=await response.json();
    return result;
}

async function verifyOtp(){
    if(elements.otp.value>=100000 && elements.otp.value<=999999){
        let data={otp:elements.otp.value};
        let result=await api(data,'varifyOtp');
        verified(result);
    }else{
        alert('Enter 6 digit OTP');
    }
};

function reset(){
    for(let elem in elements){
        elements[elem].style.borderColor='gray';
        elements[elem].style.color='black';
        elements[elem].classList.remove('placeholder-red');
    }
}

function validation(){
    let filled=true;
    for(let elem in elements){
        if(elements[elem].value==''){
            elements[elem].style.borderColor='red';
            elements[elem].style.color='red';
            elements[elem].classList.add('placeholder-red');
            filled=false;
        }
    }
    return (filled && isValidPassword(elements.newPassword.value,elements.confirmNewPassword.value));
}

async function submit(){
    if(validation()){
        data={
            email:elements.email.value,
            otp:elements.otp.value,
            time:new Date(),
            password:elements.newPassword.value,
            confirmPassword:elements.confirmNewPassword.value
        };

        const response=await fetch(`/forgotPassword`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        });
        let result=await response.json();
        if(result.success){
            alert('Password updated successfully\nNow Log in');
        }else{
            alert('Invalid OTP');
        }
    }
};


