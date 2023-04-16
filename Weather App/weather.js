const api = 'https://api.openweathermap.org/data/2.5/'
const key = '247c896a21a9b637c3e45b8f0c8360b0'
//weathers icons
const clouds = document.createElement("i");
clouds.className="fa-solid fa-cloud"

const clear = document.createElement("i")
clear.className="fa-solid fa-cloud-moon"

const day = document.createElement("i")
day.className="fa-solid fa-sun"

const rain = document.createElement("i")
rain.className="fa-solid fa-cloud-rain"

const mist = document.createElement("i")
mist.className="fa-solid fa-smog"

const setQuery = (e)=>{
    if(e.keyCode == '13'){
        getResult(searchBar.value);
        searchBar.value=""
    }
}

const getResult = (cityName) =>{
    let query = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${5}&appid=${key}`
    fetch(query)
    .then(weatherGeography=> weatherGeography.json())
    .then((result) =>{
        document.querySelector(".header").style.marginLeft="-380px"
        document.querySelector(".content").style.marginRight="-520px"
        geographyValues(result)
    })
    .catch(error=>{
        document.querySelector(".header").style.marginLeft=""   
        document.querySelector(".content").style.marginRight=""
        document.querySelector(".content").style.opacity="0" 
        alert(" CITY COULDN'T BE FOUND ! ",error)
    })
}

const geographyValues = (result) => {
    
    const lat = result[0].lat;
    const lon = result[0].lon;

    goSearch(lat,lon);
}

const goSearch = (lat , lon)=>{
    let query2 = `${api}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

    fetch(query2)
    .then(weather => weather.json())
    .then(displayResult)
}

const displayResult = (result) =>{
    
    document.querySelector(".content").style.display="block"
    document.querySelector(".content").style.opacity="1"
    document.querySelector(".content").style.background="rgba(0 , 0,  0, .3)"
    document.querySelector(".content").style.padding="35px"
    document.querySelector(".content").style.borderRadius="30px"
    document.querySelector(".city").innerText=`${result.name}`
    document.querySelector(".temp").innerHTML=`${Math.round(result.main.temp)}°C`
    document.querySelector(".desc").innerText=`${result.weather[0].main}`
    if(result.weather[0].main == "Clouds")document.querySelector(".desc").appendChild(clouds)
    if(result.weather[0].main == "Clear")
    {   if(new Date().getHours() > 6 && new Date().getHours() < 23){
            if(new Date().getHours()== 23 && new Date().getMinutes() <= 59)
            document.querySelector(".desc").appendChild(day)
        }
        if(0<new Date().getHours() < 6)
        document.querySelector(".desc").appendChild(clear)
    }
    if(result.weather[0].main == "Rain")  document.querySelector(".desc").appendChild(rain)
    if(result.weather[0].main == "Mist")  document.querySelector(".desc").appendChild(mist)
    document.querySelector(".minMax").innerHTML=`Min : ${Math.round(result.main.temp_min)}°C  /  Max : ${Math.round(result.main.temp_max)}°C`
}
const searchBar = document.getElementById('searchBar')
searchBar.addEventListener("keypress", setQuery)