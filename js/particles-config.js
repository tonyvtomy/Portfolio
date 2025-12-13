let particlesInitTimeout;

function initParticles(isDark, skinColor) {
  // Prevent rapid-fire re-initializations (debounce)
  if (particlesInitTimeout) {
    clearTimeout(particlesInitTimeout);
  }

  particlesInitTimeout = setTimeout(() => {
    runParticleInit(isDark, skinColor);
  }, 200); // 200ms debounce to wait for all theme/style changes to settle
}

function runParticleInit(isDark, skinColor) {
  if (typeof particlesJS === 'undefined') {
    console.error("particles.js library not loaded!");
    return;
  }

  // Antigravity Style: Blue/Grey, floating, unconnected
  const opacity = isDark ? 0.6 : 0.8;

  // Colors: Use passed skinColor and Greys
  // Default to a blue if skinColor is missing/invalid
  const primaryColor = skinColor || "#4285F4";

  const colors = [primaryColor, "#9AA0A6", "#DADCE0"];
  if (isDark) {
    colors.push("#ffffff"); // Add white for dark mode contrast
  } else {
    colors.push("#5F6368"); // Darker grey for light mode
  }

  // SAFE CLEANUP
  try {
    if (window.pJSDom && window.pJSDom.length > 0) {
      for (let i = 0; i < window.pJSDom.length; i++) {
        // Try official destroy method
        if (window.pJSDom[i].pJS && window.pJSDom[i].pJS.fn && window.pJSDom[i].pJS.fn.vendors && window.pJSDom[i].pJS.fn.vendors.destroypJS) {
          window.pJSDom[i].pJS.fn.vendors.destroypJS();
        }
      }
      window.pJSDom = []; // Nuke the array references
    }
  } catch (e) {
    console.warn("Error destroying particles:", e);
    window.pJSDom = []; // Ensure we force clear if error occurs
  }

  // FORCE DOM RESET
  // This is the "Nuclear Option" that ensures no stale canvas/event listeners stick around on the element
  const oldContainer = document.getElementById("particles-js");
  if (oldContainer) {
    const parent = oldContainer.parentNode;
    const newContainer = document.createElement("div");
    newContainer.id = "particles-js";
    // Copy any class/style (though we rely on ID)
    newContainer.className = oldContainer.className;
    parent.replaceChild(newContainer, oldContainer);
  }

  // Initialize fresh instance after a short tick to allow DOM reflow
  setTimeout(() => {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 120, // High density for "dust/confetti" look
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": colors
        },
        "shape": {
          "type": "circle", // Simple circles/dots
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": opacity,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false, // No connections
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1, // Slow floating
          "direction": "none",
          "random": true, // Random movement
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble" // Subtle interaction
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 200,
            "size": 6, // Slightly grow on hover
            "duration": 2,
            "opacity": 1,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }, 50); // Small 50ms delay for DOM ready
}
