window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js');
    }
  }


var arrayItems = [
    {"image": "mojito.jpg", "name": "Mojito" },
    {"image": "whickycoca.jpg", "name": "Whisky Coca" },
    {"image": "ricard.jpg", "name": "Ricard" }
]
arrayItems.forEach(element => {
    $(".grid").append(`
    <div class="item-grid">
        <img src="images/${element.image}" />
        <span class="subText centered"> ${element.name} </span> 
    </div>`)
});
