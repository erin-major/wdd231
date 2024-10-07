const weatherSection = document.querySelector('.weather');
const forecastSection = document.querySelector('.forecast');

const lat = 36.173124848645244;
const lon = -115.13655699596647;
const apiKey = 'e4745822e1d8fb82087c4494c8088642';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function apiCurrentFetch(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            data = await response.json();           
            displayCurrentWeather(data);            
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
}

async function apiForecastFetch(url) {    
    try {
        const response = await fetch(url);
        if (response.ok) {
            data = await response.json();           
            displayForecast(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch(e) {
        console.log(e);
    }
}

function displayCurrentWeather(data) {

    let weatherIcon = document.createElement('img');
    let currentTemp = document.createElement('div');

    weatherIcon.id = "weather-icon";
    currentTemp.id = "current-temp";

    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg; F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    let displayDesc = document.createElement('span');
    displayDesc.classList.add('current-weather-desc');
    displayDesc.textContent = desc;

    let weatherDetails = document.createElement('span');
    weatherDetails.classList.add('current-weather-details');

    let sunriseDate = new Date(data.sys.sunrise * 1000);    
    let sunsetDate = new Date(data.sys.sunset * 1000);
    
    weatherDetails.innerHTML = `
        High: ${Math.round(data.main.temp_max)}&deg; F
        <br>
        Low: ${Math.round(data.main.temp_min)}&deg; F
        <br>
        Humidity: ${Math.round(data.main.humidity)}
        <br>
        Sunrise: ${sunriseDate.toLocaleTimeString( 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
        <br>
        Sunset: ${sunsetDate.toLocaleTimeString( 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
    `;

    weatherSection.appendChild(weatherIcon);
    weatherSection.appendChild(currentTemp);

    weatherSection.appendChild(displayDesc);
    weatherSection.appendChild(weatherDetails);
}

function displayForecast(data) {     
    let tomorrowWeekday = new Date(data.list[1].dt * 1000).toLocaleString('en-us', {weekday: 'long'});
    let thirdDayWeekday = new Date(data.list[2].dt * 1000).toLocaleString('en-us', {weekday: 'long'});

    let today = document.createElement('span');
    today.classList.add('today');
    let tomorrow = document.createElement('span');
    tomorrow.classList.add('tomorrow');
    let thirdDay = document.createElement('span');
    thirdDay.classList.add('thirdDay');

    today.innerHTML = `Today: ${Math.round(data.list[0].main.temp)}&deg; F`;
    tomorrow.innerHTML = `${tomorrowWeekday}: ${Math.round(data.list[1].main.temp)}&deg; F`;
    thirdDay.innerHTML = `${thirdDayWeekday}: ${Math.round(data.list[2].main.temp)}&deg; F`;

    forecastSection.appendChild(today);
    forecastSection.appendChild(tomorrow);
    forecastSection.appendChild(thirdDay);
}

apiCurrentFetch(currentWeatherUrl);
apiForecastFetch(forecastWeatherUrl);


