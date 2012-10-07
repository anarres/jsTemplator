// Get all the juicy metadata
function getData(text) {
    var foo1 = text.split("<!--STARTjsTemplatorData");
    var foo2 = foo1[1].split("jsTemplatorDataEND-->");
    return foo2[0];
}

