const express = require('express');
const router = express.Router();
const branchOfficeController = require('../controllers/branch_office_house')

router.route('/').get(branchOfficeController.getAllBranchOffice)

router.route('/newbranchoffice').post(branchOfficeController.createBranchOfficeHouse)

router.route('/branchofficebycompany').post(branchOfficeController.getBranchOfficeByCompany)

router.route('/update').put(branchOfficeController.updateBranchOffice)

router.route('/delete').post(branchOfficeController.deleteBranchOffice)

router.route('/products/:id').get(branchOfficeController.getProducts)

router.route('/products/:id_sucursal/:id_product').get(branchOfficeController.getProduct)



module.exports = router;