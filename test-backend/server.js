const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const products = require("./products.json");
const categories = require("./categories.json");

function normalizeString(str) {
  return str
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

app.use(cors());
app.use(express.json());

app.post("/products", (req, res) => {
  // console.log(req.body);
  let { searchValue, orderType, filters = {}, currentPage = 1, itemsPerPage = 10 } = req.body;

  let filteredProducts = [...products];

  // Filtreleme
  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.Kategori === filters.category);
  }
  if (filters.brand) {
    filteredProducts = filteredProducts.filter((product) => normalizeString(product.UreticiFirmaAdi).includes(normalizeString(filters.brand)));
  }

  // Arama
  if (searchValue) {
    filteredProducts = filteredProducts.filter((product) =>
      product.UrunAdi.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Sıralama
  if (orderType === 1) {
    filteredProducts.sort((a, b) => a.UrunAdi.localeCompare(b.UrunAdi));
  } else if (orderType === 2) {
    filteredProducts.sort((a, b) => a.Tutar - b.Tutar);
  } else if (orderType === 3) {
    filteredProducts.sort((a, b) => b.Tutar - a.Tutar);
  }

  // **Paging İşlemi**
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
});

app.get("/categories", (req, res) => {
  res.json(categories);
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor...`);
});