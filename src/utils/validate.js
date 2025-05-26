export const checkValidData = (email, password) => {
    // const isnamevalid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    // if(!isnamevalid) return "Name is not valid";
    if(!isEmailValid) return "Email ID not valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;
}