var fooRegEx = /<!--START[\s\S]*?END-->/gm;
var fooRegEx2 = /<!--START[\s\S]*?-->/gm;

// Class 'replacement' definition
function replacement(shortName, niceName) {
    this.shortName = shortName;
    this.niceName = niceName;
    this.startString = "<!--START" + shortName + "-->";
    this.endString = "<!--" + shortName + "END-->";

    this.toString = function () {
      return 'replacement object: ' + this.niceName;
    };
    this.userInputHTML = function () {
        var html = "<p>" + this.niceName + ":<input type='text' id='" + this.shortName + "' name='" + this.shortName + "'></p>";
        return html;
    };
}

// Class 'page' definition - both arguments are integers
function page(menu, menuRank) {
    this.menu = menu;
    this.menuRank = menuRank;

    // Page title
    var pageTitleShortName = "page" + menu + "_" + menuRank;
    var pageTitleNiceName = "page " + menuRank + " of menu " + menu;
    this.pageTitle = new replacement(pageTitleShortName, pageTitleNiceName);

    // Page content
    var pageContentShortName = "page" + menu + "_" + menuRank;
    var pageContentNiceName = "page " + menuRank + " of menu " + menu + " content";
    this.pageContent = new replacement(pageContentShortName, pageContentNiceName);

    this.toString = function () {
      return 'page object: ' + this.pageTitle.niceName;
    };
    this.userInputHTML = function () {
        var html = "";
        html += this.pageTitle.userInputHTML();
        html += this.pageContent.userInputHTML();
        html += "<p>This page belongs to menu: " + this.menu + " and has rank: " + this.menuRank + ".</p>
        html += "<input type='submit' value='Create another page'
        return html;
    };

}

// Class 'template' definition
function template(templateName, html, replacementsArray, pagesArray, maxMenus) {
    this.templateName = templateName;
    this.html = html;
    this.replacements = [];   // Array of replacement objects
    this.replacements = replacementsArray;
    this.maxMenus = maxMenus;   // Number of menus: 1,2,3...

    this.toString = function () {
      return 'template object: ' + this.templateName;
    };
}



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
