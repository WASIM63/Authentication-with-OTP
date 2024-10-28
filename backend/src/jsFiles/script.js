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

function countDown(data){
    if(data.success==true){
        
        verifyBtn.innerText='Verify';
        verifyBtn.style.backgroundColor='#1f8fff';

        alert(`OTP has sent to your mail id`);
        let otpBtn=document.getElementById("getOtp");
        otpBtn.style.fontSize='10px';
        otpBtn.style.backgroundColor='grey';
        otpBtn.onclick=false;
        let time=60;
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
    }else(
        alert('Check email id is correct or not')
    )
}

function verified(data){
    if(data.success){
        verifyBtn.innerText='Verified';
        verifyBtn.style.backgroundColor='green';
    }
    else{
        verifyBtn.innerText='Verify';
        verifyBtn.style.backgroundColor='#1f8fff';
        alert('Not varified');
    }
}

