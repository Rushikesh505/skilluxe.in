$(document).ready(function(){
    $("h3#one").click(function(q){
        q.preventDefault();
        $("#course1").toggle();
    });
});
$(document).ready(function(){
   $("h3#two").click(function(q){
       q.preventDefault();
       $("#course2").toggle();
   });
});
$(document).ready(function(){
   $("h3#three").click(function(q){
       q.preventDefault();
       $("#course3").toggle();
   });
});
$(document).ready(function(){
   $("h3#four").click(function(q){
       q.preventDefault();
       $("#course4").toggle();
   });
});
$(document).ready(function(){
   $("h3#five").click(function(q){
       q.preventDefault();
       $("#course5").toggle();
   });
});
$(document).ready(function(){
   $("h3#six").click(function(q){
       q.preventDefault();
       $("#course6").toggle();
   });
});

$(document).ready(function(){
    $("h3#seven").click(function(q){
        q.preventDefault();
        $("#course7").toggle();
    });
 });



$(document).ready(function() {
   $("#btn6").click(function(){
      alert("ThankYou for your interest, we'll get back at you shortly");
      window.location.href="../index.html";
   })
})