const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
});

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    api_keys: [{ type: String }],
    employees: [{ type: String }],
    phone: { type: String },
    address: { type: addressSchema, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
