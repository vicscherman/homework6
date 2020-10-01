renderCities()

loadWeather()

function addCity(event){
    event.preventDefault();
    console.log("add city called")
    var city= document.querySelector("#searchcity").value;
    var cityList = localStorage.cityList ? JSON.parse(localStorage.cityList) :[];
    console.log(city);
    if(city.length <= 0) 
    return 
    
    cityList.push(city)
    localStorage.cityList = JSON.stringify(cityList);
    renderCities()
} 

     
    function renderCities(){
        var cityList = localStorage.cityList ? JSON.parse(localStorage.cityList) :[];
        document.querySelector("#citylist").innerHTML = "";
        for(i=0;i<cityList.length; i++){
            document.querySelector("#citylist").innerHTML += `<button onClick="loadWeather('${cityList[i]}')">${cityList[i]}</button>`;}
    }

    var apiKey = "2c4a94c1bef930ff327c759a86dd08a7"
    function loadWeather(city){
        document.getElementById('Shrek').innerText = '';

        var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + (apiKey)
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q="  + city + "&appid=" + (apiKey) 
        

        $.ajax({
            url: currentDayURL,
            method: "GET"
          }).then(function (result){
              console.log(result);
          
              
              
              var currentDayResult = result

              var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${currentDayResult.coord.lat}&lon=${currentDayResult.coord.lon}&appid=${apiKey}`


              $.ajax({
                url: uvIndex,
                method: "GET"
              }).then(function (uvResult){
                //   console.log(uvResult);
                  document.querySelector("#temp").innerText = (result.main.temp -273.15).toFixed(1);
                    $("#weathericon").attr('src', `http://openweathermap.org/img/wn/${result.weather[0].icon}.png`);
                    document.querySelector("#hum").innerText = (result.main.humidity);
                    document.querySelector("#wind").innerText = (result.wind.speed);
                    document.querySelector("#cityDate").innerText = `${result.name}, ${moment().format('dddd, MMMM Do')}`;
                    document.querySelector("#uv").innerText = (uvResult.value)

              })




              

              })
        
          $.ajax({
            url: fiveDayURL,
            method: "GET"
          }).then(function (fiveDayResult){
            //   console.log(fiveDayResult)
              // this insane garbage is here to pull noon from each subsequent day since the 5 day forecast returns in 3 hour increments
               for (i=4; i<fiveDayResult.list.length; i+=8){
                    createForecastElement(fiveDayResult.list[i])
               }

               
               







          })
        
      
    

    
        

    }
   



function createForecastElement(weatherForecast){
    console.log(weatherForecast);
    var shrek = document.getElementById('Shrek');
    var weatherDiv = document.createElement('div');
    weatherDiv.classList.add('fiveday')
    var ul= document.createElement('ul')
    
    var dateItem = document.createElement('li')
    dateItem.innerText = moment(weatherForecast.dt_txt).format('l')
   
   ul.appendChild(dateItem);
   
   var weatherPic = document.createElement('img')
   $(weatherPic).attr('src', `http://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}.png`)

   ul.appendChild(weatherPic)

    
   var temperature = document.createElement('li')
   temperature.innerText = `Temperature: ${(weatherForecast.main.temp - 273.15).toFixed(1)}`
   ul.appendChild(temperature)

   var humidity = document.createElement('li')
   humidity.innerText= `Humidity: ${(weatherForecast.main.humidity)}%`
   ul.appendChild(humidity)

   
    
   weatherDiv.appendChild(ul);
    shrek.appendChild(weatherDiv)
}

  


  
   



