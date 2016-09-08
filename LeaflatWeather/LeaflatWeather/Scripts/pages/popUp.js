/// <reference path="../jquery-ui.js" />
/// <reference path="../jquery-1.10.2.js" />
$(document).ready(function () {
    $('#mapContainer').contextmenu(function (e) {
        var offset = $(this).offset();
        var left = e.pageX;
        var top = e.pageY;
        var theHeight = $('#regionInfoPopUp').height();
        $('#regionInfoPopUp').show();
        $('#regionInfoPopUp').css('left', (left + 10) + 'px');
        $('#regionInfoPopUp').css('top', (top - (theHeight / 2) - 10) + 'px');
    });

    $("#popOverHeader span").click(function (e) {
        $('#regionInfoPopUp').effect("fold", 1000);
        //$('#regionInfoPopUp').hide();
        return false;
    });

    $('#regionInfoPopUp').draggable();
    $('#regionInfoPopUp').resizable();
    //$("#mapContainer").resizable();
});
