const axios = require('axios');

const instance = axios.create({
  baseURL:
    'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/',
});

const getAllBusStops = async () => {
  const response = await instance.get('/poste-autobus');
  return response.data;
};

const getBusStopById = async (id) => {
  const response = await instance.get(`/poste-autobus/${id}`);
  return response.data;
};

const getArrivalTimesBusStop = async (id) => {
  const response = await instance.get(`/poste-autobus/${id}`);
  return response.data.destinos;
};

module.exports = {
  getAllBusStops,
  getBusStopById,
  getArrivalTimesBusStop,
};
