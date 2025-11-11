'use strict'

$(document).ready(function(){


$('.body').on({'mousemove' : function ( e ) { 
    console.log(e)
    let clientX = e.originalEvent.clientX
    let clientY = e.originalEvent.clientY
    $('#cursor2').css({
        'left': (clientX - 40) + 'px',
        'top' : (clientY - 40) + 'px'
    })
 }})
 

  $('.back').on({
    'mouseover' : function () {
         $('#cursor2').addClass('maxi2')
       },
    'mouseout' : function (){
        $('#cursor2').removeClass('maxi2')
      
    },       
  })
});