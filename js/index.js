/*   let Request = "event=update";

document.addEventListener("DOMContentLoaded", () => {
  let numberDay = document.querySelectorAll(".page-nav__day-number");
  let weekDay = document.querySelectorAll(".page-nav__day-week");
  let weekListDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  let today = new Date();
  today.setHours(0, 0, 0);

  numberDay.forEach((dayElem, i) => {
    const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const timestamp = Math.trunc(day / 1000);
    dayElem.innerHTML = `${day.getDate()},`;
    weekDay[i].innerHTML = weekListDay[day.getDay()];
    const link = dayElem.parentNode;
    link.dataset.timeStamp = timestamp;
    link.classList.toggle('page-nav__day_weekend', weekListDay[day.getDay()] === 'Вс' || weekListDay[day.getDay()] === 'Сб');
  });

  getRequest(Request, (response) => {
    let object = {};
    object.seances = response.seances.result; 
    object.films = response.films.result;
    object.halls = response.halls.result;
    object.halls = object.halls.filter(hall => hall.hall_open == 1);

    const main = document.querySelector("main");

    object.films.forEach((film) => {
      const seancesHTML = object.halls.reduce((html, hall) => {
        const seances = object.seances.filter(seance =>
          seance.seance_hallid === hall.hall_id && seance.seance_filmid === film.film_id
        );





        if (seances.length > 0) {
          const seanceItemsHTML = seances.map(seance =>
            `<li class="movie-seances__time-block">
               <a class="movie-seances__time"
                  href="hall.html"
                  data-film-name="${film.film_name}"
                  data-film-id="${film.film_id}"
                  data-hall-id="${hall.hall_id}"
                  data-hall-name="${hall.hall_name}"
                  data-price-vip="${hall.hall_price_vip}"
                  data-price-standart="${hall.hall_price_standart}"
                  data-seance-id="${seance.seance_id}"
                  data-seance-start="${seance.seance_start}"
                  data-seance-time="${seance.seance_time}"
               >
                 ${seance.seance_time}
               </a>
             </li>`
          ).join("");

          return html + `
            <div class="movie-seances__hall">
              <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
              <ul class="movie-seances__list">${seanceItemsHTML}</ul>
            </div>
          `;
        }

        return html;
      }, "");

      if (seancesHTML) {
        const movieHTML = `
          <section class="movie">
            <div class="movie__info">
              <div class="movie__poster">
                <img class="movie__poster-image" alt="${film.film_name} постер" src="${film.film_poster}">
              </div>
              <div class="movie__description">
                <h2 class="movie__title">${film.film_name}</h2>
                <p class="movie__synopsis">${film.film_description}</p>
                <p class="movie__data">
                  <span class="movie__data-duration">${film.film_duration} мин.</span>
                  <span class="movie__data-origin">${film.film_origin}</span>
                </p>
              </div>
            </div>
            ${seancesHTML}
          </section>
        `;

        main.insertAdjacentHTML("beforeend", movieHTML);
      }
    });

    const dayLinks = Array.from(document.querySelectorAll(".page-nav__day"));
    const movieSeances = Array.from(document.querySelectorAll(".movie-seances__time"));

    const updateMovieSeances = (timeStampDay) => {
      const timeStampNow = Math.trunc(Date.now() / 1000);

      movieSeances.forEach((movieSeance) => {
        const timeStampSeanceDay = Number(movieSeance.dataset.seanceStart) * 60;
        const timeStampSeance = timeStampDay + timeStampSeanceDay;
        movieSeance.dataset.seanceTimeStamp = timeStampSeance;

        if (timeStampSeance - timeStampNow > 0) {
          movieSeance.classList.remove("acceptin-button-disabled");
        } else {
          movieSeance.classList.add("acceptin-button-disabled");
        }
      });
    };

    dayLinks.forEach((dayLink) => {
      dayLink.addEventListener("click", (event) => {
        event.preventDefault();

        document.querySelector(".page-nav__day_chosen").classList.remove("page-nav__day_chosen");
        dayLink.classList.add("page-nav__day_chosen");

        let timeStampDay = Number(event.target.dataset.timeStamp);

        if (isNaN(timeStampDay)) {
          timeStampDay = Number(event.target.closest(".page-nav__day").dataset.timeStamp);
        }

        updateMovieSeances(timeStampDay);
      });
    });

    dayLinks[0].click();

    movieSeances.forEach((movieSeance) => {
      movieSeance.addEventListener("click", (event) => {
        const selectSeanse = event.target.dataset;
        selectSeanse.hallConfig = object.halls.find((hall) => hall.hall_id == selectSeanse.hallId).hall_config;
        sessionStorage.setItem("selectSeanse", JSON.stringify(selectSeanse));
      });
    });
  });
});   

 
 */



let Request = "event=update";

document.addEventListener("DOMContentLoaded", () => {
  let numberDay = document.querySelectorAll(".page-nav__day-number");
  let weekDay = document.querySelectorAll(".page-nav__day-week");
  let weekListDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  let today = new Date();
  today.setHours(0, 0, 0);
  for (let i = 0; i < numberDay.length; i++) {
    let day = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
    let timestamp = Math.trunc(day/1000);
    numberDay[i].innerHTML = `${day.getDate()},`;
    weekDay[i].innerHTML = `${weekListDay[day.getDay()]}`;
    let link = numberDay[i].parentNode
    link.dataset.timeStamp = timestamp;
    if ((weekDay[i].innerHTML == 'Вс') || (weekDay[i].innerHTML == 'Сб')) {
      link.classList.add('page-nav__day_weekend');
    } else {
      link.classList.remove('page-nav__day_weekend');
    };
  };

  getRequest(Request, (response) => {
    let object = {};
    object.seances = response.seances.result; 
    object.films = response.films.result;
    object.halls = response.halls.result;
    object.halls = object.halls.filter(hall => hall.hall_open == 1);
    
    let main = document.querySelector("main");

    object.films.forEach((film) => {
      let seancesHTML = '';
      let filmId = film.film_id;
      
      object.halls.forEach((hall) => {
        let seances = object.seances.filter(seance => ((seance.seance_hallid == hall.hall_id) && (seance.seance_filmid == filmId)));
        if (seances.length > 0) {
          seancesHTML += `
            <div class="movie-seances__hall">
              <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
              <ul class="movie-seances__list">`
          seances.forEach(seance => seancesHTML += `<li class="movie-seances__time-block"><a class="movie-seances__time"   href="hall.html" data-film-name="${film.film_name}" data-film-id="${film.film_id}" data-hall-id="${hall.hall_id}" data-hall-name="${hall.hall_name}" data-price-vip="${hall.hall_price_vip}" data-price-standart="${hall.hall_price_standart}" data-seance-id="${seance.seance_id}" 
              data-seance-start="${seance.seance_start}" data-seance-time="${seance.seance_time}">${seance.seance_time}</a></li>`);
          seancesHTML += `
            </ul>
            </div>`
        };
      });

      if (seancesHTML) {
        main.innerHTML += `
          <section class="movie">
            <div class="movie__info">
              <div class="movie__poster">
                <img class="movie__poster-image" alt="${film.film_name} постер" src="${film.film_poster}">
              </div>
              <div class="movie__description">
                <h2 class="movie__title">${film.film_name}</h2>
                <p class="movie__synopsis">${film.film_description}</p>
                <p class="movie__data">
                  <span class="movie__data-duration">${film.film_duration} мин.</span>
                  <span class="movie__data-origin">${film.film_origin}</span>
                </p>
              </div>
            </div>
            ${seancesHTML}
          </section>`
      };
    });

    let dayLinks = Array.from(document.querySelectorAll(".page-nav__day"));
		let movieSeances = Array.from(document.querySelectorAll(".movie-seances__time"));
    
    dayLinks.forEach(dayLink => dayLink.addEventListener('click', (event) => {
      event.preventDefault();
      
      document.querySelector(".page-nav__day_chosen").classList.remove("page-nav__day_chosen");
			dayLink.classList.add("page-nav__day_chosen");
      
      let timeStampDay = Number(event.target.dataset.timeStamp);
      if (isNaN(timeStampDay)) {
        timeStampDay = Number(event.target.closest('.page-nav__day').dataset.timeStamp);
      };

      movieSeances.forEach(movieSeance => {
        let timeStampSeanceDay = Number(movieSeance.dataset.seanceStart) * 60;
        let timeStampSeance = timeStampDay + timeStampSeanceDay;
        let timeStampNow = Math.trunc(+new Date() / 1000);
        movieSeance.dataset.seanceTimeStamp = timeStampSeance;
        if ((timeStampSeance - timeStampNow) > 0) {
          movieSeance.classList.remove('acceptin-button-disabled');
        } else {
          movieSeance.classList.add('acceptin-button-disabled');
        };
      });
    }));
    
    dayLinks[0].click();
    
    movieSeances.forEach(movieSeance => movieSeance.addEventListener('click', (event) => {
      let selectSeanse = event.target.dataset;
      selectSeanse.hallConfig = object.halls.find(hall => hall.hall_id == selectSeanse.hallId).hall_config;
        sessionStorage.setItem('selectSeanse', JSON.stringify(selectSeanse));
    }));
  });
});