const searchButton = document.getElementById('btnFind');
const inputField = document.getElementById('inputPlace');

const seoText = document.getElementById('seoText');
const mainPart = document.getElementById('mainPart');
const notFoundDialog = document.getElementById('notFoundDialog');

const btnFilter = document.getElementById('btnFilter');
const filterPopup = document.getElementById('filterPopup');
const radioButtons = document.querySelectorAll('input[name="searchFilter"]');

let filterType = 'region';

function hideAllSections() {
	seoText.style.display = 'none';
	mainPart.style.display = 'none';
	notFoundDialog.style.display = 'none';
}

function showSection(sectionId) {
	hideAllSections();
	const section = document.getElementById(sectionId);
	if (section) {
		section.style.display = 'flex';
	}
}

async function searchResponse(search, filter, minRating = 0, bestFirst) {
	try {
		if (filter == 'region') {
			var response = await fetch(`http://localhost:3000/searchByRegion?region=${encodeURIComponent(search)}&rating=${minRating}&bestFirst=${bestFirst}`);
		}
		else if (filter == 'city') {
			var response = await fetch(`http://localhost:3000/searchByCity?city=${encodeURIComponent(search)}&rating=${minRating}&bestFirst=${bestFirst}`);
		}
	
		// Проверка успешности запроса
		if (!response.ok) {
		  throw new Error('Ошибка при выполнении запроса');
		}

		const hotels = await response.json();
	
		if (hotels.length > 0) {
		  showSection('mainPart');
		  renderHotels(hotels);
	  } else {
		  showSection('notFoundDialog')
	  }
  } catch (error) {
	  console.error('Ошибка при поиске отелей:', error);
	  showSection('notFoundDialog');
  }
}

function renderHotels(hotels) {
	mainPart.innerHTML = '';

	const divHotelForYou = document.createElement('div');
	divHotelForYou.className = "hotels_for_you";
	mainPart.appendChild(divHotelForYou);

	const p1 = document.createElement('p');
	p1.textContent = "Отели для вас";
	divHotelForYou.appendChild(p1);

	hotels.forEach(hotel => {
		const foundHotelSection = document.createElement('section');
		foundHotelSection.className = "found_hotel_section";

		foundHotelSection.innerHTML = `
			<p class="hotel_name">${hotel.name} ★${hotel.rating}</p>
			<p class="hotel_addres">${hotel.adress}</p>
			<a href="https://${hotel.web}" target="_blank"><p>Ссылка на сайт</p></a>
			<p class="hotel_description">${hotel.description}</p>
		`;

		mainPart.appendChild(foundHotelSection);
	});
}

btnFilter.addEventListener('click', (event) => {
	event.preventDefault(); // Чтобы не было перехода по ссылке или перезагрузки
	filterPopup.classList.toggle('active'); // Включаем/выключаем видимость фильтров
});

document.addEventListener('click', (event) => {
	if (!btnFilter.contains(event.target) && !filterPopup.contains(event.target)) {
		filterPopup.classList.remove('active');
	}
});

radioButtons.forEach(radio => {
	radio.addEventListener('change', (event) => {
	  	filterType = event.target.value;
	});
});

function searchCondition(searchStr){
	const minRating = document.getElementById("ratingFilter").value;
	const bestFirst = document.getElementById("bestFirstCheckbox").checked;
	if (searchStr) {
		searchResponse(searchStr, filterType, minRating, bestFirst);
	} else {
	  	console.log('Введите регион для поиска');
	}
}

searchButton.addEventListener('click', () => {
	const searchStr = inputField.value.trim(); // Получаем значение из поля ввода и удаляем лишние пробелы
  
	searchCondition(searchStr);
});

inputField.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		const searchStr = inputField.value.trim();

        searchCondition(searchStr);
	}
});

showSection('seoText');