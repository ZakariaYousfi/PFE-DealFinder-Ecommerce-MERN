// functions that return error messages to directly use in the front-end

// dealing with signUp errors
signUpErrors = ({ err }) => {
    let errors = { username: '', email: '', password: '' };

    if (err.message.includes('username'))
        errors.username = "Username Incorrect or Not Available";

    if (err.message.includes('email'))
        errors.email = "Email Incorrect or Not Available";

    if (err.message.includes('password'))
        errors.password = "Password Incorrect: 8 characters minimum";

    return errors;
}
// dealing with signIn errors
signInErrors = ({ err }) => {
    let errors = { email: '', password: '' };

    if (err.message.includes('Email'))
        errors.email = "Email Unknown";

    if (err.message.includes('Password'))
        errors.password = "Incorrect Password";

    return errors;
}
// dealing with Image upload errors
uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' };

    if (err.message.includes('Invalid File !'))
        errors.format = "Incompatible format, please select a .jpg or .png file";

    if (err.message.includes('max Size'))
        errors.maxSize = "Max size is 500 kb";

    return errors;
}