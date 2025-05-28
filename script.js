const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const apiKey = '358da2a1ecc2d99405e15dc5f71bcba7';
const weatherInfo = document.querySelector('.weather-info');
const searchCityMessage = document.querySelector('.search-city');
const notFoundMessage = document.querySelector('.not-found');

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function updateWeatherInfo(city) {
    getFetchData('weather', city).then(data => {
        if (data) {
            const temp = data.main.temp; // Current temperature
            const feelsLike = data.main.feels_like; // Perceived temperature
            const weatherCondition = data.weather[0].main; // Main weather condition
            const updateTime = new Date(data.dt * 1000).toLocaleTimeString(); // Update time

            // Update the DOM elements with fetched data
            document.querySelector('.temp-txt').textContent = `${temp}°C`;
            document.querySelector('.feels-like-txt').textContent = `Feels like: ${feelsLike}°C`;
            document.querySelector('.condition-txt').textContent = weatherCondition;
            document.querySelector('.update-time-txt').textContent = `Last updated: ${updateTime}`;
            document.querySelector('.humidity-value-txt').textContent = `${data.main.humidity}%`;
            document.querySelector('.wind-value-txt').textContent = `${data.wind.speed} M/s`;
            document.querySelector('.country-txt').textContent = `${data.name}, ${data.sys.country}`;

            // Show weather information and hide messages
            weatherInfo.style.display = 'block';
            searchCityMessage.style.display = 'none';
            notFoundMessage.style.display = 'none';
        }
    }).catch(() => {
        // Show not found message
        weatherInfo.style.display = 'none';
        searchCityMessage.style.display = 'none';
        notFoundMessage.style.display = 'block';
    });
}
