const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();
// const authMiddleware = require('../middlewares/auth-middleware');
// const userRoutes = require("./user-routes");
const productRoutes = require("./product-routes");

const methodHandler = {
    get: router.get.bind(router),
    post: router.post.bind(router),
    file: (path, middleware, func) => router.post(path, middleware, upload.array('files', 10), func),
    put: router.put.bind(router),
    delete: router.delete.bind(router)
};

const chooseMethod = (method, path, func, middleware = null) => {
    const handler = methodHandler[method];
    if (handler) {
        if (middleware) {
            handler(path, middleware, func);
        } else {
            handler(path, func);
        }
    } else {
        console.error(`Unknown method: ${method}`);
    }
};

const addRoutes = (routes, basePath = '', middleware = null) => {
    routes.forEach(({ method, path, func }) => {
        chooseMethod(method, `${basePath}/${path}`, func, middleware);
    });
};

addRoutes(productRoutes, '');
// addRoutes(userRoutes, '/user');

module.exports = router;