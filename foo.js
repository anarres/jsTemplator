var fooRegEx = /<!--START[\s\S]*?END-->/gm;
var fooRegEx2 = /<!--START[\s\S]*?-->/gm;

function replacement(shortName, niceName) {
    this.shortName = shortName;
    this.niceName = niceName;
    this.toString = function () {
      return 'replacement object: ' + this.niceName;
    };
}

function template(templateName, html, replacementsArray) {
    this.templateName = templateName;
    this.html = html;
    this.replacements = [];   // Array of replacement objects
    this.replacements = replacementsArray;

    this.toString = function () {
      return 'template object: ' + this.templateName;
    };
}

var rArray2 = new Array(
    new replacement('websiteTitle', 'Website title'),
    new replacement('pageContent', 'Page content'),
    new replacement('footer', 'Footer')
);
var basicTemplate = new template('basicTemplate',
    "<html><h1><!--STARTwebsiteTitle--><!--websiteTitleEND--></h1><!--STARTpageContent--> <!--pageContentEND--><p><!--STARTfooter--> <!--footerEND--></p></html>",
    rArray2
);

/* Takes template, removes the section from startString to endString
inclusive, replaces this with insertText, and returns the result */
function replaceFoo(template, startString, endString, insertText) {
    var stringArray = template.split(startString);
    if( stringArray.length != 2 ) { alert('DEBUG 1: ' + stringArray); } // DEBUG 1
    var outputString = stringArray[0];
    outputString += startString;
    outputString += insertText;
    outputString += endString;
    var stringArray2 = stringArray[1].split(endString);
    if( stringArray2.length != 2 ) { alert('DEBUG 2'); } // DEBUG 2
    outputString += stringArray2[1];
    return outputString;
}
function templateToHTML(template, tReps) {
    for ( var i=0; i<tReps.length; i++ ) {
        template = replaceFoo(template, tReps[i].startString, tReps[i].endString, document.getElementById(tReps[i].shortName).value);
    }
    return template;
}

function htmltotemplate(html) {
    var template = "";

    // Split html into an array of substrings
    var myArray = splitStringKeepDelimiters(html, fooRegEx);

    // For each substring in the array
    for(var i=0; i<myArray.length; i++) {

        // Check it it's a templatey bit
        if( myArray[i].slice(0,9) == "<!--START" ) {

            // If yes, get the name-thing
            var myMatchArray = myArray[i].match(fooRegEx2);
            var myMatch = myMatchArray[0];
            var myName = myMatch.slice(9,-3);

            // Add the reconstructed string:
            template += "<!--START";
            template += myName;
            template += "--><!--";
            template += myName;
            template += "END-->";
        }
        // It's not a templatey bit - just add it straight in
        else {
            template += myArray[i];
        }
    }
    alert('template: ' + template);
    return template;
}

function htmlToReps(html) {
    var output = new Array();

    // Get array of things like this: <!--STARTsomeName-->Some other stuff<!--someNameEND-->
    var myArray = splitStringKeepDelimiters(html, fooRegEx, "delimitersOnly");

    // For each item in the array
    for(var i=0; i<myArray.length; i++) {

        // Extract someName
        var myMatchArray = myArray[i].match(fooRegEx2);
        var myMatch = myMatchArray[0];
        var someName = myMatch.slice(9,-3);
        output.push(someName);
    }
    return output;
}

function getuserdata() {
    var output = "";
    for ( var i=0; i<replacements.length; i++ ) {
        output += replacements[i].niceName;
        output += ": ";
        output += document.getElementById(replacements[i].shortName).value;
        output += "\n";
    }
    var html = templateToHTML(basicTemplate, replacements);
    alert(html);
}
