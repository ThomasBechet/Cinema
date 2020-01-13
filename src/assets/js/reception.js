var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//Changement de fond d'écran
var header = $('body');

var backgrounds = new Array(
  'linear-gradient(to right, rgb(14, 14, 14) 54%, rgba(14, 14, 14,0.55) 70%, rgba(50, 50, 50,0.5) 75%,rgba(100, 100, 100,0.1), rgba(255, 255, 255,0) ),url(assets/img/wonder.jpg)'
  , 'url(assets/img/marvel_deadpool.jpg)'
  , 'url(assets/img/Aqua.jpg)'
  , 'url(assets/img/spiderman.jpg)'
);


var current = 0;

function nextBackground() {
  current++;
  current = current % backgrounds.length;
  header.css('background-image', 'linear-gradient(to right, rgb(14, 14, 14) 54%, rgba(14, 14, 14,0.55) 70%, rgba(50, 50, 50,0.5) 75%,rgba(100, 100, 100,0.1), rgba(255, 255, 255,0) ),' + backgrounds[current]);
  backgrounds[0] = 'url(assets/img/wonder.jpg)'
}
setInterval(nextBackground, 2000);

header.css('background-image', backgrounds[0]);
