const login = {
    "url": "http://localhost:3000/api/user/login",
    "method": "POST",
    "data": [
        {
            "visible": true,
            "required": true,
            "name": "mail",
            "title": "Email",
            "id": "userLoginMail",
            "type": "email",
            "placeholder": "example@mail.com",
            "value": "",
            "default": "",
        },
        {
            "visible": true,
            "required": true,
            "name": "password",
            "title": "Password",
            "id": "userLoginPassword",
            "type": "password",
            "placeholder": "**********",
            "errorChecks": [
                {
                    control: "return value != null && value != '' && value.length > 7;",
                    errMessage: "Plate must be longer than 7 characters."
                },
            ],
            "keydown": {
                "maxLength": 14,
                // "bannedKeys": ["68-90", 32]
            },
            "value": "",
            "default": "",
        }
    ],
    "beforeLogin": () => {
        console.log('before login');
        return true
    },
    "afterLogin": () => {
        console.log('after login');
    },
};

module.exports = login;