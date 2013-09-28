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
var tag_name;
/*-------------End of Var Definition-----------------*/


$('#load_bookmarks').submit(function(e) {

  var username = $('#username').val();
  var url = 'http://feeds.delicious.com/v2/json/' + username + '?callback=?';

  $.getJSON(url, function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var li = generateBookmarkListItem(data[i]);
      $('.span9 #tag_trails ul').append(li);
    }
  });

  return false;
      
});

function generateBookmarkListItem(markObj) {

            var listItem = $('<li><a href="' + markObj. + '"><span class="tags">' + markObj.t + '</span></a></li>');
            return listItem;

}

/*
 $(document).on('submit', "#load_bookmarks", function () {
        var username = $("#username").val();

        var string_list = [];
        getAllTags_APICall(username).done(function (data) {
            alert("done");
            $.each(data, function (i, val) {
//            $( ".span9" ).append( '<p>'+'<a href="getURLs(username,'+ i+');" id="tag">'+i+'</a>'+'('+val+')'+'</p>');
           
$('.span9 .bookmarks p').append('  <span id="add_here">'+i+'('+val+')</span>');
            });
            
            
            
            
        });

        return false;
    });
*/

// <Derek's code>
/*
$('.span9 #tag_trails a').on('click', funtion() {
  tag_name=$(this).attr('href');
  getURLs(username, tag_name).done(function (data){
    $.each(data, function(i,val){

    });
  });
  return false
});
*/




// </Derek's code>




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
  
  