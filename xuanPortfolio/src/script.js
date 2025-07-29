//Initialize Color thief
const colorThief = new ColorThief();

//Get all cards
const cards = Array.from(document.querySelectorAll('.project-cards'));

const navButtons = document.querySelectorAll(".nav-bar a");
const navText = document.querySelectorAll(".nav-bar a h2");

console.log(navButtons);
console.log(navText);

const totalcards = cards.length;
const middleIndex = Math.floor(totalcards / 2);

const cardTranslateXList = [];
const cardTranslateYList = [];

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

const cardShiftXMult = 7;
const cardShiftYMult = 13;
const cardShiftSpeedMult = 0.3;

var TopCardIndex = 0;
var BottomCardIndex = cards.length - 1; 

let selectedProjectName = "";

var cardHovered = false;

const label = document.getElementById("cursor-label");
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.querySelectorAll('.project-cards').forEach(img => {
  img.addEventListener('click', () => {
    const rect = img.getBoundingClientRect();
    const src = img.dataset.src || img.src;
    const alt = img.alt;
    const topPos = Math.round(rect.top + window.scrollY); // include scroll offset
    const leftPos = Math.round(rect.left + window.scrollX); // include scroll offset

    const query = new URLSearchParams({
      src,
      alt,
      top: topPos,
      left: leftPos
    }).toString();

    const href = img.dataset.href;
    if (href) {
      window.location.href = `${href}${query}`;
    }
  });
});
//setTimeout(initializeCards, 100);
initializeCards();

function onNavEnter(index)
{
  navText[index].classList.add("selected");
}

function onNavExit(index)
{
  navText[index].classList.remove("selected");
}


function initializeCards()
{
  for (let i = 0; i < cards.length; i++)
  {

    //Set Background Image
    let srcUrl = cards[i].getAttribute('src');
    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = srcUrl;
    image.onload = function () 
    {

      let color = colorThief.getColor(image);
      let rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      cards[i].style.borderColor = rgb;
      //cards[i].style.boxShadow = `0 20px 40px ${rgb}`;
    }


    let offset = i - middleIndex;

    cards[i].style.zIndex = totalcards - Math.abs(offset);

    let tx = offset * cardShiftXMult;
    let ty = offset * -cardShiftYMult

    cards[i].style.zIndex = cards.length - i;
    animateCardTo(i, tx, ty, 0);
    gsap.to(cards[i],
      {
        duration: 0.3,
      opacity:1
    })

    cardTranslateXList[i] = tx;
    cardTranslateYList[i] = ty;

    cards[i].addEventListener('mouseenter', () => OnHoverCardsEnter(i));
    cards[i].addEventListener('mouseleave', () => OnHoverCardsExit(i));

    setTimeout(() => {
      cards[i].style.transition = '0s';

    }, Math.pow(1.5, Math.abs(offset)) * 90);


    }
}

function OnHoverCardsEnter(index)
{
  cardHovered = true;
  selectedProjectName = (cards[index].alt).toUpperCase();
  const tx = cardTranslateXList[index] + 10;
  const ty = cardTranslateYList[index] + 5; 
  animateCardTo(index, tx, ty);

  
}

function OnHoverCardsExit(index)
{
  cardHovered = false;
  const tx = cardTranslateXList[index];
  const ty = cardTranslateYList[index];

  animateCardTo(index, tx, ty);
}

function ShiftCardIndicesUpByOne()
{
  const firstCard = cards[0];
  cards.splice(0, 1);
  cards.push(firstCard);

  const firstX = cardTranslateXList[0];
  const firstY = cardTranslateYList[0];
  cardTranslateXList.splice(0, 1);
  cardTranslateYList.splice(0, 1);
  cardTranslateXList.push(firstX);
  cardTranslateYList.push(firstY);
}

function ShiftCardIndicesDownByOne() {
  const lastCard = cards[cards.length - 1];
  cards.pop();
  cards.unshift(lastCard);

  const lastX = cardTranslateXList[cardTranslateXList.length - 1];
  const lastY = cardTranslateYList[cardTranslateYList.length - 1];
  cardTranslateXList.pop();
  cardTranslateYList.pop();
  cardTranslateXList.unshift(lastX);
  cardTranslateYList.unshift(lastY);
}



function OnScrollUpCards()
{
  
  const maxY = Math.max(...cardTranslateYList);

  for (let i = 0; i < cards.length; i++)
  {
   
    let rect = cards[i].getBoundingClientRect();
    
    if (rect.top >= window.innerHeight)
    {

      continue;
    }

    var tx = cardTranslateXList[i] + cardShiftXMult * cardShiftSpeedMult;
    var ty = cardTranslateYList[i] - cardShiftYMult * cardShiftSpeedMult;

    animateCardTo(i, tx, ty);
 
    cardTranslateXList[i] = tx;
    cardTranslateYList[i] = ty;

  
  }


} 

function OnScrollDownCards() {

  for (let i = 0; i < cards.length; i++) {

    var tx = cardTranslateXList[i] - cardShiftXMult * cardShiftSpeedMult;
    var ty = cardTranslateYList[i] + cardShiftYMult * cardShiftSpeedMult;

    animateCardTo(i, tx, ty);

    cardTranslateXList[i] = tx;
    cardTranslateYList[i] = ty;

  }

}

function updateLabel() {
  if (!cardHovered) {
    label.style.opacity = 0;
    label.textContent = "";
  }
  else
  {
    label.style.opacity = 1;
    label.textContent = selectedProjectName;
  }

  label.style.left = `${mouseX}px`;
  label.style.top = `${mouseY}px`;
  requestAnimationFrame(updateLabel);
}

updateLabel();

function animateCardTo(index, tx, ty, duration = 0.3) {
  gsap.to(cards[index], {
    duration,
    skewY: 15,
    rotateZ: 0,
    x: `${tx}vw`,
    y: `${ty}vh`
  });
}

for (let i = 0; i < navButtons.length; i++)
{
  navButtons[i].addEventListener("mouseenter", () => onNavEnter(i))
  navButtons[i].addEventListener("mouseleave", () => onNavExit(i))

}





