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

/*

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

            var listItem = $('<li><a href="' + markObj.t + '"><span class="tags">' + markObj.t + '</span></a></li>');
            return listItem;

}

*/

//<EventHandler1: Get Tags from User> by Derek


function printTagList(body_div, entries) {
    $(body_div).html("");    
    jQuery.each(entries, function (i, val) {
        $(body_div).append("<li><a href="+ val + ">" + val + "</a></li>");
    });
};

$(document).on('submit', "#load_bookmarks", function () {
        var username = $("#username").val();
        getAllTags(username).done(function (data) {
            console.log(data);
            printTagList(".span9 #tag_trails ul" ,data);
        });
        
        return false;
});

//</EventHandler1: Get Tags from User>

//<EventHandler2: Get Urls from Tag> by Derek

function printUrlList(body_div, entries) {
    $(body_div).html("");    
    jQuery.each(entries, function (i, val) {
        $(body_div).append("<li><a href="+ val + ">" + val + "</a></li>");
    });
};


$(document).on('click', ".span9 #tag_trails a", function(){
  var tag_name = $(this).attr('href');
  var username = $("#username").val();
  getURLs(username, tag_name).done(function (data) {
    console.log(data);
    printUrlList(".span8 #trails ul", data);
  });
  return false
});



// </EventHandler2: Get Urls from Tag>




/*On the selected URL, get suggested tags*/


$(".span8 #trails .nav .nav-pills .nav-stackedli a").on('click', function(e) {
e.preventDefault();
url_name=$(this).attr('href');
alert(url_name);
return false;
});

/*Helper functions*/
/*Display all tags */


  });
  
  