function splitStringKeepDelimiters(myString, delimiter, option) {

    var delimiters = new Array();
    var subStrings = new Array();
    var output = new Array();

    // Check if it starts with a delimiter
    if( myString.search(delimiter) == 0 ) {
        var dArray = myString.match(delimiter);
        var delimiter1 = dArray[0];
        delimiters.push(delimiter1);
        output.push(delimiter1);
        if (myString.length > delimiter1.length) {
            myString = myString.slice(delimiter1.length);
        }
        else { alert('um, something went wrong'); }
    }

    // Chew away at the string till it's gone
    while (1==1) {
        var word1 = myString.split(delimiter,1)[0];
        subStrings.push(word1);
        output.push(word1);
        if (myString.length > word1.length) {
            myString = myString.slice(word1.length);
        }
        else { break; }

        var dArray = myString.match(delimiter);
        var delimiter1 = dArray[0];
        delimiters.push(delimiter1);
        output.push(delimiter1);
        if (myString.length > delimiter1.length) {
            myString = myString.slice(delimiter1.length);
        }
        else { break; }
    }
    if( option == "delimitersOnly" ) {
        return delimiters;
    }
    else if ( option == "subStringsOnly" ) {
        return subStrings;
    }
    else {
        return output;
    }
}
/*
USAGE EXAMPLE
var sillyString = "FOOSilly FOO rabbit FOO Trix FOO are forFOO  kids!";
var foo = splitStringKeepDelimiters(sillyString, "FOO");
alert('foo: ' + foo);
*/
