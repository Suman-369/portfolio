gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// rotating an arrow in navbar

let loader = null;

// Initialize preloader when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loader = document.getElementById("preloader");
    
    // Ensure preloader is visible initially
    if (loader) {
        loader.style.display = "flex";
        loader.style.visibility = "visible";
        loader.style.opacity = "1";
    }
});

// Improved preloader logic with better mobile support
window.addEventListener("load", () => {
    if (loader) {
        // Add a small delay to ensure everything is loaded
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 2000);
    } else {
        // Fallback: try to find loader again
        loader = document.getElementById("preloader");
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 500);
            }, 2000);
        }
    }
});

// Additional fallback for slow loading
setTimeout(() => {
    if (loader && loader.style.display !== "none") {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
}, 5000);

gsap.to("#nav svg", {
  rotate: 90,
  duration: 1,
  backgroundColor: "#111",
  scrollTrigger: {
    trigger: "#nav svg",
    scroller: "#main",
    start: "top -5%",
    end: "top -6%",
    scrub: 1
  }
})
gsap.to("#nav svg", {
  backgroundColor: "#111",
  scrollTrigger: {
    trigger: "#nav svg",
    scroller: "#main",
    start: "top -15%",
    end: "top -400%",
    scrub: 3
  }
})

// scrolling a namediv

gsap.to("#name-div h1", {
  transform: "translateX(calc(-100% - 2vw - 4px))",
  scrollTrigger: {
    trigger: "#name-div h1",
    scroller: "#main",
    // markers:true,
    scrub: 0.7
  }
})



gsap.from("#intro-div h1:nth-child(1)", {
  scrollTrigger: {
    trigger: "#intro-div h1:nth-child(1)",
    scroller: "#main",
    // markers: true,
    start: "top 70%"
  },
  opacity: 0
})
gsap.from("#intro-div h1:nth-child(2)", {

  scrollTrigger: {
    trigger: "#intro-div h1:nth-child(2)",
    scroller: "#main",
    // markers: true,
    start: "top 60%"
  },
  duration: 1,
  opacity: 0
})
gsap.from("#intro-div h1:nth-child(3)", {
  scrollTrigger: {
    trigger: "#intro-div h1:nth-child(3)",
    scroller: "#main",
    // markers: true,
    start: "top 60%",
  },
  opacity: 0,
  duration: 1,
})

gsap.from(".box h4", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".box h4",
    scroller: "#main",
    // markers:true,
    start: "top 70%"
  },
  stagger: 0.5
})

gsap.from(".dev-box img", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".dev-box img",
    scroller: "#main",
    // markers:true,
    start: "top 80%"
  },
  y: 20,
  stagger: {
    amount: 2
  }

})
gsap.from(".des-box img", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".des-box img",
    scroller: "#main",
    // markers:true,
    start: "top 80%"
  },
  y: 20,
  stagger: {
    amount: 1
  }

})


// Get all showcase elements and their text overlays
const showcases = document.querySelectorAll('#showcase1');

showcases.forEach(showcase => {
    const text = showcase.querySelector('.box-p');
    const video = showcase.querySelector('video');

    showcase.addEventListener('mouseenter', () => {
        // Fade out text
        gsap.to(text, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Fade in video
        gsap.to(video, {
            opacity: 1, 
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    showcase.addEventListener('mouseleave', () => {
        // Fade text back in
        gsap.to(text, {
            opacity: 1,
            duration: 0.3, 
            ease: 'power2.out'
        });

        // Fade video out
        gsap.to(video, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});


//mobile devices image swap
function swapImageForMobile() {
  const heroImage = document.getElementById("hero-image");
  if (window.innerWidth <= 600) {
    heroImage.src = "My_pic.png";
  } else {
    heroImage.src = "SUMANKAR.jpg";
  }
}

// Call the function on initial load
swapImageForMobile();

// Also call on resize
window.addEventListener("resize", swapImageForMobile);


//contextmenu

// document.addEventListener(
//   "contextmenu",
//   function (event) {
//     event.preventDefault();
//     alert("Oops !! Right-click is disabled on this page.");
//   },
//   false
// )



  
