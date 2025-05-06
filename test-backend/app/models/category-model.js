module.exports = mongoose => {
    const Category = mongoose.model(
      "categories",
      mongoose.Schema(
        {
            name: String,
            id: String,
        },
        { timestamps: true }
      )
    );
    return Category;
}