/* The Pyramid Hotel — faint background slideshow
   ------------------------------------------------
   Looks for images named 1.jpg, 2.jpg, 3.jpg ... inside a "pictures"
   folder next to this script, tries a few common extensions for each
   number, and crossfades between whichever ones it actually finds.

   To add photos: just drop them in the "pictures" folder, named in
   order — 1.jpg, 2.jpg, 3.jpg, 4.jpg, and so on (or .jpeg/.png, any
   of those work). No other setup needed. Missing numbers are simply
   skipped, so gaps are fine.

   Safe by design: if the pictures folder is empty or missing, this
   script quietly does nothing and the page keeps its plain navy look.
*/
(function(){

  var FOLDER = 'pictures/';
  var MAX_INDEX = 20;                 // highest number it will look for
  var EXTENSIONS = ['jpg','jpeg','png','JPG','JPEG','PNG'];
  var SLIDE_SECONDS = 8;              // how long each photo stays up
  var FADE_MS = 2000;                 // crossfade duration, matches CSS

  function tryLoad(url){
    return new Promise(function(resolve){
      var img = new Image();
      img.onload  = function(){ resolve(url); };
      img.onerror = function(){ resolve(null); };
      img.src = url;
    });
  }

  function loadIndex(i){
    function attempt(j){
      if (j >= EXTENSIONS.length) return Promise.resolve(null);
      return tryLoad(FOLDER + i + '.' + EXTENSIONS[j]).then(function(found){
        return found ? found : attempt(j + 1);
      });
    }
    return attempt(0);
  }

  function init(){
    var layerA = document.getElementById('bgLayerA');
    var layerB = document.getElementById('bgLayerB');
    if (!layerA || !layerB) return;

    var lookups = [];
    for (var i = 1; i <= MAX_INDEX; i++) lookups.push(loadIndex(i));

    Promise.all(lookups).then(function(results){
      var images = results.filter(Boolean);
      if (images.length === 0) return; // nothing found, stay on plain gradient

      var layers = [layerA, layerB];
      var activeLayer = 0;
      var current = 0;

      // show the first photo immediately, no fade needed
      layers[0].style.backgroundImage = "url('" + images[0] + "')";
      layers[0].classList.add('active');

      if (images.length === 1) return; // only one photo, nothing to cycle

      setInterval(function(){
        current = (current + 1) % images.length;
        var nextLayer = layers[(activeLayer + 1) % 2];
        nextLayer.style.backgroundImage = "url('" + images[current] + "')";

        requestAnimationFrame(function(){
          layers[activeLayer].classList.remove('active');
          nextLayer.classList.add('active');
          activeLayer = (activeLayer + 1) % 2;
        });
      }, SLIDE_SECONDS * 1000);
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
