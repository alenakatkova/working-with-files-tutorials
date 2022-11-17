const express = require("express");
const multer = require("multer");
const app = express();

const dest = `${__dirname}/uploads/`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const maxSize = 10000 * 1000;
const path = require("path");

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(
        file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the "
        + "following filetypes - " + filetypes);
  }
})

const port = process.env.PORT || 8080;
const userRouter = require("./routes/user");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

const maxReqBodySize = "50mb";
// parse requests of content-type - application/json
app.use(express.json({ limit: maxReqBodySize }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  limit: maxReqBodySize,
  extended: true,
  parameterLimit:50000
}));

app.get("/api", (req, res) => {
  res.send("<h2>Hello there</h2>");
});

app.use("/api/users", userRouter);

// Image upload
app.post(
    "/api/upload",
    upload.single("image"),
    function (req, res) {
      console.log(req.body);
    }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
