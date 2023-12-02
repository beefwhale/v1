// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block"
    document.getElementById("myOverlay").style.display = "block"
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none"
    document.getElementById("myOverlay").style.display = "none"
}
function backtoTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}

