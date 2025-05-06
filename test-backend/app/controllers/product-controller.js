const db = require("../models");
const products = db.products;
const categories = db.categories;

const getProducts = async (req, res) => {
    // console.log(req.body);
    let { searchValue, orderType, filters = {}, currentPage = 1, itemsPerPage = 10 } = req.body;
  
    const allProducts = await products.find();
    let filteredProducts = [...allProducts];
  
    // filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter((product) => product.Kategori === filters.category);
    }
    if (filters.brand) {
      filteredProducts = filteredProducts.filter((product) => normalizeString(product.UreticiFirmaAdi).includes(normalizeString(filters.brand)));
    }
  
    // search
    if (searchValue) {
      filteredProducts = filteredProducts.filter((product) =>
        product.UrunAdi.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  
    // order
    if (orderType === 1) {
      filteredProducts.sort((a, b) => a.UrunAdi.localeCompare(b.UrunAdi));
    } else if (orderType === 2) {
      filteredProducts.sort((a, b) => a.Tutar - b.Tutar);
    } else if (orderType === 3) {
      filteredProducts.sort((a, b) => b.Tutar - a.Tutar);
    }
  
    // paging
    const totalItems = filteredProducts.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pagedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  
    res.json({
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage,
      itemsPerPage,
      data: pagedProducts,
    });
};

const getCategories = async (req, res) => {
    console.log('test')
  const allCategories = await categories.find();
  res.json(allCategories);
};


module.exports = {
    getProducts,
    getCategories,
};