import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)})`,
    );
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Uniquement des images !");
  }
}

const upload = multer({
  storage: storage,
});

router.post("/", upload.single("image"), (req, res) => {
  if (req.file) {
    res.send(req.file.path);
  } else {
    res.status(400).json({
      success: false,
      message: "Aucun fichier n'a été téléchargé",
    });
  }
});

export default router;
