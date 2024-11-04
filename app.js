
document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'f065d76625a5a12492dd7997ed6c3fca'; 
    const form = document.getElementById('weather-form');
    const errorInfo = document.getElementById('error');
    const backgroundVideo = document.querySelector('.background-video');

    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const city = document.getElementById('city').value;
        getWeather(city);
    });

    const getWeather = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            if (response.ok) {
                updateUI(data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            errorInfo.textContent = error.message;
            backgroundVideo.style.display = 'none'; 
        }
    };

    const updateUI = (data) => {
        const temp = data.main.temp;
        const tempMin = data.main.temp_min; 
        const tempMax = data.main.temp_max; 
        const humidity = data.main.humidity;
        const clouds = data.clouds.all;
        const wind = data.wind.speed;
        const city = data.name;



        document.getElementById('city-name').textContent = city;
        document.getElementById('temperature').textContent = `${temp.toFixed(1)}°`;
        document.getElementById('min-value').textContent = tempMin.toFixed(1); 
        document.getElementById('max-value').textContent = tempMax.toFixed(1); 
        document.getElementById('humidity-value').textContent = humidity; 
        document.getElementById('clouds-value').textContent = clouds; 
        document.getElementById('wind-value').textContent = wind.toFixed(1); 
        const date = new Date();
        document.getElementById('time').textContent = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setWeatherVideo(data.weather[0].main); 
    };

    const setWeatherVideo = (condition) => {
        let videoSrc = '';
        switch (condition) {
            case 'Rain':
                videoSrc = 'videos/flyy.mp4';
                break;
            case 'Snow':
                videoSrc = 'videos/snow2.mp4';
                break;
            case 'Clear':
                videoSrc = 'videos/sun.mp4';
                break;
            case 'Clouds':
                videoSrc = 'videos/with1.mp4';
                break;
            case 'Fog':
                videoSrc = 'videos/with2.mp4';
                break;
            case 'Wind':
                videoSrc = 'videos/with3.mp4';
                break;
            default:
                videoSrc = '';
        }

        if (videoSrc) {
            backgroundVideo.src = videoSrc;
            backgroundVideo.style.display = 'block';
            backgroundVideo.play();
        } else {
            backgroundVideo.style.display = 'none';
        }
    };
});













































