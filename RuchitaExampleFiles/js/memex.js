$(document).ready(function(){
/*/\*Carousel Event Handler*\/
   $('.carousel').carousel({
      interval: 2000
    });*/
    
    /*ON the click event of the URL, display */
    
/*----------------------------------------------*/    
/*Define variables*/
/*Get username*/

var username = $('#username'),
delicious = {};
var url_name;
/*-------------End of Var Definition-----------------*/

/*On the selected URL, get suggested tags*/

$('.span8 #trails a').on('click', function() {
url_name=$(this).attr('href');
alert(url_name);
getSuggestedTags(username, url_name);
return false;
});

$("input[name='radio']").change(function() {

    url_name=$("a#trails").attr("href");
alert(url_name);
delicious = getSuggestedTags(username, url_name);
console.log(delicious);
});
  });