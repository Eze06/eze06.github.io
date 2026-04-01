import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CircleType from "circletype";


gsap.registerPlugin(ScrollTrigger);

const VinylPage = document.querySelector(".vinyl-page");
const VinylElem = document.querySelector(".vinyl");
const VinylFrontElem = document.querySelector(".vinyl-front");
const VinylBackElem = document.querySelector(".vinyl-back");

const VinylDisc = document.querySelector(".vinyl-disc");
const VinylButtonParent = document.querySelector('.vinyl-button');

const AboutHeader = document.querySelector('.about-header');
const AboutMePage = document.querySelector('#about-me-page');

const ProjectHeader = document.querySelector('.project-header');
const ProjectPage = document.querySelector('#project-page');

const ProjectOverviewTexts = document.querySelectorAll(".project-overview-text");
const ProjectTitleFront = document.querySelectorAll(".project-section-title-front");
const ProjectTitleBack = document.querySelectorAll(".project-section-title-back");


const ProjectScroller = document.querySelector(".project-scroller");
const ProjectSectionImage = document.querySelectorAll(".project-section-image img");
const ProjectSectionImageDiv = document.querySelectorAll(".project-section-image");

const AboutHeaderButton = document.querySelector(".about-header-btn");
const SkillsHeaderButton  = document.querySelector(".skills-header-btn");
const ShowreelHeaderButton = document.querySelector(".showreel-header-btn");

const AboutDescription = document.querySelector(".description-about");
const SkillsDescription = document.querySelector(".description-skills");
const ShowreelDescription = document.querySelector('.description-showreel');


const ProjectNames = ["cardiva", "engarde", "konranbou", "xpofolio", "verdant", "pryze", "requiem", "solarsystem"];


//Project Scroller Variables
let bProjectPageOpen = false;
let ProjectScrollCurrent = 0;
let ProjectScrollTarget = 0;
let ProjectScrollMax = 0;
let ProjectScrollTween = null;



const TitleElem = document.querySelector("#title");
const NavBar = document.querySelector(".nav-bar");


const mount = document.getElementById("webgl-bg");

const VinylButtonText = document.querySelector(".vinyl-button-text");



var bVinylOpenAnimPlaying = false;
var bVinylOpened = false;
var bHomePageShown = true;

var bAnimationPlaying = false;

new CircleType(VinylButtonText);


if (!mount) throw new Error("Missing #webgl-bg");

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(mount.clientWidth, mount.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
mount.appendChild(renderer.domElement);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  mount.clientWidth / mount.clientHeight,
  0.1,
  60
);
camera.position.set(0, 1.2, 8);

const scene = new THREE.Scene();

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.12));

// Spotlight (main “studio” light)
const spot = new THREE.SpotLight(0xffffff, 2.0, 30, Math.PI * 0.18, 0.45, 1.2);
spot.position.set(0, 6.5, 4.0);
spot.target.position.set(0, 0.0, 0.0);
scene.add(spot);
scene.add(spot.target);

// A subtle rim light from behind
const rim = new THREE.DirectionalLight(0xffffff, 0.18);
rim.position.set(-3, 2, -6);
scene.add(rim);


// Flip Vinyl 
function FlipVinyl() {

  bVinylOpenAnimPlaying = true;
  bAnimationPlaying = true;

  VinylElem.removeEventListener("mouseenter", PlayVinylHoverTween);
  VinylElem.removeEventListener("mouseleave", ReverseVinylHoverTween);
  VinylElem.removeEventListener('click', FlipVinyl);

  gsap.set(VinylElem, { pointerEvents: "none" });
  gsap.to(TitleElem, { opacity: 0, duration: 0.25, overwrite: "auto" });
  gsap.to(VinylButtonParent, { opacity: 0, zIndex: -1, duration: 0.25, overwrite: "auto" });


  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },
    onComplete: () =>
    {
      bVinylOpened = true;
      bVinylOpenAnimPlaying = false;
      bHomePageShown = false;
      bAnimationPlaying = false;

    }

  });

  tl
    .to(VinylElem, {
      scale: 1.15,
      duration: 1,
      ease: "power2.out"
    })

    .to(VinylElem, {
      rotationZ: 0,
      duration: 1
    })

    .to(VinylFrontElem, {
      rotationY: -180,
      duration: 1,
      ease: "power2.inOut"

    })
    .to(VinylBackElem, {
      rotationY: 180,
      duration: 1,
      ease: "power2.inOut"

    }, "<0.5")

}
//Function To Close Vinyl
//Params: {ShowMainMenu -> boolean to check if show title and vinyl button}
function CloseVinyl(ShowMainMenu = true)
{
  bAnimationPlaying = true;

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },
    
    onComplete: () =>
    {
      bAnimationPlaying = false;

      VinylElem.addEventListener('mouseenter', PlayVinylHoverTween);
      VinylElem.addEventListener('mouseleave', ReverseVinylHoverTween);
      VinylElem.addEventListener('click', FlipVinyl);
      
      ReverseVinylHoverTween();

      if (ShowMainMenu)
      {
        gsap.set(VinylElem, { pointerEvents: "all" });
        gsap.to(TitleElem, { opacity: 1, duration: 0.25, overwrite: "auto" });
        gsap.to(VinylButtonParent, { opacity: 1, zIndex: 0, duration: 0.25, overwrite: "auto" });
        
        bVinylOpened = false;
      }

    }

  });

  tl.to(
    VinylBackElem,
    {
      rotationY: 0,
      duration: 1,
      ease: "power2.inOut"
    }
  )
  .to(VinylFrontElem, {
    rotationY: 0,
    duration: 1,
    ease: "power2.inOut"

  }, "<0.5")
    .to(VinylElem, {
      rotationZ: -5,
      duration:1,
    })
    .to(VinylElem, 
      {
        scale: 1,
        duration: 1,
        ease: "power2.out",
    }
  )


  

}

var bOpeningHomePage = false;

function OpenHomePage() {

  if (bOpeningHomePage || bVinylOpenAnimPlaying || bHomePageShown || bAnimationPlaying) return;
  bOpeningHomePage = true;

  bAnimationPlaying = true;
  console.log("Opening Home Page");
  
  bProjectPageOpen = false;
  
  if (bVinylOpened) {
    CloseVinyl(false);
  }

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },
    onComplete: () => {
      gsap.set(VinylElem, { pointerEvents: "all" });
      gsap.set(VinylPage, { pointerEvents: "none" });

      bOpeningHomePage = false
      bAnimationPlaying = false;

    }


  });

  //Close About Page
  tl.to(AboutMePage, { opacity: 0, ease: "power2.out", pointerEvents: "none", duration: 1 })
  tl.to(ProjectPage, { opacity: 0, pointerEvents: 'none', ease: "power2.out", duration: 1 }, "<")
  //Open Home Page
  

  tl.to(VinylElem, { opacity: 1, duration: 2 })
    .to(TitleElem, { opacity: 1, duration: 2}, '<')
  .to(VinylButtonParent, {opacity:1, zIndex:1, duration: 2}, "<")
  
}

//Load Index Page
function LoadIndexPage() {
  console.log("Loading Index Page");

  const LoadDuration = 1.5;

  gsap.fromTo(VinylElem,
    {
      opacity: 0,
    },
    {
      ease: "power1.in",
      opacity: 1,
      duration: LoadDuration,
    }
  )

  gsap.fromTo(TitleElem,
    {
      opacity: 0,
    },
    {
      ease: "power1.in",
      opacity: 1,
      duration: LoadDuration,
    }
  )

  gsap.fromTo(VinylButtonParent,
    {
      opacity: 0,
    },
    {
      ease: "power1.in",
      opacity: 1,
      duration: LoadDuration,

    }
  )
}

//Hover for vinyls
const VinylHoverTween = gsap.to(VinylElem, {
  width: "51vh",
  height: "51vh",
  duration: 0.4,
  paused: true,
  overwrite: "auto"
});


function PlayVinylHoverTween() { VinylHoverTween.play(); };

function ReverseVinylHoverTween() { VinylHoverTween.reverse(); };

function OnProjectSectionImageHover(index)
{

  console.log("Hover");

  gsap.to(ProjectSectionImage[index], 
    {
      transform: "scale(1.2)",
      ease: "power2.out",
      duration: 0.3,
    }
  )

};

function OnProjectSectionImageExit(index) {

  console.log("HoverExit");

  gsap.to(ProjectSectionImage[index],
    {
      transform: "scale(1)",
      ease: "power2.out",
      duration: 0.3,
    }
  )

};

function OpenAboutMePage()
{

  if (bAnimationPlaying) return;  
  CloseVinyl(false);

  gsap.set(VinylElem, { pointerEvents: "none" });
  gsap.set(VinylPage, { pointerEvents: "none" });
  gsap.to(TitleElem, { opacity: 0, duration: 0.25, overwrite: "auto" });
  gsap.to(VinylButtonParent, { opacity: 0, zIndex: -1, duration: 0.25, overwrite: "auto" });

  bAnimationPlaying = true;

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },

    onComplete: () => {
      bHomePageShown = false;
      bAnimationPlaying = false;
    }

  });

  tl.to(VinylElem, { opacity: 0, pointerEvents: "none", duration: 2 });
  tl.to(AboutMePage, { opacity: 1, pointerEvents:"all",duration: 2 }, "< 1");

  
}

function UpdateProjectScrollBounds() {
  ProjectScrollMax = Math.max(0, ProjectScroller.scrollWidth - window.innerWidth);
  ProjectScrollTarget = Math.max(0, Math.min(ProjectScrollTarget, ProjectScrollMax));
  ProjectScrollCurrent = Math.max(0, Math.min(ProjectScrollCurrent, ProjectScrollMax));
}

function ApplyProjectScroll(Force = false) {
  if (ProjectScrollTween) ProjectScrollTween.kill();

  if (Force) {
    ProjectScrollCurrent = ProjectScrollTarget;
    gsap.set(ProjectScroller, { x: -ProjectScrollCurrent });
    return;
  }

  ProjectScrollTween = gsap.to(
    { value: ProjectScrollCurrent },
    {
      value: ProjectScrollTarget,
      duration: 0.75,
      ease: "power3.out",
      onUpdate: function () {
        ProjectScrollCurrent = this.targets()[0].value;
        gsap.set(ProjectScroller, { x: -ProjectScrollCurrent });
      }
    }
  );
}

function HandleProjectWheel(e) {
  if (!bProjectPageOpen) return;

  e.preventDefault();

  ProjectScrollTarget += e.deltaY * 1.75;
  ProjectScrollTarget = Math.max(0, Math.min(ProjectScrollTarget, ProjectScrollMax));

  ApplyProjectScroll();
}

function ResetProjectScroll() {
  ProjectScrollCurrent = 0;
  ProjectScrollTarget = 0;
  UpdateProjectScrollBounds();
  ApplyProjectScroll(true);
}

function OpenProjectPage()
{

  if (bAnimationPlaying) return;
  CloseVinyl(false);

  gsap.set(VinylElem, { pointerEvents: "none" });
  gsap.to(TitleElem, { opacity: 0, duration: 0.25, overwrite: "auto" });
  gsap.to(VinylButtonParent, { opacity: 0, zIndex: -1, duration: 0.25, overwrite: "auto" });

  bAnimationPlaying = true;

  ResetProjectScroll();

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },

    onComplete: () => {

      bHomePageShown = false;
      bAnimationPlaying = false;
      bProjectPageOpen = true;

      gsap.set(ProjectPage, { pointerEvents: "all" });

      UpdateProjectScrollBounds();
      ApplyProjectScroll(true);

    }

  });

  tl.to(VinylElem, { opacity: 0, pointerEvents: "none", duration: 2 });
  tl.to(ProjectPage, { opacity: 1, duration: 1 }, ">-0.5");
}

function OpenProject(ProjectIndex)
{

  const sections = document.querySelectorAll(".project-section");
  const section = sections[ProjectIndex];

  if (!section) return;

  const sectionCenter = section.offsetLeft + section.offsetWidth / 2;
  const viewportCenter = window.innerWidth / 2;

  ProjectScrollTarget = sectionCenter - viewportCenter;
  ProjectScrollTarget = Math.max(0, Math.min(ProjectScrollTarget, ProjectScrollMax));

  ProjectSectionImage[ProjectIndex].removeEventListener('mouseleave', projectHandlers[ProjectIndex].handleProjectMouseLeave);
  ProjectSectionImage[ProjectIndex].removeEventListener('mouseenter', projectHandlers[ProjectIndex].handleProjectMouseEnter);


  if (ProjectScrollTween) ProjectScrollTween.kill();

  ProjectScrollTween = gsap.to(
    { value: ProjectScrollCurrent },
    {
      value: ProjectScrollTarget,
      duration: 0.8,
      ease: "power3.out",
      onUpdate: function () {
        ProjectScrollCurrent = this.targets()[0].value;
        gsap.set(ProjectScroller, { x: -ProjectScrollCurrent });
      },
      onComplete: () => {
        console.log("Centered");
      }
    }
  );

  let ProjectName = ProjectNames[ProjectIndex];

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },

    onComplete: () => {
      window.location.href = `./${ProjectName}/`;
    }

  });

  tl.to(
    ProjectSectionImage[ProjectIndex],
    {
      cursor: "default", 
      scale: 1,
      duration: 0.3,
    }
  )  
  tl.to(
    ProjectOverviewTexts[ProjectIndex],
    {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",

    }
  )
  tl.to(
    ProjectTitleFront[ProjectIndex],
    {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    }
    ,
    "<"
  )
  tl.to(
    ProjectTitleBack[ProjectIndex],
    {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",

    }
    ,
    "<"
  )
  tl.to(
    ProjectSectionImageDiv[ProjectIndex],
    {
      zIndex: 3,
      position: "absolute",
      width: "100vw",
      height: "100vh",
      flexBasis: "100vw",
      duration: 0.5,
      ease: "power2.out"
    }
  )
  
}


// Dust particles (Points)
const dustCount = 1800;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);

for (let i = 0; i < dustCount; i++) {
  const i3 = i * 3;
  dustPos[i3 + 0] = (Math.random() - 0.5) * 14;   // x
  dustPos[i3 + 1] = Math.random() * 8 - 1.0;      // y
  dustPos[i3 + 2] = (Math.random() - 0.5) * 12;   // z
}

dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));

const dustMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02,
  transparent: true,
  opacity: 0.55,
  depthWrite: false
});

const dust = new THREE.Points(dustGeo, dustMat);
scene.add(dust);

// Mouse parallax (subtle)
let mx = 0, my = 0;
window.addEventListener("mousemove", (e) => {
  mx = (e.clientX / window.innerWidth) * 2 - 1;
  my = (e.clientY / window.innerHeight) * 2 - 1;
});

// Resize
function resize() {
  const w = mount.clientWidth;
  const h = mount.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  UpdateProjectScrollBounds();
  ApplyProjectScroll(true);
}

window.addEventListener("resize", resize);

function damp(v, t, a) { return v + (t - v) * a; }

let t = 0;

var discRotatation = 0;
var discRotationSpeed = 0.5;
var vinylTextRotationSpeed = 0.1;
var vinylTextRotation = 0;

var CanUseDescriptionBtns = true;
var AboutShown = true;
var SkillsShown = false;
var ShowReelShown = false;

function ShowAbout()
{

  if (!CanUseDescriptionBtns || AboutShown) return;

  SkillsShown = false;
  ShowReelShown = false;
  AboutShown = true;

  CanUseDescriptionBtns = false;

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },

    onComplete: () => {
      CanUseDescriptionBtns = true;
    }

  });

  gsap.set(SkillsHeaderButton, { color: "white" });
  gsap.set(ShowreelHeaderButton, { color: "white" });
  gsap.set(AboutHeaderButton, { color: "#34D399" });

  tl.to(ShowreelDescription, { opacity: 0, duration: 0.5 })
    .to(SkillsDescription, { opacity: 0, duration: 0.5 }, "<")
    .to(AboutDescription, { opacity: 1, duration: 0.5 })

}

function ShowSkills()
{
  if (!CanUseDescriptionBtns || SkillsShown) return;

  AboutShown = false;
  ShowReelShown = false;
  SkillsShown = true;

  CanUseDescriptionBtns = false;

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },

    onComplete: () => {
      CanUseDescriptionBtns = true;
    }

  });

  gsap.set(ShowreelHeaderButton, { color: "white" });
  gsap.set(AboutHeaderButton, { color: "white" });
  gsap.set(SkillsHeaderButton, { color: "#34D399" });


  tl.to(ShowreelDescription, { opacity: 0, duration: 0.5 })
    .to(AboutDescription, { opacity: 0, duration: 0.5 }, "<")
    .to(SkillsDescription, { opacity: 1, duration: 0.5 })
}

function ShowShowreel()
{
  if (!CanUseDescriptionBtns || ShowReelShown) return;

  AboutShown = false;
  SkillsShown = false;
  ShowReelShown = true;

  CanUseDescriptionBtns = false;

  const tl = gsap.timeline({

    defaults: { overwrite: "auto" },

    onComplete: () => {
      CanUseDescriptionBtns = true;
    }

  });

  gsap.set(SkillsHeaderButton, { color: "white" });
  gsap.set(AboutHeaderButton, { color: "white" });
  gsap.set(ShowreelHeaderButton, { color: "#34D399" });

  tl.to(AboutDescription, { opacity: 0, duration: 0.5 })
    .to(SkillsDescription, { opacity: 0, duration: 0.5 }, "<")
    .to(ShowreelDescription, { opacity: 1, duration: 0.5 })
}

function animate() {
  requestAnimationFrame(animate);
  t += 0.01;


  // Parallax camera (tiny)
  camera.position.x = damp(camera.position.x, mx * 0.35, 0.05);
  camera.position.y = damp(camera.position.y, 1.2 + (-my * 0.20), 0.05);
  camera.lookAt(0, 0.2, 0);

  // Dust drift
  const pos = dust.geometry.attributes.position;
  for (let i = 0; i < dustCount; i++) {
    const i3 = i * 3;
    pos.array[i3 + 1] += Math.sin(t + i * 0.02) * 0.00035;
    pos.array[i3 + 0] += Math.cos(t + i * 0.015) * 0.00018;
  }
  pos.needsUpdate = true;

  discRotatation += discRotationSpeed;
  vinylTextRotation += vinylTextRotationSpeed;

  //Animate Vinly Disc
  VinylDisc.style.transform = `scale(0.22) rotate(${-discRotatation}deg)`;
  VinylButtonText.style.transform = `rotateZ(${vinylTextRotation}deg)`;

  renderer.render(scene, camera);
}
animate();

LoadIndexPage();

// //Add event listeners

// //Vinyl Event Listeners
VinylElem.addEventListener('click', FlipVinyl);
VinylElem.addEventListener('mouseenter', PlayVinylHoverTween);
VinylElem.addEventListener('mouseleave', ReverseVinylHoverTween);

VinylButtonParent.addEventListener('mouseenter', PlayVinylHoverTween);
VinylButtonParent.addEventListener('mouseleave', ReverseVinylHoverTween);

VinylButtonParent.addEventListener('click', FlipVinyl);
AboutHeader.addEventListener('click', OpenAboutMePage);
ProjectHeader.addEventListener('click', OpenProjectPage);

NavBar.addEventListener('click', OpenHomePage);

ProjectPage.addEventListener('wheel', HandleProjectWheel, { passive: false });

AboutHeaderButton.addEventListener('click', ShowAbout);
SkillsHeaderButton.addEventListener('click', ShowSkills);
ShowreelHeaderButton.addEventListener('click', ShowShowreel);

const projectHandlers = [];

ProjectSectionImage.forEach((element, index) => {
  const handleProjectMouseEnter = () => OnProjectSectionImageHover(index);
  const handleProjectMouseLeave = () => OnProjectSectionImageExit(index);
  const handleProjectMouseClick = () => OpenProject(index);

  element.addEventListener('mouseenter', handleProjectMouseEnter);
  element.addEventListener('mouseleave', handleProjectMouseLeave);

  element.addEventListener('click', handleProjectMouseClick);

  projectHandlers[index] = {
    handleProjectMouseEnter,
    handleProjectMouseLeave,
    handleProjectMouseClick
  };

});

