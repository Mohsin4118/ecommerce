// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//      products: [{
//         type: mongoose.ObjectID,
//         ref: "Products"
//      }],
//      payments: {},
//      buyer: {
//         type: mongoose.ObjectID,
//         ref: "Users"
//      },
//      status: {
//         type: String,
//         default: "Not Process",
//         enum: ["Not Process", "Processing", "Shipping", "delivered", "cancel"]
//      }
// },{timestamps: true})

// export default mongoose.model("Orders", orderSchema)


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      // default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);