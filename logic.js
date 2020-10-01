
//pulls our cities from localstorage and creates buttons
renderCities()
//loads the weather for our two weather elements, the main forecast and the 5 day projection
loadWeather()
//adds a city to our button list
//it also rejects empty entries
//it also adds any city on the list to local storage
function addCity(event){
    event.preventDefault();
    console.log("add city called")
    var city= document.querySelector("#searchcity").value;
    //a ternary operator is present here. Basically if there is a list in local storage, we parse it. IF there isn't, we create an empty array
    var cityList = localStorage.cityList ? JSON.parse(localStorage.cityList) :[];
    console.log(city);
    if(city.length <= 0) 
    return 
    
    cityList.push(city)
    localStorage.cityList = JSON.stringify(cityList);
    renderCities()
} 

     // this function looks through the object array of cities in local storage and calls them back up as buttons
    function renderCities(){
        var cityList = localStorage.cityList ? JSON.parse(localStorage.cityList) :[];
        document.querySelector("#citylist").innerHTML = "";
        for(i=0;i<cityList.length; i++){
            document.querySelector("#citylist").innerHTML += `<button onClick="loadWeather('${cityList[i]}')">${cityList[i]}</button>`;}
    }
     //defining our API key for the openweathermap API
    var apiKey = "2c4a94c1bef930ff327c759a86dd08a7"
    //Our function to populate our weatherbox.
    function loadWeather(city){
      //because our 5 day forecast is also being called when we load the main forecast, we want to initially reset the forecast to an empty string to prevent multiple 5 day forecasts from appearing
        document.getElementById('Shrek').innerText = '';
      //our API callsfor the current day forecast and the 5 day forecast
        var currentDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + (apiKey)
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q="  + city + "&appid=" + (apiKey) 
        
         //ajax call for the current day forecast
        $.ajax({
            url: currentDayURL,
            method: "GET"
          }).then(function (result){
              console.log(result);
          
              
              
              var currentDayResult = result
            // we also need the UV index, which calls for another API call as the data isn't present in the other two. This API uses longitude and latitude to make a call, so we have to pull that from the currentDayResult and feed it to this API
              var uvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${currentDayResult.coord.lat}&lon=${currentDayResult.coord.lon}&appid=${apiKey}`

              //ajax call for the UV index
              $.ajax({
                url: uvIndex,
                method: "GET"
              }).then(function (uvResult){
                //   console.log(uvResult);
                //because we're still in the same for loop, we can now use that element to render pretty much all the elements we need to appear.
                //We render the temperature, the weather icon, the humidity, the wind speed, and the UV index.
                //Interestingly enough, we also use moment.js to bring up the date in the right format. So many API calls!!!!
                //We can also use this function to set the text color for the uv index by specifying value ranges and setting different styles in css for different ratings
                  document.querySelector("#temp").innerText = (result.main.temp -273.15).toFixed(1) + " Celsius";
                  // this is how we get the  weather icon to appear. It's an image so we set it to our img div in our html
                    $("#weathericon").attr('src', `http://openweathermap.org/img/wn/${result.weather[0].icon}.png`);
                    document.querySelector("#hum").innerText = `${result.main.humidity}% `;
                    document.querySelector("#wind").innerText = `${result.wind.speed}km/h`;
                    document.querySelector("#cityDate").innerText = `${result.name}, ${moment().format('dddd, MMMM Do')}`;
                    document.querySelector("#uv").innerText = (uvResult.value);
                    var uvIndex = document.getElementById("uv");
                    if(
                      uvResult.value <2){
                        uvIndex.classList.add('mild')
                      }
                   
                    if(
                      uvResult.value >=2){
                         uvIndex.classList.add('moderate')
                        }
                    
                    if(
                      uvResult.value >=4){
                        uvIndex.classList.add('severe')
                      }
                    

                    

                  

              })




              

              })
          //our ajax call for the five day forecast
          $.ajax({
            url: fiveDayURL,
            method: "GET"
          }).then(function (fiveDayResult){
            //   console.log(fiveDayResult)
              // this insanity is here to pull the same time from each subsequent day since the 5 day forecast returns in 3 hour increments. 
              //3 x 8 is 24 so having the index value increase by 8 will give the next day's weather at the same time of day. We also invoke our createforecast element function here.
              //i'm more than open to better ways to do this!
               for (i=4; i<fiveDayResult.list.length; i+=8){
                    createForecastElement(fiveDayResult.list[i])
               }

               
               







          })
        
      
    

    
        

    }
   


//This is probably the coolest part of the whole code. Here we're dynamically building our div, ul, and li items for the 5 day forecast. 
//We're then setting the content from our API call to these elements we created. Finally, it's all styled by our CSS!
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

  


  
   



