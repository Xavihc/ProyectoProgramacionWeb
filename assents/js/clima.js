window.addEventListener('load', ()=>{
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d2478296d924f96812a7c9b28499fb7b`

            //console.log(url)

            fetch(url)
             .then( Response => {return Response.json() })
             .then( data => {
                
                 let temp = Math.round(data.main.temp)
                  tempFinal = temp -273
                  temperaturaValor.textContent = `${tempFinal} °C`
                  
                 let desc = data.weather[0].description
                 temperaturaDescripcion.textContent = desc.toUpperCase()
                
                 ubicacion.textContent = data.name

                 vientoVelocidad.textContent = `${data.wind.speed} m/s`
                 
                 //iconos estaticos
                 // console.log(data.weather[0].icon)
                 //  let iconCode = data.weather[0].icon
                 //  const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`
                 //  console.log(urlIcon)
                 //iconos animados
                 console.log(data.weather[0].main)
                 switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        iconoAnimado.src = '../assents/animated/thunder.svg'
                        console.log('Tormenta')
                        break;
                    case 'Drizzle':
                        iconoAnimado.src = '../assents/animated/rainy-2.svg'
                        console.log('Llovisna')
                        break;
                    case 'Rain':
                        iconoAnimado.src = '../assents/animated/rainy-7.svg'
                        console.log('Lluvia')
                        break;
                    case 'Snow':
                        iconoAnimado.src='../assents/animated/snowy-6.svg'
                        console.log('Nieve')
                        break;
                    case 'Clear':
                        iconoAnimado.src='../assents/animated/day.svg'
                        console.log('Despejado')
                        break;
                    case 'Atmosphere':
                        iconoAnimado.src='../assents/animated/weather.svg'
                        console.log('Atmosfera')
                        break;
                    case 'Clouds':
                        iconoAnimado.src='../assents/animated/cloudy-day-1.svg'
                        console.log('Nubes')
                        break;
                    default:
                        iconoAnimado.src='../assents/animated/cloudy-day-1.svg'
                        console.log('Por defecto')
                        break;
                 }
             })
             .catch( error =>{
                 console.log(error)
             })
        })
    }
})
