const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const {protect,restrictTo}=require('../controllers/authController')
const reviewRouter=require("./reviewRoutes")

const router = express.Router();

// Nested routes
router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap')
.get(aliasTopTours, getAllTours);

router.route('/tour-stats')
.get(getTourStats);

router.route('/monthly-plan/:year')
.get(protect,restrictTo("admin","lead-guide","guide"),getMonthlyPlan);

router.route('/').get( getAllTours)
.post(protect,restrictTo("admin","lead-guide"),createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'),updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);
  
module.exports = router;
