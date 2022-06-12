// utils
const catchAsync = require('../utils/catchAsync');

// services
const { transportService } = require('../services');

const getAllBusStops = catchAsync(async (_req, res) => {
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

const getArrivalTimesBusStop = catchAsync(async (req, res) => {
  const { busStopId } = req.params;

  const response = await transportService.getArrivalTimesBusStop(busStopId);

  const arrivalTimes = response.map((arrivalTime) => {
    const firstArrivalTime = arrivalTime.primero.substring(
      0,
      arrivalTime.primero.indexOf(' ')
    );
    const secondArrivalTime = arrivalTime.segundo.substring(
      0,
      arrivalTime.segundo.indexOf(' ')
    );

    return {
      line: arrivalTime.linea,
      // Replace ',' '.' and ':' with ''
      destination: arrivalTime.destino
        .replaceAll(',', '')
        .replaceAll('.', '')
        .replaceAll(':', ''),
      firstArrivalTime,
      secondArrivalTime,
    };
  });

  return res.status(200).send(arrivalTimes);
});

module.exports = {
  getAllBusStops,
  getArrivalTimesBusStop,
};
