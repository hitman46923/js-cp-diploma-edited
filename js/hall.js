
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
