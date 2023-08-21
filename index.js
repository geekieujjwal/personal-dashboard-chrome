// Fetch a random landscape nature photo from Unsplash API
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    // Set the fetched photo as the background image
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    // Display the photo's author and a link to the Todo app
    document.getElementById("author").innerHTML = `
      <p>By: ${data.user.name}</p>
      <a href="https://todo-sol.vercel.app/" target="_blank">Todo</a>
    `;
  })
  .catch((err) => {
    // Use a default background image/author in case of an error
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").innerHTML = `
      <p>By: Dodi Achmad</p>
      <p><a href="https://todo-sol.vercel.app/">Todo</a></p>
    `;
  });

// Fetch Bitcoin cryptocurrency data from CoinGecko API
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    // Display Bitcoin's logo and name
    document.getElementById("crypto-top").innerHTML = `
      <img src=${data.image.small} />
      <span>${data.name}</span>
    `;
    // Display cryptocurrency price details
    document.getElementById("crypto").innerHTML += `
      <p>🎯: $${data.market_data.current_price.usd}</p>
      <p>👆: $${data.market_data.high_24h.usd}</p>
      <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((err) => console.error(err));

// Update the displayed time every second
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "hi-IN",
    { timeStyle: "medium" }
  );
}
setInterval(getCurrentTime, 1000);

// Get current geolocation and fetch weather data
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      // Display weather icon, temperature, and city name
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
        <p class="weather-city">${data.name}</p>
      `;
    })
    .catch((err) => console.error(err));
});

// Define API key and URL for getting quotes
const apiKey = "W8jgTtYekrr5FXnzTGKlqw==qdOMT27Z5IKatjpX";
const apiUrl = "https://api.api-ninjas.com/v1/quotes?category=attitude";

// Fetch data using the fetch API with an API key
fetch(apiUrl, {
  headers: {
    "X-Api-Key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data[0].quote); // Process the data here
    document.querySelector(".quote").textContent = data[0].quote;
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
