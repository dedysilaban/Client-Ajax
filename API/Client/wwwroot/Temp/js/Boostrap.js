let ubah = document.getElementById("a");
ubah.addEventListener("mouseleave", function () {
    ubah.style.backgroundColor = "brown"
});
ubah.addEventListener("mouseenter", function () {
    ubah.style.backgroundColor = "cyan"
});
$(document).ready(function () {
    $("button#a").click(function () {
        $("#a").css({ "font-size": "150%" });
    });
});
document.getElementById("myBtn").addEventListener("click", myFunction);
function myFunction() {
    alert("https://www.w3schools.com/bootstrap4/default.asp");
}
$(document).ready(function () {
    $(".btn-success").click(function () {
        $(this).css("background-color", "black");
    });
});
