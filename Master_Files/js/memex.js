$(document).ready(function(){
/*/\*Carousel Event Handler*\/
   $('.carousel').carousel({
      interval: 2000
    });*/
    
    /*ON the click event of the URL, display */
    
/*----------------------------------------------*/    
/*Define variables*/
/*Get username*/

var username = $("#username").val();
delicious = {};
var url_name;
var tag_name;
/*-------------End of Var Definition-----------------*/



//<EventHandler1: Get Tags from User> by Derek


function printTagList(body_div, entries) {
    $(body_div).html("");    
    jQuery.each(entries, function (i, val) {
        $(body_div).append('<li><a href='+ val + '>' + val + '</a></li>');
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
    //Added a button element to the dynamically generated list for better UX.
        $(body_div).append('<li><a href='+ val + '>' + val + '</a><input id = "btnSubmit" type="submit" class="btn btn-info btn-small active" value="See More Trails"/></li>');
       
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



/*//<EventHandler3: On the selected URL, get suggested tags - Ruchita*/
$('ul').delegate( 'li', 'click', function( event ){
  console.log( 'you clicked on a list item!' );
  var username = $("#username").val();
  /*Child selector: http://api.jquery.com/child-selector*/
  var selectedUrl = $("ul.nav-stacked > li > a").attr('href');
  
  var pass = $("#popular_request_password").val();

  $("#btnSubmit").button().click(function(){
        console.log("you clicked a btn item!");
        console.log(selectedUrl);
        
    }); 
    getSuggestedTags(username,pass, selectedUrl).done(function (data) {
            console.log(data);
            printTagList("#suggestedTrails", data);
        });
});




  });
  
  