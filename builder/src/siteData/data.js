const general = require('./general/index.js');
const theme = require('./theme/index.js');
const languages = require('./languages/index.js');
const pages = require('./pages/index.js');
const scripts = require('./scripts/index.js');
const contents = require('./contents/index.js');

const siteData = {
  "general": general,
  "theme": theme,
  "languages": languages,
  "pages": pages,
  "contents": contents,
  "scripts": scripts,
  "users": {
    "active": true,
    "cookieSession": true,
    "cookieSessionControlUrl": "http://localhost:3000/api/user/auth-control",
    "defaultUsers": [],
    "login": {
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
    },
    "logout": {
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
    },
    "register": {
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
    },
  }
};

module.exports = siteData;