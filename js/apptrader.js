//variables para tomar el numero
const usdContainer = document.getElementById('UsdF');
const bitcoinContainer = document.getElementById('BitcoinF');
const notaNegativa = document.getElementById('numeroNegativo');

function calculateBitcoin(){
   if (bitcoinContainer.value > 0) {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(Response => Response.json())
            .then(data => {
                const bitcoin1 = data.bpi.USD.rate_float;
                usdContainer.value = (bitcoinContainer.value * bitcoin1).toFixed(2);
            });
    } else if (bitcoinContainer.value <= -1) {
               notaNegativa.textContent = "¡Solo se admite numero positivos, por favor de ingresar numero positivos!";
    }  
}


//funcion estatica
function calculateUsd(){
ction calculateUsd() {
    if (usdContainer.value > 0) {
        const usd = 0.000051;
        bitcoinContainer.value = (usdContainer.value * usd);
        console.log(bitcoinContainer.value);
    } else if (usdContainer.value <= -1) {
                notaNegativa.textContent = "¡Solo se admite numero positivos, por favor de ingresar numero positivos!";
    }
}
//Eventos
usdContainer.addEventListener('input', calculateUsd);
bitcoinContainer.addEventListener('input', calculateBitcoin);

calculateUsd();
calculateBitcoin();

