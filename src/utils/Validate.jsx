export const checkValidData = (email,password)=> {
    //regex for email and password
    //for name doesnot matter (Elon Musk son's name)
    // const isNameValid= /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmailValid=  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);    
    const isPasswordValid= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    if(!isEmailValid) return "Email-Id is not Valid";
    if(!isPasswordValid) return "Password not valid";
    // if(!isNameValid) return "Name not valid";

    //if ALL IS WELL
    return null;
}