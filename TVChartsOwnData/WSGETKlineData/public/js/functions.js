// submit button
var storedItem = localStorage.getItem("storedItem");

function save() {
    var item = document.getElementById('input').value;
    localStorage.setItem('storedItem', item);
    document.getElementById('savedTest').innerHTML = item + " SAVED";
}

function get() {
    localStorage.getItem('storedItem');
    document.getElementById('openedText').innerHTML = storedItem  + " OPENED";

}