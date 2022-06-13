// utils
const catchAsync = require('../utils/catchAsync');
const { substringBusStopTitle } = require('../utils/general');

// services
const { transportService } = require('../services');

const getAllBusStops = catchAsync(async (_req, res) => {
  const response = await transportService.getAllBusStops();

  const busStops = response.result.map((busStop) => {
    // (688) P. Reyes De Aragón N.º 24 Líneas: 58
    const title = substringBusStopTitle(busStop.title);
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

const getBusStopById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await transportService.getBusStopById(id);
  response.title = substringBusStopTitle(response.title);
  delete response.icon;
  delete response.destinos;

  res.status(200).send(response);
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

const getAllBusLines = catchAsync(async (_req, res) => {
  const response = await transportService.getAllBusLines();

  const busLines = response.map((busLine) =>
    busLine.substring(busLine.lastIndexOf('/') + 1, busLine.length)
  );

  res.status(200).send(busLines);
});

const getBusLineById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const response = await transportService.getBusLineById(id);

  const busLine = response.title.substring(
    response.title.lastIndexOf('a') + 2,
    response.title.length
  );

  const geometry = response.result[0].geometry.coordinates[0].map(
    (coordinate) => ({
      latitude: coordinate[1],
      longitude: coordinate[0],
    })
  );

  const lineStops = response.result.slice(1);

  res.status(200).send({
    title: busLine,
    geometry,
    lineStops,
  });
});

module.exports = {
  getAllBusStops,
  getBusStopById,
  getArrivalTimesBusStop,
  getAllBusLines,
  getBusLineById,
};
