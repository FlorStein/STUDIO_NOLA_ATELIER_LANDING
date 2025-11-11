'use strict'

const nav          =   document.querySelector('.nav')
const info0         =   document.getElementById('info0')
const info1         =   document.getElementById('info1')
const info2         =   document.getElementById('info2') 
const info3         =   document.getElementById('info3')
const info4         =   document.getElementById('info4')
const info5         =   document.getElementById('info5')
const info6         =   document.getElementById('info6')

const divider      =   document.getElementById('divider')
const divisor      =   document.getElementById('divisor')

const title        =   document.getElementById('title2') 

const bgr0         =   document.getElementById('bgr0')
const bgr1         =   document.getElementById('bgr1')
const bgr2         =   document.getElementById('bgr2')
const bgr3         =   document.getElementById('bgr3')
const bgr4         =   document.getElementById('bgr4')
const bgr5         =   document.getElementById('bgr5')
const bgr6         =   document.getElementById('bgr6') 

const cartel0       =   document.getElementById('cartel0')
const cartel1       =   document.getElementById('cartel1') 
const cartel2       =   document.getElementById('cartel2') 
const cartel3       =   document.getElementById('cartel3') 
const cartel4       =   document.getElementById('cartel4') 
const cartel5       =   document.getElementById('cartel5')
const cartel6       =   document.getElementById('cartel6')  

const card0         =   document.getElementById('card0')
const card1         =   document.getElementById('card1')
const card2         =   document.getElementById('card2')
const card3         =   document.getElementById('card3')
const card4         =   document.getElementById('card4')
const card5         =   document.getElementById('card5')
const card6         =   document.getElementById('card6')

const row0          =   document.getElementById('row0')
const row1          =   document.getElementById('row1')
const row2          =   document.getElementById('row2')
const row3          =   document.getElementById('row3')
const row4          =   document.getElementById('row4')
const row5          =   document.getElementById('row5')
const row6          =   document.getElementById('row6')

 function bgr00(){
    if(bgr0.classList.contains('active')){
        bgr0.classList.remove('active')
        cartel0.classList.remove('cartel')
        divisor.classList.remove('bgr0')
        divider.classList.remove('bgr0')
        document.body.classList.remove('bgr0')
        nav.classList.remove('nav-on-servicios')
        bgr1.style.display ='flex'
        bgr2.style.display ='flex'
        bgr3.style.display ='flex'
        bgr4.style.display ='flex'
        bgr5.style.display ='flex'
        bgr6.style.display = 'flex'
        title.classList.remove('slidetitle')
        info0.classList.remove('display')
        card0.style.display = 'flex'

    }
    else{
        bgr0.classList.add('active')
        cartel0.classList.add('cartel')
        divisor.classList.add('bgr0')
        divider.classList.add('bgr0')
        document.body.classList.add('bgr0')
        nav.classList.add('nav-on-servicios')
        bgr1.style.display = 'none'
        bgr2.style.display = 'none'
        bgr3.style.display = 'none'
        bgr4.style.display = 'none'
        bgr5.style.display = 'none'
        bgr6.style.display = 'none'
        title.classList.add('slidetitle')
        info0.classList.add('display')
        card0.style.display = 'none'
    }

 }

 function bgr11(){
    if(bgr1.classList.contains('active')){
        bgr1.classList.remove('active')
        cartel1.classList.remove('cartel')
        divisor.classList.remove('bgr1')
        divider.classList.remove('bgr1')
        document.body.classList.remove('bgr1')
        nav.classList.remove('nav-on-servicios')
        bgr0.style.display ='flex'
        bgr2.style.display ='flex'
        bgr3.style.display ='flex'
        bgr4.style.display ='flex'
        bgr5.style.display ='flex'
        bgr6.style.display = 'flex'
        title.classList.remove('slidetitle')
        info1.classList.remove('display')
        card1.style.display = 'flex'
    }
    else{
        bgr1.classList.add('active')
        cartel1.classList.add('cartel')
        divisor.classList.add('bgr1')
        divider.classList.add('bgr1')
        document.body.classList.add('bgr1')
        nav.classList.add('nav-on-servicios')
        bgr0.style.display = 'none'
        bgr2.style.display = 'none'
        bgr3.style.display = 'none'
        bgr4.style.display = 'none'
        bgr5.style.display = 'none'
        bgr6.style.display = 'none'
        title.classList.add('slidetitle')
        info1.classList.add('display')
        card1.style.display = 'none'
    }
 }

 function bgr22(){
    if(bgr2.classList.contains('active')){
        bgr2.classList.remove('active')
        cartel2.classList.remove('cartel')
        divisor.classList.remove('bgr2')
        divider.classList.remove('bgr2')
        document.body.classList.remove('bgr2')
        nav.classList.remove('nav-on-servicios')
        bgr1.style.display ='flex'
        bgr0.style.display ='flex'
        bgr3.style.display ='flex'
        bgr4.style.display ='flex'
        bgr5.style.display ='flex'
        bgr6.style.display = 'flex'
        title.classList.remove('slidetitle')
        info2.classList.remove('display')
        card2.style.display = 'flex'
    }
    else{
        bgr2.classList.add('active')
        cartel2.classList.add('cartel')
        divisor.classList.add('bgr2')
        divider.classList.add('bgr2')
        document.body.classList.add('bgr2')
        nav.classList.add('nav-on-servicios')
        bgr1.style.display = 'none'
        bgr0.style.display = 'none'
        bgr3.style.display = 'none'
        bgr4.style.display = 'none'
        bgr5.style.display = 'none'
        bgr6.style.display = 'none'
        title.classList.add('slidetitle')
        info2.classList.add('display')
        card2.style.display = 'none'
    }
 }

 function bgr33(){
    if(bgr3.classList.contains('active')){
        bgr3.classList.remove('active')
        cartel3.classList.remove('cartel')
        divisor.classList.remove('bgr3')
        divider.classList.remove('bgr3')
        document.body.classList.remove('bgr3')
        nav.classList.remove('nav-on-servicios')
        bgr1.style.display ='flex'
        bgr2.style.display ='flex'
        bgr0.style.display ='flex'
        bgr4.style.display ='flex'
        bgr5.style.display ='flex'
        bgr6.style.display = 'flex'
        title.classList.remove('slidetitle')
        info3.classList.remove('display')
        card3.style.display = 'flex'
    }
    else{
        bgr3.classList.add('active')
        cartel3.classList.add('cartel')
        divisor.classList.add('bgr3')
        divider.classList.add('bgr3')
        document.body.classList.add('bgr3')
        nav.classList.add('nav-on-servicios')
        bgr1.style.display = 'none'
        bgr2.style.display = 'none'
        bgr0.style.display = 'none'
        bgr4.style.display = 'none'
        bgr5.style.display = 'none'
        bgr6.style.display = 'none'
        title.classList.add('slidetitle')
        info3.classList.add('display')
        card3.style.display = 'none'
    }
 }


 function bgr44() {
    if(bgr4.classList.contains('active')){
        bgr4.classList.remove('active')
        cartel4.classList.remove('cartel')
        divisor.classList.remove('bgr4')
        divider.classList.remove('bgr4')
        document.body.classList.remove('bgr4')
        nav.classList.remove('nav-on-servicios')
        bgr1.style.display ='flex'
        bgr2.style.display ='flex'
        bgr3.style.display ='flex'
        bgr0.style.display ='flex'
        bgr5.style.display ='flex'
        bgr6.style.display = 'flex'
        title.classList.remove('slidetitle')
        info4.classList.remove('display')
        card4.style.display = 'flex'
    }
    else{
        bgr4.classList.add('active')
        cartel4.classList.add('cartel')
        divisor.classList.add('bgr4')
        divider.classList.add('bgr4')
        document.body.classList.add('bgr4')
        nav.classList.add('nav-on-servicios')
        bgr1.style.display = 'none'
        bgr2.style.display = 'none'
        bgr3.style.display = 'none'
        bgr0.style.display = 'none'
        bgr5.style.display = 'none'
        bgr6.style.display = 'none'
        title.classList.add('slidetitle')
        info4.classList.add('display')
        card4.style.display = 'none'
    }
   }

   function bgr55() {
    if(bgr5.classList.contains('active')){
        bgr5.classList.remove('active')
        cartel5.classList.remove('cartel')
        divisor.classList.remove('bgr5')
        divider.classList.remove('bgr5')
        document.body.classList.remove('bgr5')
        nav.classList.remove('nav-on-servicios')
        bgr1.style.display ='flex'
        bgr2.style.display ='flex'
        bgr3.style.display ='flex'
        bgr4.style.display ='flex'
        bgr0.style.display ='flex'
        bgr6.style.display = 'flex'
        title.classList.remove('slidetitle')
        info5.classList.remove('display')
        card5.style.display = 'flex'
    }
    else{
        bgr5.classList.add('active')
        cartel5.classList.add('cartel')
        divisor.classList.add('bgr5')
        divider.classList.add('bgr5')
        document.body.classList.add('bgr5')
        nav.classList.add('nav-on-servicios')
        bgr1.style.display = 'none'
        bgr2.style.display = 'none'
        bgr3.style.display = 'none'
        bgr4.style.display = 'none'
        bgr0.style.display = 'none'
        bgr6.style.display = 'none'
        title.classList.add('slidetitle')
        info5.classList.add('display')
        card5.style.display = 'none'
    }
   }

   function bgr66() {
    if(bgr6.classList.contains('active')){
        bgr6.classList.remove('active')
        cartel6.classList.remove('cartel')
        divisor.classList.remove('bgr6')
        divider.classList.remove('bgr6')
        document.body.classList.remove('bgr6')
        nav.classList.remove('nav-on-servicios')
        bgr1.style.display ='flex'
        bgr2.style.display ='flex'
        bgr3.style.display ='flex'
        bgr4.style.display ='flex'
        bgr0.style.display ='flex'
        bgr5.style.display ='flex'
        title.classList.remove('slidetitle')
        info6.classList.remove('display')
        card6.style.display = 'flex'

    }
    else{
        bgr6.classList.add('active')
        cartel6.classList.add('cartel')
        divisor.classList.add('bgr6')
        divider.classList.add('bgr6')
        document.body.classList.add('bgr6')
        nav.classList.add('nav-on-servicios')
        bgr1.style.display = 'none'
        bgr2.style.display = 'none'
        bgr3.style.display = 'none'
        bgr4.style.display = 'none'
        bgr0.style.display = 'none'
        bgr5.style.display = 'none'
        title.classList.add('slidetitle')
        info6.classList.add('display')
        card6.style.display = 'none'
    }
   }





