export default {
    backendUrl:'http://127.0.0.1:8000/',
    pattern:{
        email:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        mobile:/^09\d{9}$/,
        verifyCode:/^\d{5}$/,
        
        
    },
    minPasswordLength:5,

    
}

 