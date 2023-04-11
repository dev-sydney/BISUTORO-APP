const multer = require('multer');
const CustomError = require('./../utils/CustomError');
const Table = require('./../models/tableModel');
const catchAsyncErrors = require('./../utils/catchAsyncErrors');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../client/public/img/tables`);
  },
  filename: (req, file, cb) => {
    //meal-_id-.png;
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new CustomError(
        'Only image uploads allowed, try uploading an image instead',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.multerUpload = upload.single('photo');

exports.createTable = catchAsyncErrors(async (req, res, next) => {
  const { name, price, seating } = req.body;

  const table = await Table.create({
    name,
    price,
    seating,
    photo: req.file.filename,
  });

  res.status(201).json({
    status: 'success',
    successMsg: 'table added successfully :)',
    table,
  });
});

exports.getAllTables = catchAsyncErrors(async (req, res, next) => {
  const tables = await Table.find();
  res.status(200).json({
    status: 'success',
    tables,
  });
});
