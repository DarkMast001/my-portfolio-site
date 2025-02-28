const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/hotels-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// Создаем схему и модель для коллекции 'hotels'
const hotelSchema = new mongoose.Schema({
	web: String,
  	name: String,
  	description: String,
  	number: String,
  	mail: String,
  	vk: String,
  	region: String,
  	city: String,
  	adress: String,
    rating: Number
});

const Hotel = mongoose.model('Hotel', hotelSchema);

// Путь к файлу с данными (модифицированный путь, если скрипт и JSON в одной папке)
const jsonFilePath = path.join(__dirname, 'db-hotels.json');

// Чтение данных из JSON файла
fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading JSON file', err);
    return;
  }

  try {
    // Преобразуем строку JSON в массив объектов
    const hotels = JSON.parse(data);

    // Вставка данных в MongoDB (коллекция 'hotels')
    const result = await Hotel.insertMany(hotels);
    console.log(`${result.length} hotels were successfully inserted into MongoDB.`);
  } catch (err) {
    console.error('Error parsing or inserting data:', err);
  } finally {
    mongoose.connection.close(); // Закрыть подключение к базе данных
  }
});
