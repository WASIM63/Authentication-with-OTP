const elements={
    name:document.getElementById('name'),
    dob:document.getElementById('dob'),
    gender:document.getElementById('gender'),
    mobile:document.getElementById('mobile'),
    email:document.getElementById('email'),
    otp:document.getElementById('otp'),
    setPassword:document.getElementById('setPassword'),
    confirmPassword:document.getElementById('confirmPassword')
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

async function api(data,route){
    const response=await fetch(`/${route}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    });
    let result=await response.json();
    return result;
}

async function getOtp(){
    if(isValidEmail(elements.email.value)){
        let data={email:elements.email.value};
        let result=await api(data,'email');
        countDown(result);
    }else{
        alert('Enter a valid email');
    }
};
async function varifyOtp(){
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
    return (filled && isValidPassword(elements.setPassword.value,elements.confirmPassword.value));
}

async function submit(){
    if(validation()){
        data={
            name:elements.name.value,
            dob:elements.dob.value,
            gender:elements.gender.value,
            mobile:elements.mobile.value,
            email:elements.email.value,
            otp:elements.otp.value,
            time:new Date(),
            password:elements.setPassword.value,
            confirmPassword:elements.confirmPassword.value
        };

        const response=await fetch(`/signUp`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        });
        let result=await response.json();
        if(!result.success){
            alert('Already have an account');
        }else{
            alert('Acoount has been created, go and Log IN.');
            location.reload();
        }
    }
};


