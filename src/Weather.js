const getWeatherData = async (city, country) => {
  const apiKey = "af9b0da0d5f55d2525a8a65e11744fba";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const respond = await fetch(url);
    const data = await respond.json();

    if ((data.cod = "200")) {
      return data;
    } else {
      throw new Error(`Error: ${data.message}`);
    }
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export default { getWeatherData };
