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

const businessDetails = catchAsync(async (req, res) => {
  const { id } = req.query;
  const results = await placesService.businessDetails(id);

  res.status(200).send(results);
});

module.exports = {
  autoComplete,
  businessDetails,
};
