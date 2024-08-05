const API_KEY = "168771779c71f3d64106d8a88376808a";

function renderWeatherInfo(data) {
  let newPara = document.createElement("p");
  newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
  document.body.appendChild(newPara);
}

async function fetchWeatherDetails() {
  try {
    let city = "goa";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    console.log("Weather data:-", data);

    renderWeatherInfo(data);
  } catch (err) {
    //handle the error here
    console.log(err);
  }
}

async function getCustomWeatherDetails() {
  try {
    let latitude = 15.633;
    let longitude = 18.3333;

    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    let data = await result.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
