$(document).ready(function(){
    // document.addEventListener('DOMContentLoaded', function() {
    var datePicker = document.getElementById('formdate');
    var todatePicker = document.getElementById('todate');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    datePicker.setAttribute('min', today);
    todatePicker.setAttribute('min', today);


    $(document).on('click','#SearchCar', function () {
       var from_location = $('#LocationTag').val();
       var to_date = $("#formdate").val() ;
       var from_date = $("#todate").val();
    
       if (!from_location) {
         alert("Please select a location");
       }else{ 

        console.log(from_location,to_date,from_date)
       }

       $.ajax({
        url:'/checkdata',
        method:'post',
        type:'json',
        data:{from_location:from_location,to_date:to_date,from_date:from_date},
        success:function(){
          
        }
       })
    
})
})



const carouselSlide = document.querySelector('.carousel-slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const images = document.querySelectorAll('.carousel-slide img');

let counter = 0;
const size = images[0].clientWidth;

function slideNext() {
  if (counter >= images.length - 1) return;
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}

function slidePrev() {
  if (counter <= 0) return;
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}

nextButton.addEventListener('click', slideNext);
prevButton.addEventListener('click', slidePrev);
