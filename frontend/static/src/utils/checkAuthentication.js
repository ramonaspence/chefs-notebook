
const checkAuthentication = () => {
    if (localStorage.getItem('current-user')) {
        return true
    }
    else {
        return false
    }
};
export default checkAuthentication;