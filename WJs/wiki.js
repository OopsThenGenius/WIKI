document.addEventListener("DOMContentLoaded", function() {
  // ----------- SEARCH FUNCTION -------------
  const form = document.getElementById("youtube-search");
  const input = document.getElementById("search-query");
  const iframe = document.getElementById("search-results");

  if (form && input && iframe) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // stop normal redirect
      const query = input.value.trim();
      if (query) {
        iframe.style.display = "block";
        iframe.src = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        window.scrollTo({ top: iframe.offsetTop - 50, behavior: "smooth" });
      }
    });
  }
// Desktop search toggle
  const desktopSearchIcon = document.getElementById('desktopSearchIcon');
  const desktopSearchWrapper = document.getElementById('desktopSearchWrapper');
  const desktopSearchInput = document.getElementById('desktopSearchInput');

  desktopSearchIcon.addEventListener('click', () => {
    const active = desktopSearchWrapper.classList.toggle('active');
    if (active) {
      desktopSearchInput.focus();
    } else {
      desktopSearchInput.value = '';
    }
  });

  // Mobile search toggle
  const mobileSearchIcon = document.getElementById('mobileSearchIcon');
  const mobileSearchWrapper = document.getElementById('mobileSearchWrapper');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchClose = document.getElementById('mobileSearchClose');

  mobileSearchIcon.addEventListener('click', () => {
    nav.classList.add('search-active');
    mobileSearchInput.focus();
  });

  mobileSearchClose.addEventListener('click', () => {
    nav.classList.remove('search-active');
    mobileSearchInput.value = '';
  });


  // ----------- SIDEBAR TOGGLE -------------
const toggleBtn = document.querySelector('.toggle-btn');
const sideMenu = document.querySelector('.side-menu');
let overlay = document.getElementById('overlay');

// If overlay does not exist, create and append it
if (!overlay) {
  overlay = document.createElement('div');
  overlay.id = 'overlay';
  document.body.appendChild(overlay);
}

if (toggleBtn && sideMenu && overlay) {
  toggleBtn.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
}

  // ----------- VIDEO Scroll -------------
  document.querySelectorAll(".video-wrapper").forEach(wrapper => {
    const container = wrapper.querySelector(".video-container");
    const btnLeft = wrapper.querySelector(".scroll-btn.left");
    const btnRight = wrapper.querySelector(".scroll-btn.right");

    const cardWidth = container.querySelector(".video-card").offsetWidth + 16; // card + gap

    // Scroll right
    btnRight.addEventListener("click", () => {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    // Scroll left
    btnLeft.addEventListener("click", () => {
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    // Show/hide arrows properly
    function updateArrows() {
      btnLeft.style.display = container.scrollLeft > 0 ? "block" : "none";
      btnRight.style.display =
        container.scrollLeft + container.clientWidth < container.scrollWidth
          ? "block"
          : "none";
    }

    container.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    updateArrows();
  });

  // ----------- IMAGE-TO-VIDEO HOVER PREVIEW -------------
  document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector("video");
    let hoverTimer;

    card.addEventListener("mouseenter", () => {
      hoverTimer = setTimeout(() => {
        video.currentTime = 0;
        video.play();
        video.style.opacity = "1";
      }, 600); // delay of 600ms before playing video
    });

    card.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      video.pause();
      video.currentTime = 0;
      video.style.opacity = "0";
    });
  });
});
