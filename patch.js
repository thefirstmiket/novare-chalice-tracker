// Patches applied on top of data.js
// Each entry: mark beer as drunk, remove draft/bottle (so it leaves available list)
(function() {
  var patches = [
    'battery steele flume squared',
    'goodfire ddh prime',
  ];
  patches.forEach(function(id) {
    var b = window.BEERS.find(function(x) { return x.id === id; });
    if (b) { b.drunk = true; delete b.draft; delete b.bottle; }
  });
})();
