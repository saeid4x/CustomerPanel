export default {
    backendUrl:'https://project-customer.herokuapp.com/',
    pattern:{
        email:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        mobile:/^09\d{9}$/,
        verifyCode:/^\d{5}$/,
        
        
    },
    minPasswordLength:5,
    frontendUrl:'http://127.0.0.1:3000',


    
}

 