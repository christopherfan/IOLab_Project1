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

3) getSuggestedTags(username, password, url)
    url = string representing url
    returns iterable list of tags

4) addNewTagtoURL(username, password, url, new_tag)
    url = string of url
    new_tag = string of the new tag
    

*/

function getAllTags(username) {
    var tag_object;
    var url_html = "http://feeds.delicious.com/v2/json/tags/" + username+ '?callback=?';
    
        
    
    return getAllTags_APICall(username).pipe(function (data) {
            var string_list = [];
            $.each(data, function (i, val) {
                string_list.push(i);
            });
           // alert(string_list);
            return string_list;
        });
    
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
           
    return getURLs_APICall(username, tag_name).pipe(function (data) {
        var url_list = [];
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].u);
            url_list.push(data[i].u);
        }
        return url_list;

    });

}


function getURLs_APICall(username, tag_name){

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

function getSuggestedTags(username, pass, url) {
    return getSuggestedTags_API(username, pass, url).pipe(function (data) {

            //Return value of the AJAX call is XML
            console.log(data.xml); //example xml created
            var x2js = new X2JS(); // we are using the helper libray xml2json 
            var jsonObj = x2js.xml_str2json(data.xml); // parse the xml into JSON
            //console.log(jsonObj.suggest.popular);// returns object array for popular tags
            //console.log(jsonObj.suggest.recommended); //returns object array for recommended tags
            // example for extracting items from object array
            var string_list = [];
            $.each(jsonObj.suggest.recommended, function (i, val) {
                //console.log(val._tag);
                string_list.push(val._tag);
            });
            return string_list;
    });

}


function getSuggestedTags_API(username_input, password_input, url_name) {
    var deliciousData = {
        method: 'posts/suggest',
        url: url_name,
        username: username_input,
        password:password_input		        
    }
    

   return  $.ajax({
        url: 'delicious_proxy.php',
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



function addNewTagtoURL(username, password, url, new_tag){

    var url_html = "http://feeds.delicious.com/v2/json/tags/" + username;
    var clone_entry;
    getAllEntries(username).done(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            //console.log("Comparing:" +data[i].u +" to>>>>>>>>>> " +url);
            if (data[i].u == url) {
                //alert("found");
                //console.log(data[i]);                
                addTagtoDelicious(username, password, data[i], new_tag);
                break;
            }
        }
    });    
}

function generateNewTagList(list, new_tag) {
    
    var tag_list = new_tag;
    $.each(list, function (i, val) {
        tag_list = tag_list + "," + val;
    });
    return tag_list;
    
}

function getAllEntries(username) {
    var url_name = "http://feeds.delicious.com/v2/json/"+username+ "?count=100";
    return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url_name,
        success: function (data) {
            //console.log(">>>>>" );
            //console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i]);			    
            }
        }
    });
}

function addTagtoDelicious(username_input, password_input, input_object, new_tag) {
    var newTagList = generateNewTagList(input_object.t, new_tag);

    var deliciousData = {
        username: username_input,
        password: password_input,
        method: 'posts/add',
        url: input_object.u,
        description: input_object.d,
        extended: input_object.n,
        dt: input_object.dt,
        tags: newTagList,
        replace: "yes"
    }
   // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
   // console.log(deliciousData);
    $.ajax({
        url: 'delicious_proxy.php',        
        type: 'post',
        data: deliciousData,
        dataType: "jsonp",
        success: function (data) {
            console.log("+++++++++++++++++");
            //console.log(data);
            if (data.result_code == "done") {
                console.log("Bookmarks were successfully posted to delicious");
            }
        }, error: function (e) {
            console.log(e);
        }
    });
}


function deleteEntry(url_input) {
    var Json_Object = {
        url: url_input,
        method: "post/delete"
    };
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        data: Json_Object,
        url: 'delicious_proxy.php',
        success: function () {
            console.log("Deleted: ");
        },
        error: function () {
            console.log("Delete Error >>>>>>");
        }
    });
}
