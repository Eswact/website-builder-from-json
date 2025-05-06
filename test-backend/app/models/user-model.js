module.exports = mongoose => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
          username: String,
          password: String,
          // role: Number,
          mail: String,
          mailConfirmed: Boolean,
      },
      { timestamps: true }
    )
  );
  return User;
}