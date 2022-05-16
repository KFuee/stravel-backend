const catchAsync = require('../utils/catchAsync');

const { placesService } = require('../services');

const autoComplete = catchAsync(async (req, res) => {
  const { text, latitude, longitude } = req.query;
  const results = await placesService.searchAutocomplete(
    text,
    latitude,
    longitude
  );

  res.status(200).send(results);
});

const businessesSearch = catchAsync(async (req, res) => {
  const { term, latitude, longitude, limit } = req.query;
  const results = await placesService.businessesSearch(
    term,
    latitude,
    longitude,
    limit
  );

  res.status(200).send(results);
});

const businessDetails = catchAsync(async (req, res) => {
  const { id } = req.query;
  const results = await placesService.businessDetails(id);

  res.status(200).send(results);
});

const businessReviews = catchAsync(async (req, res) => {
  const { id } = req.query;
  const results = await placesService.businessReviews(id);

  res.status(200).send(results.reviews);
});

module.exports = {
  autoComplete,
  businessesSearch,
  businessDetails,
  businessReviews,
};
