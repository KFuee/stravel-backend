const substringBusStopTitle = (title) =>
  title.substring(title.indexOf(')') + 2, title.indexOf(' Líneas: '));

module.exports = {
  substringBusStopTitle,
};
