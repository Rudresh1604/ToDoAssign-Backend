const mongoose = require("mongoose");

const dbConnect = async () =>
  await mongoose
    .connect(process.env.MONGO_URL)
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log("DB Connected");
    });

dbConnect();
