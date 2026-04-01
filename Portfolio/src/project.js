import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NavBar = document.querySelector(".nav-bar");
const ProjectTitle = document.querySelector(".project-title");
const ProjectImages = document.querySelector('#project-images');
const ProjectScroller = document.querySelector(".project-scroller");

let bProjectPageOpen = false;
let ProjectScrollCurrent = 0;
let ProjectScrollTarget = 0;
let ProjectScrollMax = 0;
let ProjectScrollTween = null;

function GoToHomePage() {
    window.location.href = `../index.html`;
}

function LoadPage() {
    gsap.fromTo(
        ProjectTitle,
        {
            scale: 0,
        },
        {
            scale: 1,
            duration: 2.5,
            ease: "power3.inout",
            onComplete: () => {
                gsap.fromTo(
                    ProjectTitle,
                    { scale: 1 },
                    {
                        scale: 0.5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".project-title-section",
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );
            }
        }
    );
}

function UpdateProjectScrollBounds() {
    ProjectScrollMax = Math.max(0, ProjectScroller.scrollWidth - window.innerWidth);
    ProjectScrollTarget = Math.max(0, Math.min(ProjectScrollTarget, ProjectScrollMax));
    ProjectScrollCurrent = Math.max(0, Math.min(ProjectScrollCurrent, ProjectScrollMax));
}

function ApplyProjectScroll(force = false) {
    if (ProjectScrollTween) ProjectScrollTween.kill();

    if (force) {
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

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    const atStart = ProjectScrollTarget <= 0;
    const atEnd = ProjectScrollTarget >= ProjectScrollMax;

    if ((scrollingUp && atStart) || (scrollingDown && atEnd)) {
        return;
    }

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

function SetupProjectSectionTrigger() {
    ScrollTrigger.create({
        trigger: "#project-images",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            bProjectPageOpen = true;
        },
        onLeave: () => {
            bProjectPageOpen = false;
        },
        onEnterBack: () => {
            bProjectPageOpen = true;
        },
        onLeaveBack: () => {
            bProjectPageOpen = false;
        }
    });
}

window.addEventListener("load", () => {
    UpdateProjectScrollBounds();
    ApplyProjectScroll(true);
    SetupProjectSectionTrigger();
    LoadPage();
});

window.addEventListener("resize", () => {
    UpdateProjectScrollBounds();
    ApplyProjectScroll(true);
    ScrollTrigger.refresh();
});

NavBar.addEventListener('click', GoToHomePage);
window.addEventListener('wheel', HandleProjectWheel, { passive: false });