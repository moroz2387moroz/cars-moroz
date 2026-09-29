const carSelect = document.querySelector('#car-select');
const statusMessage = document.querySelector('#status');
const carInfo = document.querySelector('#car-info');
const carName = document.querySelector('#car-name');
const carPrice = document.querySelector('#car-price');
let cars = [];

async function loadCars() {
	try {
		const response = await fetch('cars.json');

		if (!response.ok) {
			throw new Error(`Ошибка загрузки: ${response.status}`);
		}

		const data = await response.json();
		cars = data.cars;

		if (!Array.isArray(cars) || cars.length === 0) {
			throw new Error('Список автомобилей пуст.');
		}

		carSelect.replaceChildren(new Option('Выберите авто', ''));
		cars.forEach((car, index) => {
			const option = new Option(car.brand, String(index));
			carSelect.add(option);
		});

		carSelect.disabled = false;
		statusMessage.textContent = '';
		statusMessage.classList.remove('status--error');
	} catch {
		carSelect.disabled = true;
		statusMessage.textContent = 'Не удалось загрузить автомобили. Проверьте подключение и попробуйте позже.';
		statusMessage.classList.add('status--error');
	}
}

loadCars();

carSelect.addEventListener('change', () => {
	const car = cars[+carSelect.value];

	if (!car) {
		carInfo.hidden = true;
		carSelect.disabled = true;
		statusMessage.textContent = 'Не удалось найти выбранный автомобиль.';
		statusMessage.classList.add('status--error');
		return;
	}

	carName.textContent = `Авто: ${car.brand} ${car.model}`;
	carPrice.textContent = `Цена: ${car.price} $`;
	carInfo.hidden = false;
	statusMessage.textContent = '';
	statusMessage.classList.remove('status--error');
});
