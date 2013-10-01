/*
    Example event handlers invoking the API Calls

    Find: 

*/



$(document).ready(function () {

    console.log("ready");
    $(function () {
        $(document).tooltip();
    });

    $(document).on('click',"#todo-list a",function () {
        confirm_delete(this);
    });

    $(document).on('click', "#GetTag", function () {
        getTagResults($("#tag_input").val()).then(function (data) {
            printEntries("#Elements", data);
        });


    });

    $("#todo-form").submit(function () {
        var values = {};
        $.each($('#todo-form').serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });
        
        // postTag(values);
        addNewTagtoURL(values.username_input, values.password_input, values.url_input, values.tags_input)
		return false;
    });

    $(document).on('submit', "#delete_form", function () {        
        deletePost($("#delete_input").val());
        return false;
    });

    ///////////// Example using getAllTags_APICall ##getAllTags
    $(document).on('submit', "#tag_form", function () {
        var username = $("#tag_request_username").val();
        var deferred_object = getAllTags(username);        
        deferred_object.done(function (data) {            
            //console.log("Getting the strings");
            //console.log(data);
            printList("#Elements" ,data);
        }).fail(function () {
            alert("ADSFASF#################");
        });
        return false;
    });


    //////////// Example using getURLs(username, tag_name) ##getURLs
    $(document).on('submit', "#url_form", function () {
        var tag_name = $("#url_request").val();
        var username = $("#url_request_username").val();
        

        // This is the promise function using the get URL_APICall
        
        getURLs(username, tag_name).done(function (data) {
            //console.log(":-)");
            //console.log(data);
            printList("#Elements", data);
        })
        //.fail( function (data){            
        //        console.log("Bad username");
        //        console.log(data);                   
        //})
        ;
        

        return false;
    });


    //// How to get Popular Tags ##getSuggestedTags
    $(document).on('submit', "#popular_form", function () {
        var username = $("#popular_request_username").val();
        var pass = $("#popular_request_password").val();
        var url = $("#popular_request_url").val();

        getSuggestedTags(username,pass , url).done(function (data) {
            console.log(data);
            printList("#Elements", data);
        });

        //getSuggestedTags(username, pass, url).done(function (data) {
        //    //Return value of the AJAX call is XML
        //    console.log(data.xml); //example xml created
        //    var x2js = new X2JS(); // we are using the helper libray xml2json 
        //    var jsonObj = x2js.xml_str2json(data.xml); // parse the xml into JSON
        //    //console.log(jsonObj.suggest.popular);// returns object array for popular tags
        //    //console.log(jsonObj.suggest.recommended); //returns object array for recommended tags
        //    // example for extracting items from object array
        //    var string_list = [];
        //    $.each(jsonObj.suggest.recommended, function (i, val) {
        //        //console.log(val._tag);
        //        string_list.push(val._tag);
        //    });
        //    console.log(string_list);
        //    printList("#Elements", string_list);
        //});

        return false;
    });

    ///////////// Old code to fully print out full bookmarks per tag
    //$(document).on('submit', "#tag_form", function () {
    //    getTagResults($("#tag_request").val()).then(function (data) {            
    //        printEntries("#Elements", data);
    //    });
    //    return false;
    //});
    /////////////////////////////

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

    /// Trigger functions to test code
	//requestEntry();	    
    //getAllEntries();
	//getAllTags();
	//getTagResults('IOLab_Memex');
    //postTag();

    
    
});
function printList(body_div, entries) {
    
    $(body_div).html("");    
    jQuery.each(entries, function (i, val) {
        $(body_div).append("<li>" + val + "</li>");
    });

}


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



function getAllEntries(){
    
    return $.ajax({
		type: "GET",
		dataType: "jsonp",
		url: "http://feeds.delicious.com/v2/json/superegoforever",
		success: function(data){
			//console.log(">>>>>" );
			//console.log(JSON.stringify(data));
			for(var i=0; i < data.length; i++){
			    //console.log(data[i]);			    
			}
					
		}
	});
}


function getAllTags(){
	$.ajax({ 
		type: "GET",
		dataType: "jsonp",
		url: "http://feeds.delicious.com/v2/json/tags/superegoforever",
		success: function(data){
			var temp = JSON.stringify(data);			
			jQuery.each(data, function (i, val){
				//console.log("tag: " + i +" count: " + val);
			});			
		}
	});
}




function getTagResults(tag){
	var text = tag;	
	var keys;
	return $.ajax({ 
		type: "GET",
		dataType: "jsonp",
		url: "http://feeds.delicious.com/v2/json/superegoforever/"+tag,
		success: function (data) {
		    
		for (var i=0; i < data.length; i++){
			console.log(">>>>>> Next Item");
			jQuery.each(data[i], function(j, val){
				console.log("item: " + j + " value: " + val);
			});
		}
		}
	});
}


function postTag(input_object){	
	var Json_Object = {
	    url: input_object.url_input,
	    extended:input_object.notes_input,
		description: input_object.title_input,
		tags: input_object.tags_input,


	};
	$.ajax({ 
		type: "GET",
		dataType: "jsonp",
		jsonp:false,		
		data:Json_Object,
		// jsonpCallback: function(data, status){
			// console.log("!!!!!!!!!!!!!!!!!!!!!!");
			// //console.log(JSON.stringify(data));
		// },
		url: "https://api.delicious.com/v1/posts/add",
		// success: function(data, textStatus, jqXHR){			
			// console.log("Added " );
		// },
		 error: function(data, textStatus, jqXHR){
			 console.log(data);
			 //console.log(JSON.stringify(data));
		 }
		
	});
}


function recent() {
    console.log("Running Recent");
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        dataFilter: function (response, type) {
            console.log(response); // prints undefined
            console.log(type); //prints "jsonp"
        },
        //jsonp: false,
        
        // jsonpCallback: function(data, status){
        // console.log("!!!!!!!!!!!!!!!!!!!!!!");
        // //console.log(JSON.stringify(data));
        // },
        url: "https://api.delicious.com/v1/posts/recent?callback=popUp",
         success: function(data, textStatus, jqXHR){			
         console.log("Added " );
         },
        error: function (data, textStatus, jqXHR) {
            console.log(textStatus);
            //console.log(JSON.stringify(data));
        }

    });
}




function deletePost(url_input){	
	var Json_Object = {
		url: url_input		
	};	
	$.ajax({ 
		type: "POST",
		dataType: "jsonp",
		data:Json_Object,
		url: "https://api.delicious.com/v1/posts/delete",
		success: function(){			
			console.log( "Deleted: ");
		},
		error: function(){
			console.log ("Delete Error >>>>>>");
		}
	});
}



function addHTML(text) {
    var new_text = '<a href="#" class="todo-list-remove" title="Click to remove item">remove</a>'
    $('#todo-list').append('<li>' + text +' '+  new_text + '</li>');    
}

function confirm_delete(element) {

    var text = $(element).parent().contents().filter(function (index) {
        return this.nodeType === 3;
    }).text();
    
    var confirm = window.confirm("Do you want to delete: " + text);
    
    if (confirm == true)     {
        alert("Confirming delete");
        $(element).parent().remove();
    }
    //$(element).addClass("add_warning");  
    
     
}



javascript: (function (e, t)
{
    var n = e.document;
    setTimeout(function (){
        function a(e) {
            if (e.data === "destroy_bookmarklet") {
                var r = n.getElementById(t);
                if (r) {
                    n.body.removeChild(r);
                    r = null
                }
            }
        }
        var t = "DELI_bookmarklet_iframe", r = n.getElementById(t);
        if (r) {
            return
        }
        var i = "https://delicious.com/save?", s = n.createElement("iframe");
        s.id = t;
        s.src = i + "url=" + encodeURIComponent(e.location.href)
            + "&title=" + encodeURIComponent(n.title)
            + "&note="
            + encodeURIComponent("" + (e.getSelection ? e.getSelection() : n.getSelection ? n.getSelection() : n.selection.createRange().text))
            + "&v=1.1";
        s.style.position = "fixed";
        s.style.top = "0";
        s.style.left = "0";
        s.style.height = "100%25";
        s.style.width = "100%25";
        s.style.zIndex = "16777270";
        s.style.border = "none";
        s.style.visibility = "hidden";
        s.onload = function () {
            this.style.visibility = "visible"
        };
       // n.body.appendChild(s);
        var o = e.addEventListener ? "addEventListener" : "attachEvent";
        var u = o == "attachEvent" ? "onmessage" : "message";
        e[o](u, a, false)
    }, 1)
})(window)