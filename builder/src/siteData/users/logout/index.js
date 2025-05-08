const logout = {
    "url": "http://localhost:3000/api/user/logout",
    "method": "POST",
    "beforeLogout": () => {
        console.log('before logout');
        return true
    },
    "afterLogout": () => {
        console.log('after logout');
    },
    "afterLogoutPage": "introduction",
};

module.exports = logout;