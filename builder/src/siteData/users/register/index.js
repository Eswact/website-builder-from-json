const register = {
    "url": "http://localhost:3000/api/user/register",
    "method": "POST",
    "data": [
        {
            "visible": false,
            "name": "role",
            "value": 1,
        },
        {
            "visible": true,
            "required": true,
            "name": "mail",
            "title": "Email",
            "id": "userRegisterMail",
            "type": "email",
            "placeholder": "example@mail.com",
            "value": "",
            "default": "",
        },
        {
            "visible": true,
            "required": true,
            "name": "username",
            "title": "Username",
            "id": "userRegisterUsername",
            "type": "string",
            "placeholder": "",
            "errorChecks": [
            {
                control: "return value != null && value != '' && value.length > 7;",
                errMessage: "Plate must be longer than 7 characters."
            },
            ],
            "keydown": {
                "maxLength": 14,
            },
            "value": "",
            "default": "",
        },
        {
            "visible": true,
            "required": true,
            "name": "password",
            "title": "Password",
            "id": "userRegisterPassword",
            "type": "password",
            "placeholder": "············",
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
    "beforeRegister": () => {
        console.log('before register');
        return true
    },
    "afterRegister": () => {
        console.log('after register');
    },
};

module.exports = register;