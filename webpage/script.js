window.onload = () => {
    'use strict';
  if ('serviceWorker' in navigator) {
      console.log("Start worker")
      navigator.serviceWorker.register('sw.js');
  }
}
console.log("Start")
var arrayItems = [
    {"image": "mojito.jpg", "name": "Mojito", "id": "1" },
    {"image": "whickycoca.jpg", "name": "Whisky Coca", "id": "2"},
    {"image": "ricard.jpg", "name": "Ricard", "id": "3" },
    {"image": "mojito.jpg", "name": "Mojito", "id": "4" },
    {"image": "whickycoca.jpg", "name": "Whisky Coca", "id": "5"},
    {"image": "ricard.jpg", "name": "Ricard", "id": "6" },
    {"image": "mojito.jpg", "name": "Mojito", "id": "7" },
    {"image": "whickycoca.jpg", "name": "Whisky Coca", "id": "8"},
    {"image": "ricard.jpg", "name": "Ricard", "id": "9" }
]
//Sort the array
arrayItems.sort(function(a, b) {
  var textA = a.name.toUpperCase();
  var textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});


arrayItems.forEach(element => {
    $(".grid").append(`
    
      <div class="item-grid" id="${element.id}">
          <img src="images/${element.image}" />
          <span class="subText centered"> ${element.name} </span> 
      </div>
    `)
});

var URLRequest = "192.168.1.1:80";

$(".item-grid").click(function(){
  console.log("send Request")
  var cocktailName = $(this).attr('id');
  sendRequest(cocktailName)
});

$("#setIP").click(function(){
  console.log("SET IP");
  var name = prompt("Please enter IP");
  if (name != null){
    URLRequest = name
  }
});


$("#ping").click(function(){
  console.log("ping");
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.responseText)
    };
    var adress = "http://" + URLRequest;
    alert(adress)
    xhttp.open("GET", adress, true);
    xhttp.send();


    $.get( "192.168.1.1:80", function( data ) {
      alert( "Load was performed." );
    });
});


/*https://stackoverflow.com/questions/61293702/async-webserver-how-to-create-server-on-with-a-variable-as-route*/
function sendRequest(cocktailName){
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.responseText)
    };
    var adress = "http://" + URLRequest + "/cocktail?cocktailName=" + cocktailName;
    alert(adress)
    xhttp.open("GET", adress, true);
    xhttp.send();
}
