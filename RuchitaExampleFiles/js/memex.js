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

 $(document).on('submit', "#load_bookmarks", function () {
        var username = $("#username").val();
        
        var string_list = [];
        getAllTags_APICall(username).done(function (data) {
            $.each(data, function (i, val) {
/*            $( ".span9" ).append( '<p>'+'<a href="getURLs(username,'+ i+');" id="tag">'+i+'</a>'+'('+val+')'+'</p>');
*/           
$('.span9 .bookmarks p').append('  <span id="add_here">'+i+'('+val+')</span>');
            });
            
            
            
            
        });

        return false;
    });


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

/*Helper functions*/
/*Display all tags */


  });
  
  