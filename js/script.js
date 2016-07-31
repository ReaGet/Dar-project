function App() {
  var container = document.getElementById('container'),
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      video = document.getElementById('video'),
      vendorURL = window.URL || window.webkitURL;
      navigator.getUserMedia = navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia ||
                               navigator.msGetUserMedia,
      videoSelect = null,
      touch = utils.captureTouch(document.getElementById("video-obj")),
      stream = null;

  function gotSources(sourceInfos) {
    for (var i = 0; i !== sourceInfos.length; ++i) {
      var sourceInfo = sourceInfos[i];
      var option = document.createElement('option');
      option.value = sourceInfo.id;
      if (sourceInfo.kind === 'video') {
        option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
        videoSelect.appendChild(option);
      } else {
        console.log('Some other kind of source: ', sourceInfo);
      }
    }
  }

  function checkMediaStreamTrack() {
    if (typeof MediaStreamTrack === 'undefined' ||
      typeof MediaStreamTrack.getSources === 'undefined') {
      console.log('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    } else {
      videoSelect = document.createElement('select');
      videoSelect.setAttribute('id', 'videoSource');
      container.insertBefore(videoSelect, container.childNodes[0]);
      MediaStreamTrack.getSources(gotSources);
    }
  }

  function successCallback(stream) {
    stream = stream;
    video.src = vendorURL.createObjectURL(stream);
    video.play();
  }

  function errorCallback(error) {
    console.log(error);
  }

  function start() {
    if (stream) {
      video.src = null;
      window.stream.stop();
    }
    var constraints = {};
    constraints.audio = false;
    if (videoSelect) {
      constraints.video = {
        optional: [{ sourceId: videoSelect.value }]
      };
    } else {
      constraints.video = true;
    }

    navigator.getUserMedia(constraints, successCallback, errorCallback);
  }

  this.init = function() {
    if(!navigator.getUserMedia) {
      alert("Your browser doesn't support getUserMedia.\nTry Chrome or another modern browser.");
      return;
    }
    checkMediaStreamTrack();
    if (videoSelect)
      videoSelect.onchange = start;
    start();
  };
}

window.addEventListener('DOMContentLoaded', function() {
  var app = new App();
  app.init();
}, false);
