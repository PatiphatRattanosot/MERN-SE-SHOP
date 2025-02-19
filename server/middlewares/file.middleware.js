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

//init firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

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

  const storageRef = ref(firebaseStorage, `upload/${req?.file?.originalname}`);

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
