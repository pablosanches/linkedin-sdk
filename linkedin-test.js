const linkedin = require('./lib/linkedin');
const linkedinAPI = new linkedin('78uwt0owcep9xt', 'ICMNOuiB9HOpuZEM', 'http://189.70.16.123/linkedin-webhook/authorization.php');

// let authURI = linkedinAPI.getAuthUrl(['r_liteprofile'], 'Pablo Teste');
// console.log(authURI);

// const code = 'AQSps76lIilbOo36gh35IEoehd5FF-JbWVyHOgPEzcoUev8_nDVNt7XS34pMeBNhuRHfwoADQsh_S59qLrPNLZMMYR2DzhlSo-TzZ-SsNOp0Aed875ueRwmLi9jcS1NbVGjKjM0V6BzVrywk6AakLm_dJZQXe3xHQHde_afRfgoiFZFqakfmaMUS83CFPdJwP1kvVI5oKDVt9K4xiwI';
// linkedinAPI.getAccessToken(code).then(res => {
//     console.log(res.data)
// }).catch (err => {
//     console.error(err.data.error_description);
// });

const token = 'AQV06qa8oCxXsl3v-YMe9qNebJc322iC9jXKqQFeybvbQ3C8X2jCNUbUHdWgBDC3G1UB8OxptSqhKt9Gk1HVROvCrkG5uPHSDKt4cneahWCWhALFg9J1wdLt6cu0XjejbuM3bxWhT8uq5tuYgyVNswF3zFHZ7IVCli1x6cFYt_4eUTz8RVG1vcmZTr776arVW0JGz7pZg6Z0vVbgNOgS2wDb-tuBxRgw7ppgWb00-2wxvasl0tmXJxRb25B-TFz0PO4IEbx69Jg6GleCKlIlS1CZRh0dmwVDtXpaEj_9u9iUhd9myvm0PbUWkR1jxoJpWIh9cjtadp4cGnzfmYqYut75_chv6A';
linkedinAPI.setToken(token);

// linkedinAPI.tokenIntrospection(token).then(res => {
//     console.log(res.data)
// }).catch (err => {
//     console.error(err.data.error_description);
// });

linkedinAPI.getProfile().then(res => {
    console.log(res.data)
}).catch (err => {
    console.error(err);
});