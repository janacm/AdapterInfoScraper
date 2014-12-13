console.log("loaded");
/**
    1 Collect all of the links on the home page in a list
    2 Loop get requests on list
        - output full build tag
        - Outputs latest dev tag 
        - Outputs latest ca tag
    3 outputs 
        - cat arrays into text document and manually copy into spreadsheet
        - output as CSV
**/

/*
    Runs regex on buildtags 
    ex. on "<html><body><h1>/builds/CCartifacts/release8-ADAPTERS/adapter8-0-1-USP-acme-ems-nnc8</h1><table border='black' borderwidth='1' cellpadding='5'><tr><th>name</th><th>file size</th><th>modified date</th></tr>
    <tr><td><a href="/cruisecontrol/artifacts/release8-ADAPTERS//adapter8-0-1-USP-acme-ems-nnc8/acme-ems-nnc8-R8_0_1-DEV_USP-1-0-0-1">acme-ems-nnc8-R8_0_1-DEV_USP-1-0-0-1/</a></td><td align='right'>4K</td><td align='right'>Tue May 08 05:00:06 EDT 2012</td></tr></table></body></html>"

    run /(DEV([aA-zZ]|-|[0-9])*)/g; 

    get: 
*/
function getAllDevTags(page){
    var tags = new Array();
    var tagsWithoutLetters = new Array();
    // var re = /(DEV(-|[0-9])*)/g;
    var re = /(DEV([aA-zZ]|-|[0-9])*)/g; //catches EMS
    
    tags = page.match(re);

    if (tags == null){
        alert("error, no dev tag matches found");
    }else{
        for (var i = 0; i<tags.length; i++){
            tagsWithoutLetters[i] = tags[i].substring(4); //removes DEV-
        }
    }
    return tagsWithoutLetters;
}

function getLatestDevTag(devTags){
    var devTuples = new Array();
    var tagDigits = new Array();
    var latestDevTuple = new Tuple(0,0,0,0);

    // create Tuples
    for (var i = 0; i<devTags.length; i++){
        tagDigits = devTags[i].toString().split("-"); 
        // console.log("tagDigits " + i + ": " + tagDigits[i]);

        devTuples[i] = new Tuple(parseInt(tagDigits[0]), parseInt(tagDigits[1]), parseInt(tagDigits[2]), parseInt(tagDigits[3]));
    }

    // find max
    for (var i = 0; i < devTuples.length; i++){
        if (latestDevTuple.compareTo(devTuples[i]) < 0){
            latestDevTuple = devTuples[i];
        }
    }
    // console.log("from func latestdt: " + latestDevTuple.toString());
    return latestDevTuple;
}

function useXHR2(url){
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'HTML';
    var thing="";
    req.onload = function (e){
        // return this.response;
        // console.log("XHR: " + this.response);
    }
    req.send();
    return thing;
}

function getFullBuildTag(currentString){
    re = /\/adapter.*"?/g;                       
    if (currentString.match(re) == null){
        alert("no matches for full build tag"); // 
    }else{
        var buildTag = currentString.match(re)[0];
        // console.log(buildTag.length);
    }
    return buildTag.substring(14, buildTag.length-1);
}

function extract(){
  numOfLinks = document.getElementsByTagName('a').length;
  // for (var i = 0; i < numOfLinks; i++){
    // alert(numOfLinks);
    var links = new Array();
    var allDevTags = new Array();
    var latestDevTag = "";
    var latestCAtag = "";
    var currentPage = "";
    var currentString = "";
    var myTest; 

    // for (var i = 0; i < 20; i++){
    for (var i = 0; i < numOfLinks; i++){
        links[i] = document.getElementsByTagName("a")[i].href;
        currentString = links[i].toString();

        if  ((currentString.search("adapter") > 0) &&
            (currentString.search("INHOUSE") < 0) &&
            (currentString.search("v099") < 0)){
            $.get(currentString, parseResponse(responseText));
                
                function() parseResponse(){
            // console.log("currentString: " + currentString);
            // console.log("build tag: " + getFullBuildTag(currentString));
            /*$.get(currentString, function(responseText){
                // console.log("latest dev tag:" + getLatestDevTag(getAllDevTags(responseText)));
/*                // $('#adapterInfoTable tbody').after('<tr>');
            // Customer
                // Name
                $('#adapterInfoTable tr:last').after('<td>' + "ATT" + '</td>');
                // Organization
                $('#adapterInfoTable tr:last').after('<td>' + "USP" + '</td>');
            
            // Adapter
                // Name

                $('#adapterInfoTable tr:last').after('<td>' + "Hitachi-SuperJEngineFramework-v2-R8" + '</td>');
                // // Type
                $('#adapterInfoTable tr:last').after('<td>' + "EMS" + '</td>');
                // // Functionality
                $('#adapterInfoTable tr:last').after('<td>' + "All" + '</td>');
            
            // Nakina
                // Release
                $('#adapterInfoTable tr:last').after('<td>' + "rel" + '</td>');
            
            // NE
                // Vendor
                $('#adapterInfoTable tr:last').after('<td>' + "Vendor" + '</td>');
                // Model
                $('#adapterInfoTable tr:last').after('<td>' + "Model" + '</td>');
                // Version
                $('#adapterInfoTable tr:last').after('<td>' + "Version" + '</td>');
            
*/            // Last DEV Build Tag
                // Tag
                $('#adapterInfoTable tr:last').after('<tr><td>' + getLatestDevTag(getAllDevTags(responseText)) + '</td></tr>');
/*                $('#adapterInfoTable tr:last').after('<td>' + "latestDevTag" + '</td>');
                // When
                $('#adapterInfoTable tr:last').after('<td>' + "tuesday" + '</td>');
            
            // Last CA Build Tag
                // Tag
                $('#adapterInfoTable tr:last').after('<td>' + "latestCAtag"+ '</td>');
                // When
                $('#adapterInfoTable tr:last').after('<td>' + "sunday"+ '</td>');
            // Explanation and additional notes
                $('#adapterInfoTable tr:last').after('<td>' + "fragile"+ '</td>');

                // Last DEV Build tag
        */    // $('#adapterInfoTable tr:last').after('</tr>');
            });
        }
    }
}
/*
    // get first, adapter name, without R#_...
    String full = document.getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML.match(".*R[0-9]")
    String customerName = (if full.contains(att) return "att");
    String customerOrganization = (if full.contains(USP) return "USP");

    "Hitachi-SuperJEngineFramework-v2-R8"
}
*/

function hardCodedUrl(){
    var url = "http://meridian:8080/cruisecontrol/artifacts/release8-ADAPTERS//adapter8-0-0-anda-etheredge4000-v2_5_test-INHOUSE";
    $.get(url, function(responseText){
        console.log(responseText);
    });
}