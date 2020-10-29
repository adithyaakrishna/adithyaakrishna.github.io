$(function() {
    var srcText = $("#typed").text();
    var i = 0;
    var result = srcText[i];
    setInterval(function() {
            if(i == srcText.length) {
                clearInterval(this);
                return;
            };
            i++;
            result += srcText[i].replace("\n", "<br />");
            $("#typed").html(result);
    },
    60); // the period between every character and next one, in milliseonds.
});
