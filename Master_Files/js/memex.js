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
        $(body_div).append('<li><a href='+ val + '>' + val + '</a><input id = "btnSubmit" type="submit" value="See More Trails"/></li>');
        console.log("VALUE IS"+ val);
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
  console.log(selectedUrl);
  console.log(username);
  $("#btnSubmit").button().click(function(){
        console.log("you clicked a btn item!");
        var password = "ruchita20";
        
         getSuggestedTags(username, password, selectedUrl).done(function (data) {
            console.log(data);
            
            
        });
        
        
    }); 
});

/*Helper functions*/
function getSuggestedTagsTest(username, password_input, url_name) {
 var deliciousData = {
        method: 'posts/suggest',
        url: url_name,
        username: username_input,
        password:password_input		        
    }
   
    
    return  $.ajax({
        url: 'http://courses.ischool.berkeley.edu/i290-iol/f12/resources/trailmaker/delicious_proxy.php?callback=?',
        type: 'post',
        data: deliciousData,
        dataType:"jsonp",
        success: function (data) {                                    
            //console.log(data.xml);
            //var x2js = new X2JS();
            //var jsonObj = x2js.xml_str2json(data.xml);
            //console.log(jsonObj.suggest.popular);
            //console.log(jsonObj.suggest.recommended);

        }, error: function (e) {
            console.log(e);
        }
    });
}
/*Display all tags */


  });
  
  