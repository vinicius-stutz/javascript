// The Easiest Way to Parse URLs with JavaScript
// https://tutorialzine.com/2013/07/quick-tip-parse-urls

$(function(){

    // The URL we want to parse
    var url = 'https://www.test.com/2018/12/nonono-nonon-no/?key=value#comments';

    // The magic: create a new anchor element, and set the URL as its href attribute.
    // Notice that I am accessing the DOM element inside the jQuery object with [0]:
    var a = $('<a>', { href:url } )[0];

    $('#host').val(a.hostname);
    $('#path').val(a.pathname);
    $('#query').val(a.search);
    $('#hash').val(a.hash);

    // Even more:
    // a.port, a.protocol,
    // a.origin (not available in older IE versions)

});
