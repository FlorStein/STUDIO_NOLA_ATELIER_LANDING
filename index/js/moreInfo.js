$(document).ready(function() {
    var $item = 0,
      $itemNo = $(".hero1 .figure1").length;
    function transitionSlide() {
      $item++;
      if ($item > $itemNo - 1) {
        $item = 0;
      }
      $(".hero1 .figure1").removeClass("on");
      $(".hero1 .figure1")
        .eq($item)
        .addClass("on");
    }
    var $autoTransition = setInterval(transitionSlide, 3500);
  
    $(".hero1 .figure1").click(function() {
      clearInterval($autoTransition);
      $item = $(this).index();
      $(".hero1 .figure1").removeClass("on");
      $(".hero1 .figure1")
        .eq($item)
        .addClass("on");
    //   $autoTransition = setInterval(transitionSlide, 3500);
    });
  });