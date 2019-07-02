// bazy z tekstami
const weekDesc = {
    week1: `<strong>Cel: </strong>Możesz zrobić co najmniej 13 pompek po zakończeniu 4
serii, w których zrobiłeś kolejno 11, 12, 9 i 8 pompek. Przerwy między seriami trwają 45 sekund.`,
    week2: `<strong>Cel: </strong>Możesz zrobić co najmniej 20 pompek po zakończeniu 4 serii, w których zrobiłeś kolejno 16, 17, 14 i 14 pompek. Przerwy między seriami trwają 45 sekund.`,
    week3: `<strong>Cel: </strong>Możesz zrobić co najmniej 28 pompek po zakończeniu 4 serii, w których zrobiłeś kolejno 22, 30, 20 i 20 pompek. Przerwy między seriami trwają 45 sekund.`,
    week4: `<strong>Cel: </strong>Możesz zrobić co najmniej 40 pompek po zakończeniu 4 serii, w których zrobiłeś kolejno 29, 33, 29 i 29 pompek. Przerwy między seriami trwają 45 sekund.`,
    week5: `<strong>Cel: </strong>Możesz zrobić co najmniej 50 pompek po zakończeniu 7 serii, w których zrobiłeś kolejno 20, 20, 24, 24, 20, 20 i 22 pompki. Przerwy między seriami trwają 45 sekund.`,
    week6: `<strong>Cel: </strong>Możesz zrobić co najmniej 60 pompek po zakończeniu 8 serii, w których zrobiłeś kolejno 26, 26, 33, 33, 26, 26, 22 i 22. Przerwy między seriami trwają 45 sekund.`
}
// obiek z zadaniami da danego tygodnia
const targets = {
    week1: `<span class="round">11</span>
    <span class="round">12</span>
    <span class="round">9</span>
    <span class="round">8</span>
    <span class="round">13</span>`,
    week2: `<span class="round">16</span>
    <span class="round">17</span>
    <span class="round">14</span>
    <span class="round">14</span>
    <span class="round">20</span>`,
    week3: `<span class="round">22</span>
    <span class="round">30</span>
    <span class="round">20</span>
    <span class="round">20</span>
    <span class="round">28</span>`,
    week4: `<span class="round">29</span>
    <span class="round">33</span>
    <span class="round">29</span>
    <span class="round">29</span>
    <span class="round">40</span>`,
    week5: `<span class="round">20</span>
    <span class="round">20</span>
    <span class="round">24</span>
    <span class="round">24</span>
    <span class="round">20</span>
    <span class="round">20</span>
    <span class="round">22</span>  
    <span class="round">50</span>`,
    week6: `<span class="round">26</span>
    <span class="round">26</span>
    <span class="round">33</span>
    <span class="round">33</span>
    <span class="round">26</span>
    <span class="round">26</span>
    <span class="round">22</span>
    <span class="round">22</span>
    <span class="round">60</span>`
}
// koniec bazy z tekstami

// elementy dom

let navi = [...document.querySelectorAll('li')]; // nawigacja
let weekName = document.querySelector('#weekNr'); //nagłówek z tygodniem
let target = document.querySelector('#target'); // cel tygodnia
let targetList = document.querySelector('#targetList'); // lista celów
let exercises = [...document.querySelectorAll('.round')]; // cwiczenia
let time = document.querySelector('.sec') // zegar    
let goal = document.querySelector('.amount');
let btn = document.querySelector('.start'); // guzik startu

// koniec elenty dom

// zmienne potzebne do pracy funkcji

let timeVal = 50; //czas jaki ma odliczac stoper w ms
let idI; // musze przypisać do tej zmiennej interwał bo inaczej go nie zatrzymam
let activeNum = 0; //numer cwiczenia

// koniec zmienne potrzebne do pracy funkcji

// funkcje
const mainFunc = () => { //funkcja zarządzająca - ona odpala interwał
    if (activeNum < exercises.length - 1) {
        idI = setInterval(start, 10); //włącza interwał
    }
    if (activeNum < exercises.length) { // ile na zielono
        setActive();
        activeNum++
        console.log(activeNum, exercises.length);
        if (activeNum == exercises.length) {
            goal.innerHTML = 'Gratulacje! Dzisiejszy trening został wykonany!'
        }
    } else {
        activeNum = 0;
    }
}
const start = () => { //funkcja samego stopera
    timeVal--;
    time.textContent = (timeVal / 100).toFixed(2);
    btn.disabled = true; //wyłaczam guzik
    if (timeVal == 0) {
        clearInterval(idI); //zatrzymuje interwał
        time.textContent = "00.00"
        timeVal = 50;
        btn.disabled = false; //włączam guzik
    }
}
const setActive = () => { //robi cwiczenia na zielono
    exercises[activeNum].classList.add('active');
}

for (i = 0; i < navi.length; i++) { // zmienia nazwe tygodnia, opis, liste cwiczen
    navi[i].addEventListener('click', function () {
        weekName.textContent = this.textContent;
        target.innerHTML = weekDesc[this.id];
        targetList.innerHTML = targets[this.id];
    })
}
// koniec funkcje

btn.addEventListener('click', mainFunc);