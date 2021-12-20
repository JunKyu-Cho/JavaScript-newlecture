window.addEventListener("load", function() {
    var btnPrint = document.getElementById("btn-print");

    var add = function(x, y) {
        return x + y;
    }

    btnPrint.onclick = function () {
        var x = prompt("X값 입력", 0);
        var y = prompt("Y값 입력", 0);

        x = parseInt(x);
        y = parseInt(y);

        btnPrint.value = x+y;
    };
});