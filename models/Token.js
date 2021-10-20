const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    token: {
      type: String,
    },
  },

  {
    collection: "mt-tokens",
    timestamps: true,
  }
);

// tương tự primarykey
TokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: +process.env.TOKEN_EXPIRED }
);

module.exports = mongoose.model("Token", TokenSchema);
