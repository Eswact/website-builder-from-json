const product = require("../controllers/product-controller.js");
const endpoints= [
    { method: "post", path: "products", func: product.getProducts },
    { method: "get", path: "categories", func: product.getCategories },
]

module.exports = endpoints;