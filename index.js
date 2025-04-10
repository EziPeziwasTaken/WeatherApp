
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "833a93fd44a559ba791d288ed0bcc422";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Prosím zadej město");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Neúspěšný fetch dat");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
    const { name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weaterEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    cityDisplay.classList.add("tempDisplay");
    
    humidityDisplay.textContent = "Vlhkost: "+humidity+"%";
    humidityDisplay.classList.add("humidityDisplay");
    
    descDisplay.textContent = descTranslate(description);
    console.log(descDisplay);
    descDisplay.classList.add("descDisplay");

    weaterEmoji.textContent = getWeatherEmoji(id);
    weaterEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weaterEmoji);
}
function descTranslate(description){
    var langMap = {
        "thunderstorm with light rain" : "bouřka se slabým deštěm",
        "thunderstorm with rain" : "bouřka s deštěm",
        "thunderstorm with heavy rain" : "bouřka se silným deštěm",
        "light thunderstorm" : "lehká bouřka",
        "thunderstorm" : "bouřka",
        "heavy thunderstorm" : "silná bouřka",
        "ragged thunderstorm" : "rozbouřená bouřka",
        "thunderstorm with light drizzle" : "bouřka se slabým mrholením",
        "thunderstorm with drizzle" : "bouřka s mrholením",
        "thunderstorm with heavy drizzle" : "bouřka se silným mrholením",
        "light intensity drizzle" : "intenzita světla mrholení",
        "drizzle" : "mrholení",
        "heavy intensity drizzle" : "silné intenzivní mrholení",
        "light intensity drizzle rain" : "intenzita světla mrholení déšť",
        "drizzle rain" : "mrholení déšť",
        "heavy intensity drizzle rain" : "silný intenzivní mrholení",
        "shower rain and drizzle" : "déšť a mrholení",
        "heavy shower rain and drizzle" : "vydatná přeháňka, déšť a mrholení",
        "shower drizzle" : "sprcha mrholení",
        "light rain" : "slabý déšť",
        "moderate rain" : "mírný déšť",
        "heavy intensity rain" : "silný intenzivní déšť",
        "very heavy rain" : "velmi silný déšť",
        "extreme rain" : "extrémní déšť",
        "freezing rain" : "mrazivý déšť",
        "light intensity shower rain" : "lehká intenzita sprchového deště",
        "shower rain" : "sprchový déšť",
        "heavy intensity shower rain" : "silný sprchový déšť",
        "ragged shower rain" : "prudký sprchový déšť",
        "light snow" : "slabé sněžení",
        "snow" : "sněžení",
        "heavy snow" : "těžký sníh",
        "sleet" : "plískanice",
        "light shower sleet" : "lehké sprchové plískanice",
        "shower sleet" : "sprchové plískanice",
        "light rain and snow" : "slabý déšť a sníh",
        "rain and snow" : "déšť a sníh",
        "light shower snow" : "slabé sněžení",
        "shower snow" : "sprchový sníh",
        "heavy shower snow" : "vydatná sněhová přeháňka",
        "mist" : "mlha",
        "smoke" : "mlha",
        "haze" : "mlha",
        "sand/dust whirls" : "pískové/prachové víry",
        "fog" : "mlha",
        "sand" : "písek",
        "dust" : "prach",
        "volcanic ash" : "sopečný popel",
        "squalls" : "bouře",
        "tornado" : "tornádo",
        "clear sky" : "jasná obloha",
        "few clouds: 11-25%" : "málo oblačnosti: 11-25 %",
        "scattered clouds: 25-50%" : "rozptýlená oblačnost: 25-50 %",
        "broken clouds: 51-84%" : "oblačnost: 51-84 %",
        "overcast clouds: 85-100%" : "zataženo: 85-100 %"
    }
    
    return langMap[description];
  }
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";  
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; 
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️"; 
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";   
        case (weatherId === 800):
            return "☀️";
        case (weatherId > 800 && weatherId < 810):
            return "☁️";  
        default:
            return "?"    
    }

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}