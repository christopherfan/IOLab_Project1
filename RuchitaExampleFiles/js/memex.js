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
        var username = $("#tag_request_username").val();

        getAllTags_APICall(username).done(function (data) {
            var string_list = [];
            $.each(data, function (i, val) {
                string_list.push(i + "("+val+")");
            });
            
            printList("#Elements",string_list);
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

/*function print entries*/
function printEntries(body_div,entries) {
    var title;
    var url;
    var description;
    var tags;
    var html_injection = '<table class="entry_format" border="1">';
    var iframe;
    $(body_div).html("");
    //for(var i=0; i < entries.length; i++){
    //    url = entries[i].u;
    //    $(body_div).append('<li>' + url + '</li>');
    //}	
    //console.log( entries);
    jQuery.each(entries, function (i, val) {       
        html_injection = '<table class="entry_format" border="1">';
        iframe = '<div class="box"> <iframe src=' + val.u + ' width = "500px" height = "500px"></iframe> </div>';
        url = "<tr>" + '<td>URL: </td> <td> <a href="' + val.u + '">' + val.u +"</a>"+"</td></tr>";
        title = "<tr>" + "<td>Title: </td> <td>" + val.d + "</td></tr>";
        description = "<tr>" + "<td>Notes: </td> <td>" + val.n + "</td></tr>";
        tags = "<tr>" + "<td>Tags: </td> <td>" + val.t + "</td></tr>";
        html_injection = html_injection + title + url + description +tags+ "</table>";        
        $(body_div).append("<li>" + html_injection + "</li>");
        //console.log(html_injection);               
    });    
}
/*end of print entries function*/
  });
  
  