// Quick patch: mark battery steele flume squared as drunk
// This file patches window.BEERS after data.js loads
// It's loaded BETWEEN data.js and app.js
(function() {
  const b = window.BEERS.find(x => x.id === 'battery steele flume squared');
  if (b) { b.drunk = true; delete b.draft; }
})();
