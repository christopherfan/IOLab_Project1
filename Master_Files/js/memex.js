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
var selectedUrl;
var pass;
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
        $(body_div).append('<li><a href="'+ val + '">' + val + '</a><input id = "btnSubmit" type="submit" class="btn btn-info btn-small active" value="See More Trails"/></li>');
       
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
$('#trails ul').delegate( 'li', 'click', function( event ){
  console.log( 'you clicked on a list item!' );
  selectedUrl = $(this).text();
  pass = $("#popular_request_password").val();
  console.log(selectedUrl);
  console.log("Fetching Recommended Tags from the Universe");
    getSuggestedTags(username,pass, selectedUrl).done(function (data) {
            console.log(data);
            printSuggestedTagsList("#suggestedTrails", data);
        });
});

function printSuggestedTagsList(body_div, entries) {
    $(body_div).html("");    
    jQuery.each(entries, function (i, val) {
    //Added a button element to the dynamically generated list for better UX.
    
        $(body_div).append('<p>'+ val + '<input id = "btnSubmitTag" type="submit" class="btn btn-info btn-mini active" value="Add This Tag"/></p>');
       
    });
};

/*EventHandler 4: Add New Tag to the URL - Ruchita*/
$( "#suggestedTrails" ).click(function() {
  console.log( "Handler for .click() called." );
  selectedTag = $("#suggestedTrails > p").text();
  console.log(selectedTag);
  $("#btnSubmitTag").button().click(function(){
        console.log("you clicked a btn item!");
        addNewTagtoURL(username, pass, selectedUrl, selectedTag);
        });        
		return false;
});




  });
  
  