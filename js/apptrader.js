//variables para tomar el numero
const usdContainer = document.getElementById('UsdF');
const bitcoinContainer = document.getElementById('BitcoinF');


function calculateBitcoin(){
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(Response => Response.json())
    .then(data => {
        const bitcoin1 = data.bpi.USD.rate_float;
       usdContainer.value = (bitcoinContainer.value * bitcoin1).toFixed(2);
    });   
}


//funcion estatica
function calculateUsd(){
const usd = 0.000051;
bitcoinContainer.value = (usdContainer.value * usd);
console.log(bitcoinContainer.value);
}
//Eventos
usdContainer.addEventListener('input', calculateUsd);
bitcoinContainer.addEventListener('input', calculateBitcoin);

calculateUsd();
calculateBitcoin();

