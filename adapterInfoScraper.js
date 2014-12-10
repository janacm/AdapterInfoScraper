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
  // numOfLinks = document.getElementsByTagName('td').length;
  // for (var i = 0; i < numOfLinks; i++){
    var links = new Array();
    var allDevTags = new Array();
    var latestDevTag = "";
    var latestCAtag = "";
    var currentPage = "";
    var currentString = "";
    var myTest; 

    for (var i = 0; i < 20; i++){
        links[i] = document.getElementsByTagName("a")[i].href;
        currentString = links[i].toString();

        if  ((currentString.search("adapter") > 0) &&
            (currentString.search("INHOUSE") < 0) &&
            (currentString.search("v099") < 0)){
                
            console.log("currentString: " + currentString);
            console.log("build tag: " + getFullBuildTag(currentString));
            $.get(currentString, function(responseText){
                console.log("latest dev tag:" + getLatestDevTag(getAllDevTags(responseText)));
                $('#adapterInfoTable tr:last').after('<tr><td>' + getLatestDevTag(getAllDevTags(responseText)) + '</td></tr>');
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