console.log("loaded");


/**
    1 Collect all of the links on the home page in a list
    2 Loop get requests on list
    3 Extracts latest dev tag and copies to dev array
    4 Extracts latest ca tag and copies to ca array
    5 continue until no more links to click
    6 outputs 
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

var results1;
function getPageXML(url){
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'HTML';
    var thing="";
    req.onload = function (e){
        // console.log("XHR: " + req.responseText);
        // return this.response;
        results1 = this.response;
        // console.log("XHR: " + this.response);
    }
    req.send();
    return thing;
}

function getPage(url){
    // var Obj = new Object();

    $.get(url, function(responseText){
        // returnGet(responseText);
        // Obj.datas = responseText;
    });

    // return Obj.datas;
}

var globalData;
function setGlobalData(data){
    // console.log("returnget: " + data);
    globalData=data;
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
                $.get(currentString, function(responseText){
                    console.log("latest dev tag:" + getLatestDevTag(getAllDevTags(responseText)));
                    
                });

                // console.log("result: " + getPage(currentString));
                // var msg = $.ajax({type: "GET", url: currentString, async: false});
                // var msg = $.ajax({
                //     url: currentString,
                //     dataType: 'HTML',
                //     async: false,
                //     // data: myData,
                //     success: function(data) {
                //         setGlobalData(data);
                //     }
                // });
                // console.log("msg" + msg);
                // console.log(msg.responseText);

                // console.log("globalData: " + globalData);
                // console.log(globalData.responseText);

                // console.log("myTest" + myTest);
                // console.log(myTest.responseText);
                // console.log("xml: " + getPageXML(currentString));
                // console.log(myTest);
            // console.log(currentPage = getPage(currentString)); //need to save that string
            // allDevTags = getAllDevTags(currentPage);
        }else{
            // console.log("skipped link:"+ i + " "+ currentString);

        }
    }
}




// alert(myLittleTupy.a);
/*
function Strategy (){
    // alert("regex: " + document.getElementsByClassName("dir")[0].
    Hitachi-SuperJEngineFramework-v2-R8_0_0-CA-3-3-0-1/

    // get first, adapter name, without R#_...
    String full = document.getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML.match(".*R[0-9]")
    String adapterName = 
    String adapterType = 
    String adapterFunctionality = 
    String nakinaRelease = 
    String vendor =
    String model = 
    String version =

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