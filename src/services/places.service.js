const axios = require('axios');

axios.defaults.baseURL = 'https://api.yelp.com/v3';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.YELP_API_KEY}`;

const searchAutocomplete = async (text, latitude, longitude) => {
  const response = await axios.get(`/autocomplete`, {
    params: {
      text,
      latitude,
      longitude,
      locale: 'es_ES',
    },
  });

  return response.data;
};

module.exports = {
  searchAutocomplete,
};
