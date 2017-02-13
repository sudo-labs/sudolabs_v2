$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
  });

$('#contact').click(function() {
   $('#toggle').toggleClass('active');
   $('#overlay').toggleClass('open');
   smoothScroll('footer');
  });