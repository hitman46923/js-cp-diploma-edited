

  let selectSeanse = JSON.parse(sessionStorage.selectSeanse);
let places = selectSeanse.salesPlaces.map(salePlace => `${salePlace.row}/${salePlace.place}`).join(", ");
let price = 0;



selectSeanse.salesPlaces.forEach(salePlace => {
  if (salePlace.type === "standart") {
    price += Number(selectSeanse.priceStandart);
  } else if (salePlace.type === "vip") {
    price += Number(selectSeanse.priceVip);
  }
});



let ticketElement = document.querySelector(".ticket");
ticketElement.querySelector(".ticket__title").innerHTML = selectSeanse.filmName;
ticketElement.querySelector(".ticket__chairs").innerHTML = places;
ticketElement.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;
ticketElement.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime;
ticketElement.querySelector(".ticket__cost").innerHTML = price;

let newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");
console.log(newHallConfig);

document.querySelector(".acceptin-button").addEventListener("click", (event) => {
    event.preventDefault();
    let request = `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`;
    
    request(request, () => {
      window.location.href = 'ticket.html';
    });
});



/*  let selectSeanse = JSON.parse(sessionStorage.selectSeanse);
let places = selectSeanse.salesPlaces.map(salePlace => `${salePlace.row}/${salePlace.place}`).join(", ");
let price = 0;

selectSeanse.salesPlaces.forEach(salePlace => {
    if (places) {
        places += ", ";
    }
    places += `${salePlace.row}/ ${salePlace.place}`;
    price += salePlace.type === "standart" ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip);

});

let ticketElement = document.querySelector(".ticket");
ticketElement.querySelector(".ticket__title").innerHTML = selectSeanse.filmName;
ticketElement.querySelector(".ticket__chairs").innerHTML = places;
ticketElement.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;
ticketElement.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime;
ticketElement.querySelector(".ticket__cost").innerHTML = price;

let newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");
console.log(newHallConfig);

document.querySelector("acceptin-button").addEventListener("click", (event) => {
    event.preventDefault();
    let request = `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`;
    
    request(request, () => {
      window.location.href = 'ticket.html';
    });
  }); 

 
 */
