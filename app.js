//declair all selector to constants
const temperatureField = document.querySelector('.weather1');
const cityField = document.querySelector('.weather2 p');
const dateField = document.querySelector('.weather2 span');
const emojiField = document.querySelector('.weather3 img');
const weatherField = document.querySelector('.weather3 span');
const searchField = document.querySelector('.searchField');
const form = document.querySelector('form');

let target = "India Delhi"
const fetchData = async(target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=2f2a710b22c14b458b5143304231304&q=${target}`;

        const response = await fetch(url);
        const data = await response.json();
        const{current:{temp_c, condition:{text,icon}},location:{name, localtime},}=data;
        updateDom(temp_c, name, icon, localtime, text);
    } catch (error) {
        alert("Location not found");
    }
    
};

function updateDom(temp, city, icon, time, weatherconditon){
    temperatureField.innerText = temp;
    cityField.innerText = city;
    emojiField.src = icon;
    const exactTime = time.split(" ")[1]
    const exactDate = time.split(" ")[0]
    const exactDay = new Date(exactDate).getDay();
    // console.log(getDayFullName(exactDay))
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`
    weatherField.innerText = weatherconditon;
}

fetchData(target);

function getDayFullName(num){
    switch (num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday"
        default:
            return "Dont Know";
    }

}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    target = searchField.value;
    fetchData(target); 
})

