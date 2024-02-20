let dropList = document.querySelectorAll('form select');
let btn = document.querySelector('form button');
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select');
let output = document.querySelector('.output');
let swap = document.querySelector('form .exchange-icon');
const apiKey = '02a2dd85c9651cd6bd141b2c';

//  Creating A For loop For Getting All Ele In DropList
for (let i = 0; i < dropList.length; i++) {
    // Using Another For In Loop For Getting All Ele Inside Of Country List
    for (currency_code in country_code) {
        // Logic: Pre-Default Select A Ele
        let selected;
        if (i == 0) {
            selected = currency_code == 'USD' ? 'selected' : '';
        } else if (i == 1) {
            selected = currency_code == 'INR' ? 'selected' : '';
        }
        // Created A New Option tag With Each Ele
        let newOptionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        // Inserting/Adding A New Option Tag Inside Of Select Tag
        dropList[i].insertAdjacentHTML('beforeend', newOptionTag);
    }
    // Change Flag On Change Of DropList Ele
    dropList[i].addEventListener('change', (e) => {
        updateFlag(e.target);
    })
}

// Logic: Update Flag
let updateFlag = (ele) => {
    for (code in country_code) {
        if (code == ele.value) {
            let imgTag = ele.parentElement.querySelector('img');
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
            console.log(imgTag)
        }
    }
}

// Logic: Exchange Logo Working 
swap.addEventListener('click', () => {
    let exchangeData = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = exchangeData;
    updateFlag(fromCurr)
    updateFlag(toCurr)
    getExchangeRate();
})

// Onclick Of Exchange Btn
btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Btn Clicked')
    getExchangeRate();

})

// Main Logic Of Code
let getExchangeRate = () => {
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if (amtVal === '' || amtVal < '1'  || amtVal != Number) {
        amount.value = '1'
        amtVal = 1;
    }
    output.innerText = 'Getting Exchange Data...'

    // API Stored 
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurr.value}`
    console.log(url)

    // Fetching & Getting Data In JSON Format
    fetch(url)
        .then(response =>
            //    console.log( response.json())
            response.json()
        )
        .then(result => {
            // console.log(result)
            let exchangeRate = result.conversion_rates[toCurr.value];
            console.log(exchangeRate)
            let totalExchange = amtVal * exchangeRate.toFixed(2);
            console.log(totalExchange)
            output.innerText = `${amtVal} ${fromCurr.value} = ${totalExchange} ${toCurr.value}`
        })
}