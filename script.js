const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //HW - show an alert for no gelolocation support available
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}


// const userTab=document.querySelector("[data-userWeather]");
// const searchTab=document.querySelector("[data-searchWeather]");
// const userContainer=document.querySelector(".weather-container");
// const grantAccessContainer=document.querySelector(".grant-locaton-container");
// const searchForm=document.querySelector("[data-searchForm]");
// const loadingScreen=document.querySelector(".loading-container");
// const userInfoContainer=document.querySelector(".user-info-container");

// //initially variable need??

// let oldTab=userTab;
// oldTab.classList.add("current-tab");
// const API_KEY = "168771779c71f3d64106d8a88376808a";
// getformSessionStorage();



// function switchTab(newTab){
//   if(newTab!=oldTab){
//     oldTab.classList.remove("current-tab");
//     oldTab=newTab;
//     oldTab.classList.add("current-tab");

//     if(!searchForm.classList.contains("active")){
//       //kya search form wala container is invisible , if yes then make it visible
//       userInfoContainer.classList.remove("active");
//       grantAccessContainer.classList.remove("active");
//       searchForm.classList.add("active");
//     }else{
//       //main pehele search wale tab pr tha, ab your weather tab visible karna h
//       searchForm.classList.remove("active");
//       userInfoContainer.classList.remove("active");
//       //ab main your weather tab me aagya hu, toh weather bhi k=display karna padega , so lets check local storeage first
//       //for coordinaion , if we have saved them there.
//       getformSessionStorage();
      
//     }
//   }
  
// }

// userTab.addEventListener("click",()=>{
//   //pass clicked as an input parameter
//   switchTab(userTab);
// });


// searchTab.addEventListener("click",()=>{
//   //pass clicked tab as input parameter
//   switchTab(searchTab);
// });

// //check if coordinates are already present in session storage
// function getformSessionStorage(){
//   const localCoordinates=sessionStorage.getItem("user-coordinates");
//   if(!localCoordinates){
//     //agar local coordinates nahi mile
//     grantAccessContainer.classList.add("active");
//   }else{
//     const coordinates=JSON.parse(localCoordinates);
//     fetchUserWeatherInfo(coordinates);
//   }
// }

// async function fetchUserWeatherInfo(coordinates){
//   const {lat,lon} =coordinates;
//   //make grantcontainer invisible
//   grantAccessContainer.classList.remove("active");
//   //make loader visible
//   loadingScreen.classList.add("active");

//   //API call
//   try{
//     let response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//     );
//     const data=response.json();
//     loadingScreen.classList.remove("active");
//     userInfoContainer.classList.add("active");
//     renderWeatherInfo(data);
//   }
//   catch(err){
//     loadingScreen.classList.remove("active");
//     console.log(err);
//   }
// }

// function renderWeatherInfo(weatherInfo){
//   //firstly, we have to fetch the elements

//   const cityName=document.querySelector("[data-cityName]");
//   const countryIcon=document.querySelector("[data-countryIcon]");
//   const desc=document.querySelector("[data-weatherDesc]");
//   const weatherIcon=document.querySelector("[data-weatherIcon]");
//   const tamp=document.querySelector("[data-temperature]");
//   const windspeed=document.querySelector("[data-windspeed]");
//   const humidity=document.querySelector("[data-humidity]");
//   const cloudiness=document.querySelector("[data-clodiness]");

//   //fetch value from weatherInfo object and put it UI elements
//   cityName.innerText=weatherInfo?.name;
//   countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//   desc.innerText=weatherInfo?.weather?.[0]?.description;
//   weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0].icon}.png`;
//   temp.innerText=weatherInfo?.main?.temp;
//   windspeed.innerText=weatherInfo?.wind?.speed;
//   humidity.innerText=weatherInfo?.main?.humidity;
//   cloudiness.innerText=weatherInfo?.clouds?.all;
// }

// function getLocation(){
//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }else{
//     console.log("No geolocation Supported");
//   }
// }

// function showPosition(position){
//   const userCoordinates={
//     lat:position.coords.latitude,
//     lon:position.coords.longitude,
//   }
//   sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
//   fetchUserWeatherInfo(userCoordinates);
  
// }

// const grantAccessButton=document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click",getLocation);


// const searchInput=document.querySelector("[data-searchInput]");

// searchForm.addEventListener("submit",(e)=>{
//   e.preventDefault();
//   let cityName=searchInput.value;
//   if(cityName === "")
//     return;
//   else
//      fetchUserWeatherInfo(cityName);
// })
// async function fetchUserWeatherInfo(city){
//   loadingScreen.classList.add("active");
//   userContainer.classList.remove("active");
//   grantAccessContainer.classList.remove("active");

//   try{
//     const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//           );
//           const data=await response.json();
//           loadingScreen.classList.remove("avtive");
//           userInfoContainer.classList.add("active");
//           renderWeatherInfo(data);
//   }catch(err){
//     console.log(err);
//   }
// }











































// function renderWeatherInfo(data) {
//   let newPara = document.createElement("p");
//   newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//   document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails() {
//   try {
//     let city = "goa";

//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );

//     const data = await response.json();
//     console.log("Weather data:-", data);

//     renderWeatherInfo(data);
//   } catch (err) {
//     //handle the error here
//     console.log(err);
//   }
// }

// async function getCustomWeatherDetails() {
//   try {
//     let latitude = 15.633;
//     let longitude = 18.3333;

//     let result = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//     );
//     let data = await result.json();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function getLocation(){
//   if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
//   }else{
//     console.log("No geolocation Supported");
//   }
// }

