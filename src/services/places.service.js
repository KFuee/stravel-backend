const axios = require('axios');

axios.defaults.baseURL = 'https://api.yelp.com/v3';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.YELP_API_KEY}`;
axios.defaults.params = {};
axios.defaults.params.locale = 'es_ES';

const searchAutocomplete = async (text, latitude, longitude) => {
  const response = await axios.get(`/autocomplete`, {
    params: {
      text,
      latitude,
      longitude,
    },
  });

  delete response.data.terms;

  return response.data;
};

const businessesSearch = async (term, latitude, longitude, limit) => {
  const response = await axios.get(`/businesses/search`, {
    params: {
      term,
      latitude,
      longitude,
      limit,
    },
  });

  return response.data;
};

const businessDetails = async (id) => {
  const response = await axios.get(`/businesses/${id}`);

  return response.data;
};

const businessReviews = async (id) => {
  const response = await axios.get(`/businesses/${id}/reviews`);

  return response.data;
};

module.exports = {
  searchAutocomplete,
  businessesSearch,
  businessDetails,
  businessReviews,
};
