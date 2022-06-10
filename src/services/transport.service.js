const axios = require('axios');

const instance = axios.create({
  baseURL:
    'https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/',
});

const getAllBusStops = async () => {
  const response = await instance.get('/poste-autobus');
  return response.data;
};

module.exports = {
  getAllBusStops,
};
