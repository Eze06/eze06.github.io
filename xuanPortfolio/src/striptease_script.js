const params = new URLSearchParams(window.location.search);
const page = document.querySelector(".page");
console.log(page);
window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

openCard();
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.fade-in img').forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 100%", 
            toggleActions: "play none none none",
        },
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    });
});

function openCard() {
    const img = document.createElement('img');
    console.log(params.get("src"));
    img.src = params.get("src");
    img.alt = "cardImage";
    
    const top = params.get("top");
    const left = params.get("left");

    gsap.set(page,
        {
            opacity: 0
        }
    )

    gsap.set(img, {
        position: 'absolute',
        height: '25vh',
        width: 'auto',
        top: `${top}px`,
        left: `${left}px`,
        skewY: 15
    });


    document.body.appendChild(img);


    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.to(img, {
        duration: 1,
        top: centerY,
        left: centerX,
        xPercent: -50,
        yPercent: -50,
        ease: "power3.out",
        onComplete: () =>
        {
            gsap.to(img,
                {
                    duration: 1,
                    skewY: 0,
                    ease: "power3.out",
                    onComplete: () =>
                    {
                        gsap.to(img,
                            {
                                duration: 1.5,
                                opacity: 0,
                                ease: "power3.inOut",
                            }
                        )
                        gsap.to(page,
                            {
                                duration: 3,
                                opacity: 1,

                            }
                        )
                    }
                }
            )
        }
        
    });
    
}

for (const [key, value] of params.entries()) {
    console.log(`${key}: ${value}`);
}