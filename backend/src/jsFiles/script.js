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
async function api(dataToSend,route){
    try{
        let response=await fetch(`http://localhost:3000/${route}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        let data=await response.json();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
    }
}

function getOtp(data){
    if(data.success==true){
        alert(`OTP has sent to your mail id`);
        let otpBtn=document.getElementById("getOtp");
        otpBtn.style.fontSize='10px';
        otpBtn.style.backgroundColor='grey';
        otpBtn.onclick=false;
        let time=6;
        let countDown=setInterval(()=>{
            otpBtn.innerText=`Resend OTP\n ${time--}s`;
            if(time==0){
                otpBtn.style.fontSize='16px';
                otpBtn.style.backgroundColor='#1f8fff';
                otpBtn.innerText='Resend OTP';
                otpBtn.onclick=true;
                clearInterval(countDown);
                return;
            }
        },1000);
    }else(
        alert('Check email id is correct or not')
    )
}

function verify(data){
    if(data.success){
        let verifyBtn=document.getElementById('otpVerify');
        verifyBtn.innerText='Verified';
        verifyBtn.style.backgroundColor='green';
    }
}

async function clicked(id,callback){
    let element=document.getElementById(id);
    console.log(element);
    if(element.value){
        const dataToSend={value:element.value};
        let data=await api(dataToSend,id);
        callback(data);
    }else{
        alert(`Enter ${id}`);
    }
};

