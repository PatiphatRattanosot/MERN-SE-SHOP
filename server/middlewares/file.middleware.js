const multer = require("multer");
const path = require("path");

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const firebaseConfig = require("../configs/firebase.config");
// console.log(firebaseConfig);

//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);
// console.log("App : ", app);
// console.log("Firebase : ", firebaseStorage);

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cd) => {
//     cd(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

//init upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 1000000 }, //1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|git|webp/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);

  if (mimetype && extName) {
    return cb(null, true);
  } else {
    cb("Error: Image Only!");
  }
}
///upload to firebase
async function uploadToFirebase(req, res, next) {
  if (!req.file) return next();

  try {
    const storageRef = ref(
      firebaseStorage,
      `SE-Shop/Ooy/${req?.file?.originalname}`
    );
  } catch (error) {
    console.log(error);
  }
  const storageRef = ref(
    firebaseStorage,
    `SE-Shop/Ooy/${req?.file?.originalname}`
  );
  const metadata = {
    contentType: req?.file?.mimetype,
  };
  try {
    //uploading...
    const snapshot = await uploadBytesResumable(
      storageRef,
      req?.file?.buffer,
      metadata
    );
    //get url from firebase
    req.file.firebaseURL = await getDownloadURL(snapshot.ref);
    next();
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something wen wrong while uploading to firebase",
    });
  }
}
module.exports = { upload, uploadToFirebase };
