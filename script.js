
var planetImg = document.querySelector(".planet-img");
var planetInformation = document.querySelector("#planet-information");

var planetName = document.querySelector(".planet-name");
var distanceFromSun = document.querySelector(".distance-from-sun");
var sizeOfPlanet = document.querySelector(".size-of-planet");

var planetIndex = 0;
var planetTopIndex = 0;
var planetMiddleIndex = 0;
var planetBottomIndex = 0;

const numPlanets = 8;

const planetNames = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

const planetImages = ["image/mercury-planet.png", "image/venus-planet.png", "image/earth-planet.png", "image/mars-planet.png"
                    , "image/jupiter-planet.png", "image/saturn-planet.png", "image/uranus-planet.png", "image/neptune-planet.png"
]
                    
const planetTopImages = ["image/mercury-top.png", "image/venus-top.png", "image/earth-top.png", "image/mars-top.png",
                        "image/jupiter-top.png", "image/saturn-top.png", "image/uranus-top.png", "image/neptune-top.png"
];

const planetMiddleImages = ["image/mercury-middle.png", "image/venus-middle.png", "image/earth-middle.png", "image/mars-middle.png",
                            "image/jupiter-middle.png", "image/saturn-middle.png", "image/uranus-middle.png", "image/neptune-middle.png"
];

const planetBottomImages = ["image/mercury-bottom.png", "image/venus-bottom.png", "image/earth-bottom.png", "image/mars-bottom.png",
                            "image/jupiter-bottom.png", "image/saturn-bottom.png", "image/uranus-bottom.png", "image/neptune-bottom.png"
];


const planetDistance = ["52.702 Million Kilometers (Closest) ", "107.53 Million Kilometers", "149 Million Kilometers","228 Million kilometers",
                    "778 Million Kilometers","1.43 Billion Kilometers ","2.9 Billion Kilometers ","4.5 Billion Kilometers (Farthest) "]

const planetSizes = ["74.8 million km²", "460.2 million km²", "510.1 million km²", "144.4 million km²", 
                "61.42 billion km²", "42.7 billion km²", "8.083 billion km²", "7.618 billion km²"
]

//Sections of different pages
const planetPage = document.querySelector("#planets");
const aboutPage = document.querySelector("#about");
const gamesPage = document.querySelector("#games");


var planetBriefSelector = document.querySelectorAll(".planet-selector h3");

var planetBriefSelectorBool = [true, false, false, false, false, false, false, false] //Used to check which planet selector is selected (default is mercury selected)

var planetsButton = document.querySelector(".planets-button");
var aboutButton = document.querySelector(".about-button");
var moonsButton = document.querySelector(".moons-button");
var gamesButton = document.querySelector(".games-button");


var prevButton = document.querySelector(".previous");
var nextButton = document.querySelector(".next");

var gameTimer = 0; //Timer used for asteroid game
var gameTimerCounter = 0; //Timer used for asteroid game

var bSpawnAsteroid = false;

//Variables for asteroid game
var asteroidHits = 0;
var asteroidsPerSecond = 0;
var accuracy = 0;
var totalClicks = 0;


var planetTopPart = document.querySelector(".top-planet-part");
var planetMiddlePart = document.querySelector(".middle-planet-part");
var planetBottomPart = document.querySelector(".bottom-planet-part");

function AddSlideNextAnim()
{    
    //reset elements
    planetImg.classList.remove("slidenxt-anim");
    planetImg.classList.remove("slideprev-anim");
    planetInformation.classList.remove("slidenxt-anim");
    planetInformation.classList.remove("slideprev-anim");

    planetPage.offsetHeight;

    planetImg.classList.add("slidenxt-anim");
    planetInformation.classList.add("slidenxt-anim");

}

function AddSlidePrevAnim()
{
    planetImg.classList.remove("slideprev-anim");
    planetImg.classList.remove("slidenxt-anim");
    planetInformation.classList.remove("slideprev-anim");
    planetInformation.classList.remove("slidenxt-anim");

    planetPage.offsetHeight;

    planetImg.classList.add("slideprev-anim");
    planetInformation.classList.add("slideprev-anim");
}



function ShowPlanet(index)
{    
    //Clear planet brief selection
    for(let i = 0 ; i < planetBriefSelector.length; i++)
    {
        if(planetBriefSelectorBool[i] == true)
        {
            planetBriefSelector[i].style.color = "#333333";
            planetBriefSelector[i].style.borderColor = "#333333";
            planetBriefSelectorBool[i] = false;
        }
    }

    //Set information of planet
    planetName.innerHTML = planetNames[index];
    planetImg.src = planetImages[index];
    distanceFromSun.innerHTML = "<strong>Distance From Sun: </strong>" + planetDistance[index];
    sizeOfPlanet.innerHTML = "<strong>Size Of Planet: </strong>" + planetSizes[index];

    //Select correct planet brief
    planetBriefSelectorBool[index] = true;
    planetBriefSelector[index].style.color = "White";
    planetBriefSelector[index].style.borderColor = "White";
    
}

function ChangePlanetBrief(index)
{
    
    planetIndex = index;
    //Show planet
    ShowPlanet(index);
    //Reset animation
    AddSlideNextAnim();


}

//Functions for opening different pages
function OpenPlanetPage()
{
    //Close Games, About and Moons page
    aboutPage.style.display = "none";
    gamesPage.style.display = "none";

    //Display planet page
    planetPage.style.display = "flex";

    aboutButton.style.textDecoration = "none";
    gamesButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "underline";

    AddSlideNextAnim();
}

function OpenAboutPage()
{
    //Close games, moons and planets page
    planetPage.style.display = "none";
    gamesPage.style.display = "none";

    //Display about page
    aboutPage.style.display = "grid";

    aboutButton.style.textDecoration = "underline";
    gamesButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "none";
}

function OpenGamesPage() {
    //Close about,  moons and planets page
    planetPage.style.display = "none";
    aboutPage.style.display = "none";

    //Display about page
    gamesPage.style.display = "flex";

    gamesButton.style.textDecoration = "underline";
    aboutButton.style.textDecoration = "none";
    planetsButton.style.textDecoration = "none";
}

function NextPlanet()
{
    //Check if index >= total number of planets
    if(planetIndex >= numPlanets - 1)
    {
        //Reset index
        planetIndex = 0;
    }
    else
    {
        planetIndex++;
    }
    //set planet information
    ShowPlanet(planetIndex);

    AddSlideNextAnim();
}

function PrevPlanet()
{
    //Check if index <= 0
    if(planetIndex <= 0)
    {
        //Set the index to the max number of planets
        planetIndex = numPlanets - 1;
    }
    else
    {
        planetIndex--;
    }
    //set planet information
    ShowPlanet(planetIndex);
    AddSlidePrevAnim();
}

function NextPlanetPart(type)
{
    if (type == "top")
    {
        if (planetTopIndex >= numPlanets - 1) {
            //Reset index
            planetTopIndex = 0;
        }
        else {
            planetTopIndex++;
        }

        planetTopPart.src = planetTopImages[planetTopIndex];
    }

    else if (type == "middle")
    {
        if (planetMiddleIndex >= numPlanets - 1) {
            //Reset index
            planetMiddleIndex = 0;
        }
        else {
            planetMiddleIndex++;
        }
        planetMiddlePart.src = planetMiddleImages[planetMiddleIndex];
    }

    else
    {
        if (planetBottomIndex >= numPlanets - 1) {
            //Reset index
            planetBottomIndex = 0;
        }
        else {
            planetBottomIndex++;
        }
        planetBottomPart.src = planetBottomImages[planetBottomIndex];

    }
}

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

}

//Function for randomly spawning asteroids
function StartGame()
{
    gameTimer = 30;

    //Start a timer of 30 seconds
    let gameInterval = setInterval(PlayGame, 33); //33ms is roughly 30fps

    var timer = setInterval(function () {
        document.querySelector(".game-timer").innerHTML = "Timer: " + gameTimer;
        gameTimer--
        if (gameTimer <= 0)
        {
            clearInterval(gameInterval);
            clearInterval(timer);
        }
    }, 1000)


    //Remove start button
    gameStartButton.style.display = "none";
    bSpawnAsteroid = true;



    let gameArea = document.querySelector(".asteroid-game-background");
    gameArea.addEventListener("click", function(){totalClicks++; return 0
    });

    //Reset game variables
    totalClicks = -1;
    asteroidHits = 0;
    accuracy = 100;
    asteroidsPerSecond = 0;
}

function PlayGame()
{

    
    let gameArea = document.querySelector(".asteroid-game-background");
    let gameWidth = gameArea.offsetWidth;
    let gameHeight = gameArea.offsetHeight;
    let gameLeft = gameArea.offsetLeft;
    let gameTop = gameArea.offsetTop;

    document.querySelector(".score").innerHTML = "Asteroids Hit: " + asteroidHits;





    if(bSpawnAsteroid)
    {
        let rndX = randomIntFromInterval(gameLeft + asteroid.offsetWidth, gameLeft + gameWidth - asteroid.offsetWidth);
        let rndY = randomIntFromInterval(gameTop + asteroid.offsetHeight, gameTop + gameHeight - asteroid.offsetHeight);
    
        SpawnAsteroid(rndX, rndY);
    }

    console.log(totalClicks);

    //Get accuracy of asteroids hit
    if(totalClicks > 0)
    {
        accuracy = (asteroidHits / totalClicks) * 100;
        document.querySelector(".accuracy").innerHTML = "Accuracy: " + Math.round((accuracy + Number.EPSILON) * 100) / 100 + "%";
    }

    //Get accuracy of asteroids hit
    asteroidsPerSecond = (asteroidHits / (30 - gameTimer));
    document.querySelector(".asteroids-per-second").innerHTML = "Asteroids Per Second: " + Math.round((asteroidsPerSecond + Number.EPSILON) * 100) / 100;


    
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function SpawnAsteroid(x, y) //Spawn Asteroid At position x and y
{
    asteroid.style.display = "flex";
    asteroid.style.position = "absolute"; // Ensure the asteroid is positioned absolutely
    asteroid.style.left = x + "px";
    asteroid.style.top = y + "px";
    bSpawnAsteroid = false;

}

function ClearAsteroid()
{    
    asteroid.style.display = "none";
    asteroidHits++;
    bSpawnAsteroid = true;
}

//Add onclick buttons to About Moon and Planets page
planetsButton.addEventListener("click", OpenPlanetPage);
aboutButton.addEventListener("click", OpenAboutPage);
gamesButton.addEventListener("click", OpenGamesPage);


prevButton.addEventListener("click", PrevPlanet);
nextButton.addEventListener("click", NextPlanet);

// Handle Planet Brief Selectors (Add color and change on click)
planetBriefSelector[planetIndex].style.color = "White";
planetBriefSelector[planetIndex].style.borderColor = "White";

for(let i = 0; i < planetBriefSelector.length; i++)
{
    planetBriefSelector[i].addEventListener("click", function(){ChangePlanetBrief(i)});
}

//Handle Asteroid Shooting Game
var gameStartButton = document.querySelector(".start-game-button");
var asteroid = document.querySelector(".asteroid"); //Asteroid 

gameStartButton.addEventListener("click", StartGame);
asteroid.addEventListener("click", ClearAsteroid) //Clear Asteroid on click

//Handle Planet Creation Game

var topButtonNext = document.querySelector(".top-next");
var topButtonPrev = document.querySelector(".top-previous");

var middleButtonNext = document.querySelector(".middle-next");
var middleButtonPrev = document.querySelector(".middle-previous");

var bottomButtonNext = document.querySelector(".bottom-next");
var bottomButtonPrev = document.querySelector(".bottom-previous");

topButtonNext.addEventListener("click", function () { NextPlanetPart("top") });
middleButtonNext.addEventListener("click", function () { NextPlanetPart("middle") });
bottomButtonNext.addEventListener("click", function () { NextPlanetPart("bottom") });

topButtonPrev.addEventListener("click", function () { PrevPlanetPart("top") });
middleButtonPrev.addEventListener("click", function () { PrevPlanetPart("middle") });
bottomButtonPrev.addEventListener("click", function () { PrevPlanetPart("bottom") });


