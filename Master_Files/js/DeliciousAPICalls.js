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
    var url_html = "http://feeds.delicious.com/v2/json/tags/" + username + '?callback=?';

    $.getJSON(url_html, function (data) {
        console.log(data);
        tag_object = data;
    })
    alert(tag_object);
}

function getAllTags_APICall(username) {
    var url_html = "http://feeds.delicious.com/v2/json/tags/" + username
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

    var url_list = [];
    var deferred_object = getURLs_APICall(username, tag_name);
    deferred_object.done(function (data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].u);
            url_list.push(data[i].u);
        }
        return url_list;
    });

}


function getURLs_APICall(username, tag_name) {

    var url_html = "http://feeds.delicious.com/v2/json/" + username + "/" + tag_name;
    //console.log(url_html);
    return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url_html,
        success: function (data) {
            //console.log(">>>>>");
            //onsole.log(JSON.stringify(data));
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
        password: password_input
    }


    return $.ajax({
        url: 'delicious_proxy.php',
        type: 'post',
        data: deliciousData,
        dataType: "jsonp",
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



function addNewTagtoURL(usernname, password, url, new_nag) {

    var url_html = "http://feeds.delicious.com/v2/json/tags/" + username;
    var clone_entry;
    // grab all entries     
    var entries_list = ($.ajax({
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
    })).then().val();

    $.each(entries_list, function (i, val) {
        if (val.u == url) {
            clone_entry = this;
        }

        //clone object

        //delete old entry

        //add new entry

    });

}



