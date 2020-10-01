# homework6 Weather App

## Our Task

Our task here was to create a weather forecast app that remembers the cities you've searched, and allows you to not only look at today's forecast, but also a simplified 5 day forecast. 

The current day's forecast should include

* The City name
* The current date
* An icon representing the weather conditions
* The temperature (in celsisus because we're in Canada)
* The UV index, which will change appearance based on conditions

The Five day forecast should contain

* The date
* Icon decpicting weather conditions
* The temperature
* The humidity


## What We'll need

We will need the following elements present.

1. Search Bar
2. Buttons representing each city, that will pull up their local weather when the button is pressed
3. A main weather forecast box for today's weather
4. A 5 day forecast with smaller boxes


##  Tools and Items used

1. Jquery
2. Bootstrap for the main weather box jumbotron
3. Old fashioned CSS for everything else
4. moment.js to display the current date, and translate the date returned by the openweather API for the 5 day forecast
5. The open weather API with 3 separate API calls for the current forecast, the UV index, and the 5 day forecast


This was a pretty intense project just with the amount of different API calls being made, and the dynamic rendering of the 5 day forecast. I documented how it works pretty exhaustively in the .js file so please look in there to see how it all works!

## Future improvements

I'm pretty happy that it all technically works at the moment, but there are definitely improvements to be made. I'd probably switch over most display elements to bootstrap elements so that the page is responsive, and looks a little nicer. There's also some functionality I could add in in terms of deleting buttons, and styling some of the elements a little more .
