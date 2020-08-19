const express = require('express');
const router = express.Router();
const branchOfficeController = require('../controllers/branch_office_house')

router.route('/').get(branchOfficeController.getAllBranchOffice)

router.route('/newbranchoffice').post(branchOfficeController.createBranchOfficeHouse)

router.route('/branchofficebycompany').post(branchOfficeController.getBranchOfficeByCompany)

router.route('/update').put(branchOfficeController.updateBranchOffice)

module.exports = router;