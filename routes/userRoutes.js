const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  
} = require('./../controller/userController');

//read all users

router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getSingleUser)
  .patch(updateSingleUser)
  .delete(deleteUser);

module.exports = router;
