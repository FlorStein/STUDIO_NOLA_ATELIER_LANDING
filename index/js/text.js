function typeEffect(element, speed) {
	if (!element) return;
	var text = element.innerHTML;
	element.innerHTML = "";
	
	var i = 0;
	var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}


// application
var speed = 75;
var h1 = document.getElementById('h1');
var p = document.getElementById('p');
var isMobileHero = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

if (isMobileHero) {
  document.body.classList.add('mobile-hero-ready');
  if (p) p.style.display = "inline-block";
} else {
  var delay = h1.innerHTML.length * speed + speed;

  // type affect to header
  typeEffect(h1, speed);


  // type affect to body
  setTimeout(function(){
    p.style.display = "inline-block";
    typeEffect(p, speed);
  }, delay);
}
