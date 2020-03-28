import express from 'express';
import multer from 'multer';
import { getProducts, addProduct, formAddProduct, editProduct, saveEdit, editDetail, deleteProduct, getUser, getUserFix} from '../controllers/products';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      // cau hinh noi luu tru file upload
      cb(null, './public/uploads');
    },
    filename: function(req, file, cb){
      // cau hinh ten file upload
      cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage});
const router = express.Router();


/* GET product page. */
router.get('/', getProducts);
router.get('/user', getUser);
router.get('/', getUserFix);


// Form add sản phẩm
router.get('/add', formAddProduct);

// Save
router.post('/save-add', upload.single('image'), addProduct);

// Edit
router.get('/edit/:pId', editProduct);
router.get('/detail/:pId', editDetail);
router.get('/remove/:pId', deleteProduct);
router.post('/save-edit', upload.single('image'), saveEdit);
module.exports = router;
