module.exports = mongoose => {
    const Product = mongoose.model(
      "products",
      mongoose.Schema(
        {
            ID: Number,
            UrunKodu: String,
            UrunAdi: String,
            KDVOrani: Number,
            IndirimliTutar: Number,
            Tutar: Number,
            Envanter: Number,
            UreticiFirmaAdi: String,
            n11: Number,
            ggidiyor: Number,
            getir: Number,
            trendyol_marketplace: Number,
            pazarama_marketplace: Number,
            hepsiburada: Number,
            trendyol: Number,
            amazon: Number,
            eptt: Number,
            GuncellemeTarihi: String,
            UrunAciklamasi: String,
            Resimler: Array,
            Barkodlar: Array,
            Gruplar: Array,
            Kategori: String,
            EticaretteGoruntulensin: Boolean
        },
        { timestamps: true }
      )
    );
    return Product;
}