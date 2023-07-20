

let selectSeanse = JSON.parse(sessionStorage.selectSeanse);
let request = `event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`;

document.addEventListener("DOMContentLoaded", () => {
  const buttonAcceptin = document.querySelector('.acceptin-button');
  const buyingTitle = document.querySelector('.buying__info-title');
  const buyingStart = document.querySelector('.buying__info-start');
  const buyingHall = document.querySelector('.buying__info-hall');
  const priceStandart = document.querySelector('.price-standart');
  const confStepWrapper = document.querySelector('.conf-step__wrapper');

  buyingTitle.textContent = selectSeanse.filmName;
  buyingStart.textContent = `Начало сеанса ${selectSeanse.seanceTime}`;
  buyingHall.textContent = selectSeanse.hallName;
  priceStandart.textContent = selectSeanse.priceStandart;

  const toggleChairSelection = (event) => {
    const target = event.target;
    if (!target.classList.contains('conf-step__chair') || target.classList.contains('conf-step__chair_taken')) {
      return;
    }
    target.classList.toggle('conf-step__chair_selected');
    const chairsSelected = confStepWrapper.querySelectorAll('.conf-step__chair_selected');
    buttonAcceptin.disabled = chairsSelected.length === 0;
  };

  confStepWrapper.addEventListener('click', toggleChairSelection);

  getRequest(request, (response) => {
    console.log(response);
    if (response) {
      selectSeanse.hallConfig = response;
    }
    confStepWrapper.innerHTML = selectSeanse.hallConfig;
    buttonAcceptin.disabled = true;
    markSelectedPlaces(); // Отметить выбранные места на схеме зала
    disableReservedPlaces(); // Отключить забронированные места
  });

  buttonAcceptin.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedPlaces = [];
    const rows = confStepWrapper.querySelectorAll('.conf-step__row');

    rows.forEach((row, rowIndex) => {
      const chairs = row.querySelectorAll('.conf-step__chair_selected');
      chairs.forEach((chair) => {
        const typePlace = chair.classList.contains("conf-step__chair_standart") ? "standart" : "vip";
        const place = Array.from(chair.parentNode.children).indexOf(chair) + 1;

        selectedPlaces.push({
          row: rowIndex + 1,
          place: place,
          type: typePlace,
        });

        // Отметить выбранное место на схеме зала
        chair.classList.add('conf-step__chair_taken');
      });
    });

    selectSeanse.hallConfig = confStepWrapper.innerHTML;
    selectSeanse.salesPlaces = selectedPlaces;

    sessionStorage.setItem('selectSeanse', JSON.stringify(selectSeanse));

    window.location.href = "payment.html";
  });

  function markSelectedPlaces() {
    const selectedPlaces = selectSeanse.salesPlaces;

    selectedPlaces.forEach((place) => {
      const rowElement = confStepWrapper.querySelector(`.conf-step__row:nth-child(${place.row})`);
      const chairElement = rowElement.querySelector(`.conf-step__chair:nth-child(${place.place})`);
      chairElement.classList.add('conf-step__chair_selected');
    });
  }

  function disableReservedPlaces() {
    const reservedPlaces = selectSeanse.salesPlaces;

    reservedPlaces.forEach((place) => {
      const rowElement = confStepWrapper.querySelector(`.conf-step__row:nth-child(${place.row})`);
      const chairElement = rowElement.querySelector(`.conf-step__chair:nth-child(${place.place})`);
      chairElement.classList.add('conf-step__chair_taken');
      chairElement.classList.remove('conf-step__chair_selected');
      chairElement.classList.remove('conf-step__chair');
    });
  }
});















/* 
let selectSeanse = JSON.parse(sessionStorage.selectSeanse);
let request = `event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`;

document.addEventListener("DOMContentLoaded", () => {
  const buttonAcceptin = document.querySelector('.acceptin-button');
  const buyingTitle = document.querySelector('.buying__info-title');
  const buyingStart = document.querySelector('.buying__info-start');
  const buyingHall = document.querySelector('.buying__info-hall');
  const priceStandart = document.querySelector('.price-standart');
  const confStepWrapper = document.querySelector('.conf-step__wrapper');

  buyingTitle.textContent = selectSeanse.filmName;
  buyingStart.textContent = `Начало сеанса ${selectSeanse.seanceTime}`;
  buyingHall.textContent = selectSeanse.hallName;
  priceStandart.textContent = selectSeanse.priceStandart;

  const toggleChairSelection = (event) => {
    const target = event.target;
    if (!target.classList.contains('conf-step__chair') || target.classList.contains('conf-step__chair_taken')) {
      return;
    }
    target.classList.toggle('conf-step__chair_selected');
    const chairsSelected = confStepWrapper.querySelectorAll('.conf-step__chair_selected');
    buttonAcceptin.disabled = chairsSelected.length === 0;
  };

  confStepWrapper.addEventListener('click', toggleChairSelection);

  getRequest(request, (response) => {
    console.log(response);
    if (response) {
      selectSeanse.hallConfig = response;
    }
    confStepWrapper.innerHTML = selectSeanse.hallConfig;
    buttonAcceptin.disabled = true;
  });

  buttonAcceptin.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedPlaces = [];
    const rows = confStepWrapper.querySelectorAll('.conf-step__row');

    rows.forEach((row, rowIndex) => {
      const chairs = row.querySelectorAll('.conf-step__chair_selected');
      chairs.forEach((chair) => {
        const typePlace = chair.classList.contains("conf-step__chair_standart") ? "standart" : "vip";
        const place = Array.from(chair.parentNode.children).indexOf(chair) + 1;

        selectedPlaces.push({
          row: rowIndex + 1,
          place: place,
          type: typePlace,
        });
      });
    });
   
    selectSeanse.hallConfig = confStepWrapper.innerHTML;
    selectSeanse.salesPlaces = selectedPlaces;

    sessionStorage.setItem('selectSeanse', JSON.stringify(selectSeanse));

    window.location.href = "payment.html";
  });
});
  */



/* let selectSeanse = JSON.parse(sessionStorage.selectSeanse);
let request = `event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`;

document.addEventListener("DOMContentLoaded", () => {
  let buttonAcceptin = document.querySelector('.acceptin-button');
  let buyingTitle = document.querySelector('.buying__info-title');
  let buyingStart = document.querySelector('.buying__info-start');
  let buyingHall = document.querySelector('.buying__info-hall');
  let priceStandart = document.querySelector('.price-standart');
  let confStepWrapper = document.querySelector('.conf-step__wrapper');

  buyingTitle.innerHTML = selectSeanse.filmName;
  buyingStart.innerHTML = `Начало сеанса ${selectSeanse.seanceTime}`;
  buyingHall.innerHTML = selectSeanse.hallName;
  priceStandart.innerHTML = selectSeanse.priceStandart;

  getRequest(request, (response) => {
    console.log(response)
    if (response) {
      selectSeanse.hallConfig = response;
    }
    confStepWrapper.innerHTML = selectSeanse.hallConfig;
    
    let chairs = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair'));
    buttonAcceptin.setAttribute("disabled", true);
    
    chairs.forEach((chair) => {
      chair.addEventListener('click', (event) => {
        if (event.target.classList.contains('conf-step__chair_taken')) {
          return;
        };
        event.target.classList.toggle('conf-step__chair_selected');
        let chairsSelected = Array.from(document.querySelectorAll('.conf-step__row .conf-step__chair_selected'));
        if (chairsSelected.length > 0) {
          buttonAcceptin.removeAttribute("disabled");
        } else {
          buttonAcceptin.setAttribute("disabled", true);
        };
      });
    });
  });
  
  buttonAcceptin.addEventListener("click", (event) => {
    event.preventDefault();
    
    let selectedPlaces = Array();
    let rows = Array.from(document.getElementsByClassName("conf-step__row"));
    
    for (let i = 0; i < rows.length; i++) {
      let spanPlaces = Array.from(rows[i].getElementsByClassName("conf-step__chair"));
      for (let j = 0; j < spanPlaces.length; j++) {
        if (spanPlaces[j].classList.contains("conf-step__chair_selected")) {
          let typePlace = (spanPlaces[j].classList.contains("conf-step__chair_standart")) ? "standart" : "vip";
          selectedPlaces.push({
            "row": i+1,
            "place": j+1,
            "type":  typePlace,
          });
        };
      };
    };
    
    let configurationHall = document.querySelector('.conf-step__wrapper').innerHTML;
    selectSeanse.hallConfig = configurationHall;
    selectSeanse.salesPlaces = selectedPlaces;
    
    sessionStorage.setItem('selectSeanse', JSON.stringify(selectSeanse));
    
    window.location.href = "payment.html";
  });
});
 */