
var html = "<html><head><style>body {    color: /*STARTtextColor*/00ffcc/*textColorEND*/;    background-color: /*STARTbgColor*/0000cc/*bgColorEND*/;}%23container {    width: 600px;    margin: 0px auto;    padding: 10px 60px;    background-color: ffffff;}a {    color: /*STARTlinkColor*/ccffff/*linkColorEND*/;}</style></head><body><div id='container'><h1><!--STARTwebsiteTitle-->Welcome to my new website!<!--websiteTitleEND--></h1> <!--STARTmenu0--><div class='menu' id='menu1'> <ul><li><a href='Home'>Home</a></li></ul></div><!--menu0END-->  <!--STARTpageContent--> <!--pageContentEND--><p><!--STARTfooter-->This is the bottom of the page. Thanks for reading!<!--footerEND--></p></div></body></html>";

var r1 = new Replacement('websiteTitle', 'Website title', 'Welcome to my new website!','text');
var r2 = new Replacement('footer', 'Footer', 'This is the bottom of the page. Thanks for reading!','text');
var r3 = new CssReplacement('textColor', 'Text colour', '424242', 'color');
var r4 = new CssReplacement('bgColor', 'Background colour', 'ffeecd', 'color');
var r5 = new CssReplacement('linkColor', 'Link colour', 'ff00cc', 'color');
var p1 = new PageRep(1, 1, 'Home', "<h2>Lorem!</h2>");
var reps = [r1, r2,r3, r4, r5];
var preps = [p1];

// Get all the juicy metadata
function getData(text) {
    var foo1 = text.split("<!--STARTjsTemplatorData");
    var foo2 = foo1[1].split("jsTemplatorDataEND-->");
    return foo2[0];
}

// Get rep shortNames
function getRepNames(text) {
    var fooArray = splitStringKeepDelimiters(text, "<!--START");
    var names = []

    var i=0;
    var imax = fooArray.length - 1;
    while (i < imax) {   
        if (fooArray[i] == "<!--START") {
            var newArray = fooArray[i+1].split("-->", 1);
            names.push(newArray[0]);
            i += 2;
        }
        else {
            i += 1;
        }
    }
    // Includes the metadata thing, so take that off
    names.shift();
    return names;
}

function getCssRepNames(text) {
    var fooArray = splitStringKeepDelimiters(fileText, "/*START");
    var names = []

    var i=0;
    var imax = fooArray.length - 1;
    while (i < imax) {   
        if (fooArray[i] == "/*START") {
            var newArray = fooArray[i+1].split("*/", 1);
            names.push(newArray[0]);
            i += 2;
        }
        else {
            i += 1;
        }
    }
    // Includes the metadata thing, so take that off
    names.shift();
    return names;
}

function preview() {
    var objs = getElementsByClassName(document, 'userInput');
    for (var i=0; i<objs.length; i++) {
        for (var j=0; j<reps.length; j++) {
            if (reps[j].shortName == objs[i].id) {
                reps[j].content = objs[i].value;

                // prepend a '#' to hex colors
                if (reps[j].inputType == 'color') {
                    reps[j].content = "%23" + objs[i].value;
                }
                break;
            }
        }
        var monster = new SiteTemplate('Monster', html, 1, reps, preps, 'A basic template to get started');
        var foobey = "data:text/html;charset=utf-8, " + monster.pageOut(1);
    }
    window.open(foobey, '_blank');
}

// EXISTS ELSEWHERE??
function generateUserInputFields(reps) {
    var html = "";
    for (var i=0; i<reps.length; i++) {
        html += reps[i].userInputHTML();
    }
    document.getElementById('userInput').innerHTML = html;
}
