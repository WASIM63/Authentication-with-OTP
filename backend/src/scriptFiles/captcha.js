const captchaText=document.getElementById('captchaText');

const captchaStore={
    captchaID:0,
    captchaValidation:false
};

// get captcha 
async function getCaptcha(){
    captchaText.classList.remove('redBorder','greenBorder');

    const response=await fetch("/captcha");
    const data=await response.json();

    captchaStore.captchaId = data.captchaId;

    const captchaBox=document.getElementById('captchaBox');
    captchaBox.innerHTML=data.captchaImage;
}
getCaptcha();

// verify captcha
async function verifycaptcha(){
  const data={
    captchaId:captchaStore.captchaId,
    captchaText:captchaText.value
  }
  const response=await fetch('/verify-captcha',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
  });
    const result=await response.json();
    if(result.success==false){
        captchaText.classList.remove('greenBorder');
        captchaText.classList.add('redBorder');
    }else{
        captchaText.classList.remove('redBorder');
        captchaText.classList.add('greenBorder');
        captchaStore.captchaValidation=true;
    }
}


// on submit btn click
function sub(){
    const email=document.getElementById('email');
    const password=document.getElementById('setPassword');
    if(email.value && password.value && captchaStore.captchaValidation){
        captchaStore.captchaID=0;
        captchaStore.captchaValidation=false;
        getCaptcha();
        captchaText.value=null;
        document.getElementById('form').submit();
    }else{
        alert('Enter the Email ID and Password and verify captcha');
    }
}