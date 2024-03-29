/*
*************************************** GLOBAL VARS AND GENERAL CONVENIENCE FUNCTIONS *******************
*/

function slugify(text) {
	text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
	text = text.replace(/-/gi, "_");
	text = text.replace(/\s/gi, "-");
	return text.toLowerCase();
}
function removeItemFromArray(array, index) {
    var maxfoo = array.length - 1;
    for( var i=index; i<maxfoo; i++ ) {
        array[i] = array[i+1];
    }
    array.pop();
    return array;
}
/* Takes template, removes the section from startString to endString' +  
inclusive, replaces this with insertText, and returns the result */
function replaceFoo(template, startString, endString, insertText) {
    var stringArray = template.split(startString);
    if( stringArray.length == 2 ) { 
        var outputString = stringArray[0];
        outputString += startString;
        outputString += insertText;
        outputString += endString;
        var stringArray2 = stringArray[1].split(endString);
        if( stringArray2.length != 2 ) { alert('DEBUG 2'); } // DEBUG 2
        outputString += stringArray2[1];
        return outputString;
    }
    else {
        return template;
    }
}
/* Function getElementsByClassName(node,classname) by Dustin Diaz, found here: 
http://stackoverflow.com/questions/1933602/
how-to-getelementbyclass-instead-of-getelementbyid-with-javascript*/
function getElementsByClassName(node, classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}

/*
***************************************** MODEL CLASSES ***********************************************
*/

// Class 'replacement' definition
function Replacement(shortName, niceName, content, inputType, repType) {

    this.shortName = shortName;
    this.niceName = niceName;
    this.content = content;
    this.inputType = inputType;     // 'text' or 'color' or 'textarea'
    this.repType = repType;         // 'rep' or 'css' or 'page'

    this.startString = "<!--START" + shortName + "-->";
    this.endString = "<!--" + shortName + "END-->";

    if (this.repType == "css") {
        this.startString = "/*START" + shortName + "*/";
        this.endString = "/*" + shortName + "END*/";
    }

    this.toString = function () {
      return 'replacement object: ' + this.niceName;
    };

    this.getSetContent = function(text) {
        var myArray = text.split(this.startString);
        var myString = myArray[1];
        var myArray2 = myString.split(this.endString);
        this.content = myArray2[0];
        return this.content;
    }

    this.userInputHTML = function () {
        var html = "<p>" + this.niceName + ":<input type='text' class='text userInput' value='" + this.content + "' id='" + this.shortName + "'></p>";
        if (this.inputType=='color') {
            html = "<p>" + this.niceName + ":<input type='text' class='color userInput'  value='" + this.content + "' id='" + this.shortName + "'></p>";
        }
        if (this.inputType=='textarea') {
            html = "<p>" + this.niceName + ":<textarea class='userInput' id='" + this.shortName + "'>" + this.content + "</textarea></p>";
        }
        return html;
    };
}

// Class 'page' definition - both arguments are integers
function PageRep(menu, menuRank, title, content) {
    this.menu = menu;
    this.menuRank = menuRank;
    this.title = title;
    this.content = content;
    this.slug = slugify(title);           // Check that this is unique! And lower case
    this.pageLabel = "page" + menu + "_" + menuRank;

    this.toString = function () {
        return 'Page object: ' + this.title;
    };
}

// For a whole website
function SiteTemplate(templateName, html, maxMenus, defaultSiteReplacements, defaultPageReplacements, desc) {
    this.templateName = templateName;
    this.html = html;
    this.maxMenus = maxMenus;   // Number of menus: 1,2,3...
    this.siteReps = defaultSiteReplacements;
    this.pageReps = defaultPageReplacements;
    this.desc = desc;

    this.toString = function () {
      return 'SiteTemplate object: ' + this.templateName;
    };

    // FOR NOW ASSUME JUST ONE MENU
    this.makeMenu = function () {
        var menu = "<div class='menu' id='menu1'> <ul>";
        for (var i=0; i<this.pageReps.length; i++) {
            var addOn = "<li><a href='" + this.pageReps[i].slug + "'>" + this.pageReps[i].title + "</a></li>";
            menu += addOn;
        }
        menu += "</ul></div>";
        return menu;
    };

   this.pageOut = function(pageNum) {        
        var htmlOut = replaceFoo(this.html, "<!--STARTmenu0-->", "<!--menu0END-->", this.makeMenu());
        for (var i=0; i<this.siteReps.length; i++) {
            htmlOut = replaceFoo(htmlOut, this.siteReps[i].startString, this.siteReps[i].endString, this.siteReps[i].content);
        }
        return htmlOut;
    };
}

