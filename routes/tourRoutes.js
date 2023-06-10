const express = require('express');
const {
  getAllTours,
  createTours,
  getSingleTour,
  updateSingleTours,
  deleteTour,
  checkID,
  checkBody
} = require('./../controller/tourController');

const router = express.Router();

router.param('id',checkID)
// router.param('id',checkBody)





router.route('/').get(getAllTours).post(checkBody,createTours);
router
  .route('/:id')
  .get(getSingleTour)
  .patch(updateSingleTours)
  .delete(deleteTour);

module.exports = router;
