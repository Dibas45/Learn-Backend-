const express = require('express');

const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourUsersIds
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({mergeParams:true});


router.use(protect); // Protect all routes after this middleware

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'),setTourUsersIds, createReview);

router.route('/:id')
.get(getReview)
.patch(restrictTo("user","admin"),updateReview)
.delete(restrictTo("user","admin"),deleteReview)

module.exports = router;