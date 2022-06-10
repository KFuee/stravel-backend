// utils
const catchAsync = require('../utils/catchAsync');

// services
const { transportService } = require('../services');

const getAllBusStops = catchAsync(async (req, res) => {
  const response = await transportService.getAllBusStops();

  const busStops = response.result.map((busStop) => {
    // (688) P. Reyes De Aragón N.º 24 Líneas: 58
    const title = busStop.title.substring(
      busStop.title.indexOf(')') + 2,
      busStop.title.indexOf(' Líneas: ')
    );

    const titleLines = busStop.title.substring(
      busStop.title.indexOf('Líneas: ') + 8,
      busStop.title.length
    );
    const titleLinesArray = titleLines.split(', ');

    return {
      ...busStop,
      title,
      lines: titleLinesArray,
    };
  });

  res.status(200).send(busStops);
});

module.exports = {
  getAllBusStops,
};
