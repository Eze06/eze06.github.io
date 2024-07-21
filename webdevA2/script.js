//Variable for planets page
var planetImg = document.querySelectorAll(".planet-img");
var prevButton = document.querySelectorAll(".previous");
var nextButton = document.querySelectorAll(".next");
//Planet Informations
var planetInformation = document.querySelector("#planet-information");
var planetName = document.querySelector(".planet-name");
var distanceFromSun = document.querySelector(".distance-from-sun");
var sizeOfPlanet = document.querySelector(".size-of-planet");
var planetAdditionalInformation = document.querySelector(".planet-additional-information");

var planetIndex = 0;
var planetTopIndex = 0;
var planetMiddleIndex = 0;
var planetBottomIndex = 0;

const numPlanets = 8;

const planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const planetImages = ["image/mercury-planet.png", "image/venus-planet.png", "image/earth-planet.png", "image/mars-planet.png", "image/jupiter-planet.png", "image/saturn-planet.png", "image/uranus-planet.png", "image/neptune-planet.png"
];

const planetTopImages = ["image/mercury-top.png", "image/venus-top.png", "image/earth-top.png", "image/mars-top.png",
    "image/jupiter-top.png", "image/saturn-top.png", "image/uranus-top.png", "image/neptune-top.png"
];

const planetMiddleImages = ["image/mercury-middle.png", "image/venus-middle.png", "image/earth-middle.png", "image/mars-middle.png",
    "image/jupiter-middle.png", "image/saturn-middle.png", "image/uranus-middle.png", "image/neptune-middle.png"
];

const planetBottomImages = ["image/mercury-bottom.png", "image/venus-bottom.png", "image/earth-bottom.png", "image/mars-bottom.png",
    "image/jupiter-bottom.png", "image/saturn-bottom.png", "image/uranus-bottom.png", "image/neptune-bottom.png"
];


const planetDistance = ["52.702 Million Kilometers (Closest) ", "107.53 Million Kilometers", "149 Million Kilometers", "228 Million kilometers",
    "778 Million Kilometers", "1.43 Billion Kilometers ", "2.9 Billion Kilometers ", "4.5 Billion Kilometers (Farthest) "];

const planetSizes = ["74.8 million km²", "460.2 million km²", "510.1 million km²", "144.4 million km²",
    "61.42 billion km²", "42.7 billion km²", "8.083 billion km²", "7.618 billion km²"
];


const planetAdditionalInfo = ["Mercury Facts: The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon. From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter.",
    "Venus Facts: Venus is the second planet from the Sun, and the sixth largest planet. It’s the hottest planet in our solar system. Venus is a cloud - swaddled planet named for a love goddess, and often called Earth’s twin.But pull up a bit closer, and Venus turns hellish.Our nearest planetary neighbor, the second planet from the Sun, has a surface hot enough to melt lead.The atmosphere is so thick that, from the surface, the Sun is just a smear of light.",
    "Earth Facts: While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal. Earth is the only planet in the solar system whose English name does not come from Greek or Roman mythology.The name was taken from Old English and Germanic.It simply means 'the ground.' There are, of course, many names for our planet in the thousands of languages spoken by the people of the third planet from the Sun.",
    "Mars Facts: Mars is no place for the faint-hearted. It’s dry, rocky, and bitter cold. The fourth planet from the Sun, Mars, is one of Earth's two closest planetary neighbors (Venus is the other). Mars is one of the easiest planets to spot in the night sky – it looks like a bright red point of light. Despite being inhospitable to humans, robotic explorers – like NASA's Perseverance rover – are serving as pathfinders to eventually get humans to the surface of the Red Planet.",
    "Jupiter Facts: Jupiter is a world of extremes. It's the largest planet in our solar system. If Jupiter was a hollow shell, 1,000 Earths could fit inside. Jupiter also is the oldest planet, forming from the dust and gases left over from the Sun's formation 4.5 billion years ago. But it has the shortest day in the solar system, taking only 10.5 hours to spin around once on its axis.",
    "Saturn Facts: Saturn is the sixth planet from the Sun and the second largest planet in our solar system. Adorned with a dazzling system of icy rings, Saturn is unique among the planets. It is not the only planet to have rings, but none are as spectacular or as complex as Saturn's. Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium. The farthest planet from Earth discovered by the unaided human eye, Saturn has been known since ancient times.The planet is named for the Roman god of agriculture and wealth, who was also the father of Jupiter.",
    "Uranus Facts: Uranus is the seventh planet from the Sun, and it's the third largest planet in our solar system – about four times wider than Earth. The diameter at its equator is 31,763 miles (51,120 kilometers). Uranus is a very cold and windy planet.It is surrounded by faint rings, and more than two dozen small moons as it rotates at a nearly 90 - degree angle from the plane of its orbit.This unique tilt makes Uranus appear to spin on its side. Uranus is blue - green in color due to large amounts of methane, which absorbs red light but allows blues to be reflected back into space.The atmosphere is mostly hydrogen and helium, but also includes large amounts of water, ammonia and methane.",
    "Neptune Facts: Dark, cold and whipped by supersonic winds, giant Neptune is the eighth and most distant major planet orbiting our Sun. More than 30 times as far from the Sun as Earth, Neptune is not visible to the naked eye. In 2011, Neptune completed its first 165-year orbit since its discovery. The planet’s rich blue color comes from methane in its atmosphere, which absorbs red wavelengths of light, but allows blue ones to be reflected back into space. Neptune was the first planet located through mathematical calculations.Using predictions sent to him by French astronomer Urbain Le Verrier, based on disturbances in the orbit of Uranus, German astronomer Johann Galle was the first to observe the planet in 1846. The planet is named after the Roman god of the sea, as suggested by Le Verrier."];

//Sections of different pages
const planetPage = document.querySelector("#planets");
const aboutPage = document.querySelector("#about");
const gamesPage = document.querySelector("#games");
const moonsPage = document.querySelector("#moons");

var planetBriefSelector = document.querySelectorAll(".planet-selector h3");

var planetBriefSelectorBool = [true, false, false, false, false, false, false, false]; //Used to check which planet selector is selected (default is mercury selected)

var planetsButton = document.querySelector(".planets-button");
var aboutButton = document.querySelector(".about-button");
var moonsButton = document.querySelector(".moons-button");
var gamesButton = document.querySelector(".games-button");




var gameTimer = 0; //Timer used for asteroid game

var bSpawnAsteroid = false;

//Variables for asteroid game
var asteroidHits = 0;
var asteroidsPerSecond = 0;
var accuracy = 0;
var totalClicks = 0;


var planetTopPart = document.querySelector(".top-planet-part");
var planetMiddlePart = document.querySelector(".middle-planet-part");
var planetBottomPart = document.querySelector(".bottom-planet-part");

const mobilePlanetSelected = document.querySelector(".mobile-planet-selector h3");

var endScreen = document.querySelector(".end-screen");


function AddSlideNextAnim() {
    //reset elements
    for (let i = 0; i < planetImg.length; i++) {
        planetImg[i].classList.remove("slidenxt-anim");
        planetImg[i].classList.remove("slideprev-anim");
    }

    planetInformation.classList.remove("slidenxt-anim");
    planetInformation.classList.remove("slideprev-anim");

    planetPage.offsetHeight;

    for (let i = 0; i < planetImg.length; i++) {
        planetImg[i].classList.add("slidenxt-anim");
    }
    planetInformation.classList.add("slidenxt-anim");

}

function AddSlidePrevAnim() {
    for (let i = 0; i < planetImg.length; i++) {
        planetImg[i].classList.remove("slideprev-anim");
        planetImg[i].classList.remove("slidenxt-anim");
    }

    planetInformation.classList.remove("slideprev-anim");
    planetInformation.classList.remove("slidenxt-anim");

    planetPage.offsetHeight;

    for (let i = 0; i < planetImg.length; i++) {
        planetImg[i].classList.add("slideprev-anim");

    }
    planetInformation.classList.add("slideprev-anim");
}




function ShowPlanet(index) {
    //Clear planet brief selection
    for (let i = 0; i < planetBriefSelector.length; i++) {
        if (planetBriefSelectorBool[i] == true) {
            planetBriefSelector[i].style.color = "#333333";
            planetBriefSelector[i].style.borderColor = "#333333";
            planetBriefSelectorBool[i] = false;
        }
    }

    //Set information of planet
    planetName.innerHTML = planetNames[index];
    for (let i = 0; i < planetImg.length; i++) {
        planetImg[i].src = planetImages[index];

    }
    distanceFromSun.innerHTML = "<strong>Distance From Sun: </strong>" + "<span style='color:cyan'> " + planetDistance[index] + "</span>";
    sizeOfPlanet.innerHTML = "<strong>Size Of Planet: </strong>" + "<span style='color:cyan'> " + planetSizes[index] + "</span>";
    planetAdditionalInformation.innerHTML = planetAdditionalInfo[index];
    //Select correct planet brief
    planetBriefSelectorBool[index] = true;
    planetBriefSelector[index].style.color = "White";
    planetBriefSelector[index].style.borderColor = "White";

    mobilePlanetSelected.innerHTML = planetNames[index];
    console.log(mobilePlanetSelector);

}

function ChangePlanetBrief(index) {

    planetIndex = index;
    //Show planet
    ShowPlanet(index);
    //Reset animation
    AddSlideNextAnim();

}

//Functions for opening different pages
function OpenPlanetPage() {
    //Close Games, About and Moons page
    aboutPage.style.display = "none";
    gamesPage.style.display = "none";
    moonsPage.style.display = "none";
    //Display planet page
    planetPage.style.display = "flex";

    aboutButton.style.textDecoration = "none";
    gamesButton.style.textDecoration = "none";
    moonsButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "underline";

    ShowPlanet(planetIndex);
    AddSlideNextAnim();

}

function OpenAboutPage() {
    //Close games, moons and planets page
    planetPage.style.display = "none";
    gamesPage.style.display = "none";
    moonsPage.style.display = "none";

    //Display about page
    aboutPage.style.display = "grid";

    aboutButton.style.textDecoration = "underline";
    gamesButton.style.textDecoration = "none";
    moonsButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "none";
}

function OpenGamesPage() {
    //Close about,  moons and planets page
    planetPage.style.display = "none";
    aboutPage.style.display = "none";
    moonsPage.style.display = "none";

    //Display games page
    gamesPage.style.display = "flex";

    gamesButton.style.textDecoration = "underline";
    aboutButton.style.textDecoration = "none";
    moonsButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "none";
}

function OpenMoonsPage() {
    //Close about, planets and games page
    planetPage.style.display = "none";
    aboutPage.style.display = "none";
    gamesPage.style.display = "none";

    //Display moons page
    moonsPage.style.display = "flex";

    gamesButton.style.textDecoration = "none";
    aboutButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "none";
    moonsButton.style.textDecoration = "underline";


}
function NextPlanet() {
    //Check if index >= total number of planets
    if (planetIndex >= numPlanets - 1) {
        //Reset index
        planetIndex = 0;
    }
    else {
        planetIndex++;
    }
    //set planet information
    ShowPlanet(planetIndex);

    AddSlideNextAnim();
}

function PrevPlanet() {
    //Check if index <= 0
    if (planetIndex <= 0) {
        //Set the index to the max number of planets
        planetIndex = numPlanets - 1;
    }
    else {
        planetIndex--;
    }
    //set planet information
    ShowPlanet(planetIndex);
    AddSlidePrevAnim();
}

// Next planet part for planet creator
function NextPlanetPart(type) {
    if (type == "top") {
        if (planetTopIndex >= numPlanets - 1) {
            //Reset index
            planetTopIndex = 0;
        }
        else {
            planetTopIndex++;
        }

        planetTopPart.src = planetTopImages[planetTopIndex];
    }

    else if (type == "middle") {
        if (planetMiddleIndex >= numPlanets - 1) {
            //Reset index
            planetMiddleIndex = 0;
        }
        else {
            planetMiddleIndex++;
        }
        planetMiddlePart.src = planetMiddleImages[planetMiddleIndex];
    }

    else {
        if (planetBottomIndex >= numPlanets - 1) {
            //Reset index
            planetBottomIndex = 0;
        }
        else {
            planetBottomIndex++;
        }
        planetBottomPart.src = planetBottomImages[planetBottomIndex];

    }
    GeneratePlanetName();

}


//Prev planet part for planet creator
function PrevPlanetPart(type) {
    if (type == "top") {
        if (planetTopIndex <= 0) {
            //Set the index to the max number of planets
            planetTopIndex = numPlanets - 1;
        }
        else {
            planetTopIndex--;
        }



        planetTopPart.src = planetTopImages[planetTopIndex];
    }

    else if (type == "middle") {
        if (planetMiddleIndex <= 0) {
            //Set the index to the max number of planets
            planetMiddleIndex = numPlanets - 1;
        }
        else {
            planetMiddleIndex--;
        }

        planetMiddlePart.src = planetMiddleImages[planetMiddleIndex];
    }

    else {
        if (planetBottomIndex <= 0) {
            //Set the index to the max number of planets
            planetBottomIndex = numPlanets - 1;
        }
        else {
            planetBottomIndex--;
        }

        planetBottomPart.src = planetBottomImages[planetBottomIndex];
    }
    GeneratePlanetName();

}

//Planet creator Name generator
function GeneratePlanetName() {
    //Get the top planet name
    let topPlanetName = planetNames[planetTopIndex];

    //Get the middle planet name
    let middlePlanetName = planetNames[planetMiddleIndex];
    let middlePlanetNameLength = Math.floor(planetNames[planetMiddleIndex].length / 3);

    //Get the bottom planet name
    let bottomPlanetName = planetNames[planetBottomIndex];

    let finalPlanetName = topPlanetName.slice(0, 2) + middlePlanetName.slice(2, 2 + middlePlanetNameLength) + bottomPlanetName.slice(2 + middlePlanetNameLength);
    let planetName = document.querySelector(".new-planet-name");
    planetName.innerHTML = "Planet Name: " + finalPlanetName;
}
//Function for randomly spawning asteroids
function StartGame() {
    //reset all variables
    endScreen.style.display = "none";
    asteroidHits = 0;
    asteroidsPerSecond = 0;
    accuracy = 0;


    gameTimer = 30;

    //Start a timer of 30 seconds
    let gameInterval = setInterval(PlayGame, 33); //33ms is roughly 30fps

    var timer = setInterval(function () {
        document.querySelector(".game-timer").innerHTML = "Timer: " + gameTimer;
        gameTimer--;
        if (gameTimer <= 0) {
            ShowEndScreen();
            clearInterval(gameInterval);
            clearInterval(timer);
        }
    }, 1000);


    //Remove start button
    gameStartButton.style.display = "none";
    bSpawnAsteroid = true;



    let gameArea = document.querySelector(".asteroid-game-background");
    gameArea.addEventListener("click", function () {
        totalClicks++; return 0;
    });

    //Reset game variables
    totalClicks = -1;
    asteroidHits = 0;
    accuracy = 100;
    asteroidsPerSecond = 0;
}

function PlayGame() {


    let gameArea = document.querySelector(".asteroid-game-background");
    let gameWidth = gameArea.offsetWidth;
    let gameHeight = gameArea.offsetHeight;
    let gameLeft = gameArea.offsetLeft;
    let gameTop = gameArea.offsetTop;

    document.querySelector(".score").innerHTML = "Asteroids Hit: " + asteroidHits;





    if (bSpawnAsteroid) {
        let rndX = randomIntFromInterval(gameLeft + asteroid.offsetWidth, gameLeft + gameWidth - asteroid.offsetWidth);
        let rndY = randomIntFromInterval(gameTop + asteroid.offsetHeight, gameTop + gameHeight - asteroid.offsetHeight);


        SpawnAsteroid(rndX, rndY);

    }


    //Get accuracy of asteroids hit
    if (totalClicks > 0) {
        accuracy = (asteroidHits / totalClicks) * 100;
        document.querySelector(".accuracy").innerHTML = "Accuracy: " + Math.round((accuracy + Number.EPSILON) * 100) / 100 + "%";
    }

    //Get accuracy of asteroids hit
    asteroidsPerSecond = (asteroidHits / (30 - gameTimer));
    document.querySelector(".asteroids-per-second").innerHTML = "Asteroids Per Second: " + Math.round((asteroidsPerSecond + Number.EPSILON) * 100) / 100;



}


function ShowEndScreen() {
    ClearAsteroid();
    bSpawnAsteroid = false;

    endScreen.style.display = "block";

    let EndScore = document.querySelector(".end-total-score");
    let EndAcc = document.querySelector(".end-accuracy");
    let EndAps = document.querySelector(".end-aps");

    EndScore.innerHTML = "Asteroids Hits: " + asteroidHits;
    EndAcc.innerHTML = "Accuracy:" + Math.round((accuracy + Number.EPSILON) * 100) / 100 + "%";
    EndAps.innerHTML = "Asteroids Per Second: " + Math.round((asteroidsPerSecond + Number.EPSILON) * 100) / 100;
}



function randomIntFromInterval(min, max) // min and max included 
{
    return Math.random() * (max - min) + min;
}

function SpawnAsteroid(x, y) //Spawn Asteroid At position x and y
{
    asteroid.style.display = "flex";
    asteroid.style.position = "absolute"; // Ensure the asteroid is positioned absolutely
    asteroid.style.left = x + "px";
    asteroid.style.top = y + "px";
    bSpawnAsteroid = false;

}

function ClearAsteroid() {
    asteroid.style.display = "none";
    asteroidHits++;
    bSpawnAsteroid = true;
}

var additionalInformationTab = document.querySelector(".additional-information");

var readMoreButtonMobile = document.querySelector(".read-more");
var closeAdditionalInformation = document.querySelector(".close-tab");

readMoreButtonMobile.addEventListener("click", function () { additionalInformationTab.style.bottom = "0px"; });
closeAdditionalInformation.addEventListener("click", function () { additionalInformationTab.style.bottom = "-500px"; });


//Add onclick buttons to About Moon and Planets page
planetsButton.addEventListener("click", OpenPlanetPage);
aboutButton.addEventListener("click", OpenAboutPage);
gamesButton.addEventListener("click", OpenGamesPage);
moonsButton.addEventListener("click", OpenMoonsPage);

for (let i = 0; i < prevButton.length; i++) {
    prevButton[i].addEventListener("click", PrevPlanet);
}

for (let i = 0; i < nextButton.length; i++) {
    nextButton[i].addEventListener("click", NextPlanet);
}

// Handle Planet Brief Selectors (Add color and change on click)
planetBriefSelector[planetIndex].style.color = "White";
planetBriefSelector[planetIndex].style.borderColor = "White";

planetBriefSelector[0].addEventListener("click", function () { ChangePlanetBrief(0); });
planetBriefSelector[1].addEventListener("click", function () { ChangePlanetBrief(1); });
planetBriefSelector[2].addEventListener("click", function () { ChangePlanetBrief(2); });
planetBriefSelector[3].addEventListener("click", function () { ChangePlanetBrief(3); });
planetBriefSelector[4].addEventListener("click", function () { ChangePlanetBrief(4); });
planetBriefSelector[5].addEventListener("click", function () { ChangePlanetBrief(5); });
planetBriefSelector[6].addEventListener("click", function () { ChangePlanetBrief(6); });


//Handle Asteroid Shooting Game
var gameStartButton = document.querySelector(".start-game-button");
var asteroid = document.querySelector(".asteroid"); //Asteroid 
var asteroidAudio = document.querySelector("#asteroid-audio");

gameStartButton.addEventListener("click", StartGame);
asteroid.addEventListener("click", function () { ClearAsteroid(); asteroidAudio.play();}); //Clear Asteroid on click

//Handle Planet Creation Game

var topButtonNext = document.querySelector(".top-next");
var topButtonPrev = document.querySelector(".top-previous");

var middleButtonNext = document.querySelector(".middle-next");
var middleButtonPrev = document.querySelector(".middle-previous");

var bottomButtonNext = document.querySelector(".bottom-next");
var bottomButtonPrev = document.querySelector(".bottom-previous");

topButtonNext.addEventListener("click", function () { NextPlanetPart("top"); });
middleButtonNext.addEventListener("click", function () { NextPlanetPart("middle"); });
bottomButtonNext.addEventListener("click", function () { NextPlanetPart("bottom"); });

topButtonPrev.addEventListener("click", function () { PrevPlanetPart("top"); });
middleButtonPrev.addEventListener("click", function () { PrevPlanetPart("middle"); });
bottomButtonPrev.addEventListener("click", function () { PrevPlanetPart("bottom"); });

//Handle Hamburger menu

const hamMenu = document.querySelector(".hamburger-menu");

const navMenu = document.querySelector(".nav-titles");

hamMenu.addEventListener("click", function () { hamMenu.classList.toggle('active'); navMenu.classList.toggle('active'); });

//Handle dropdown planet menu for mobile
const mobilePlanetSelector = document.querySelector(".mobile-planet-selector");
console.log(mobilePlanetSelector);
const planetSelector = document.querySelector(".planet-selector");
mobilePlanetSelector.addEventListener("click", function () { planetSelector.classList.toggle('active'); document.querySelector(".mobile-planet-selector h2").classList.toggle('active'); });

var retryButton = document.querySelector(".retry-button");

retryButton.addEventListener("click", StartGame);