/*  Delicious API Calls

All of the AJAX GET Calls will return an AJAX object which is a "promise function" that will be invoked when the asynchronous call completes. 
Using the AJAX.then()  will be invoke and run the function. 
To run the API AJAX calls invoke the API Calls in the following manner:

 exampleAPICall(Parameters).then( function (data) {
    
    manipulate the expected return values of the AJAX query using the passed "data" parameter.
};
    

1) getAllTags(username)
    username = string for username
    returns array of java objects. Each Java object will contain an entry from delicions (url, tags, name, etc.)

2) getURLs(username, tag_name)
    username = string for username
    tag = string for tag name
    returns iterable list of urls

3) getSuggestedTags(url)
    url = string representing url
    returns iterable list of tags

4) addNewTagtoURL(url, new_tag)
    url = string of url
    new_tag = string of the new tag
    

*/

function getAllTags(username) {
    var tag_object;
    var url_html = "http://feeds.delicious.com/v2/json/tags/" + username+ '?callback=?';

    $.getJSON(url_html,function (data) {
        console.log(data);        
        tag_object= data;
    })
    alert(tag_object);
}

function getAllTags_APICall(username) {
    var url_html = "http://feeds.delicious.com/v2/json/tags/"+username
    return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url_html,
        success: function (data) {
            //console.log(">>>>>" );
            //console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i]);			    
            }
        }
    });
}


function getURLs(username, tag_name) {
    
    var url_html = "http://feeds.delicious.com/v2/json/" + username + "/" + tag_name;

    var url_list = {};

    getURLs_APICall(username, tag_name).then(function (data) {        
        for (var i = 0; i < data.length; i++) {
            //  console.log(data[i].u);
            url_list = url_list + data[i].u;
        }        
    });
    return url_list;
}


function getURLs_APICall(username, tag_name){

    var url_html = "http://feeds.delicious.com/v2/json/" + username + "/" + tag_name;
    return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url_html,
        success: function (data) {
            //console.log(">>>>>");
            //console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i]);			    
            }
        }
    });
}


function getSuggestedTags(username_input, password_input, url_name) {
    var deliciousData = {
        method: 'posts/suggest',
        url: url_name,
        username: username_input,
        password:password_input		        
    }
    alert("Calling AJAX");

    $.ajax({
        url: 'delicious_proxy.php',
        type: 'post',
        data: deliciousData,
        dataType:"jsonp",
        success: function (data) {                                    
            console.log(data.xml);
            var x2js = new X2JS();
            var jsonObj = x2js.xml_str2json(data.xml);
            console.log(jsonObj.suggest.popular);
            console.log(jsonObj.suggest.recommended);

        }, error: function (e) {
            console.log(e);
        }
    });

}



function addNewTagtoURL(url, new_nag){



}




/****************************************************Dump Code ***********************************************************/
function tester(){
    console.log("ready");
    $(function () {
        $(document).tooltip();
    });

    $(document).on('click', "#todo-list a", function () {
        confirm_delete(this);
    });

    $(document).on('click', "#GetTag", function () {
        getTagResults($("#tag_input").val()).then(function (data) {
            printEntries("#Elements", data);
        });

        //getAllEntries().then(function (data) {
        //   printEntries("#Elements", data);         
        //});         
        // printEntries("Elements", entries);
    });

    $("#todo-form").submit(function () {
        var values = {};
        $.each($('#todo-form').serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });

        postTag(values);
        return false;
    });

    $(document).on('submit', "#delete_form", function () {
        deletePost($("#delete_input").val());
        return false;
    });


    $(document).on('submit', "#tag_form", function () {
        getTagResults($("#tag_request").val()).then(function (data) {
            printEntries("#Elements", data);
        });
        return false;
    });

    $(document).on('click', "#shift_right", function () {
        $("#carousel ul").animate({ marginLeft: -480 }, 10, function () {
            $(this).find("li:last").after($(this).find("li:first"));
            $(this).css({ marginLeft: 0 });
        })
    });

    $(document).on('click', "#shift_left", function () {
        $("#carousel ul").animate({ marginRight: -480 }, 10, function () {
            $(this).find("li:first").before($(this).find("li:last"));
            $(this).css({ marginRight: 0 });
        })
    });

    //requestEntry();	    
    //getAllEntries();
    //getAllTags();
    //getTagResults('IOLab_Memex');
    //postTag();

});



function printEntries(body_div, entries) {
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
        url = "<tr>" + '<td>URL: </td> <td> <a href="' + val.u + '">' + val.u + "</a>" + iframe + "</td></tr>";
        title = "<tr>" + "<td>Title: </td> <td>" + val.d + "</td></tr>";
        description = "<tr>" + "<td>Notes: </td> <td>" + val.n + "</td></tr>";
        tags = "<tr>" + "<td>Tags: </td> <td>" + val.t + "</td></tr>";
        html_injection = html_injection + title + url + description + tags + "</table>";
        $(body_div).append("<li>" + html_injection + "</li>");
        //console.log(html_injection);       

    });
}



function getAllEntries() {

    return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://feeds.delicious.com/v2/json/superegoforever",
        success: function (data) {
            //console.log(">>>>>" );
            //console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i]);			    
            }

        }
    });
}


function getAllTags() {
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://feeds.delicious.com/v2/json/tags/superegoforever",
        success: function (data) {
            var temp = JSON.stringify(data);
            jQuery.each(data, function (i, val) {
                //console.log("tag: " + i +" count: " + val);
            });
        }
    });
}




function getTagResults(tag) {
    var text = tag;
    var keys;
    return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://feeds.delicious.com/v2/json/superegoforever/" + tag,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                console.log(">>>>>> Next Item");
                jQuery.each(data[i], function (j, val) {
                    console.log("item: " + j + " value: " + val);
                });
            }
        }
    });
}


function postTag(input_object) {
    var Json_Object = {
        url: input_object.url_input,
        extended: input_object.notes_input,
        description: input_object.title_input,
        tags: input_object.tags_input
    };
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: false,
        data: Json_Object,
        // jsonpCallback: function(data, status){
        // console.log("!!!!!!!!!!!!!!!!!!!!!!");
        // //console.log(JSON.stringify(data));
        // },
        url: "https://api.delicious.com/v1/posts/add",
        // success: function(data, textStatus, jqXHR){			
        // console.log("Added " );
        // },
        // error: function(data, textStatus, jqXHR){
        // console.log("$$$$$$$$$$$$$$");
        // //console.log(JSON.stringify(data));
        // }

    });
}

function deletePost(url_input) {
    var Json_Object = {
        url: url_input
    };
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        data: Json_Object,
        url: "https://api.delicious.com/v1/posts/delete",
        success: function () {
            console.log("Deleted: ");
        },
        error: function () {
            console.log("Delete Error >>>>>>");
        }
    });
}



function addHTML(text) {
    var new_text = '<a href="#" class="todo-list-remove" title="Click to remove item">remove</a>'
    $('#todo-list').append('<li>' + text + ' ' + new_text + '</li>');
}

function confirm_delete(element) {

    var text = $(element).parent().contents().filter(function (index) {
        return this.nodeType === 3;
    }).text();

    var confirm = window.confirm("Do you want to delete: " + text);

    if (confirm == true) {
        alert("Confirming delete");
        $(element).parent().remove();
    }
    //$(element).addClass("add_warning");  


}



