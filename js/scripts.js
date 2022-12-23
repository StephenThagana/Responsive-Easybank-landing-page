const btnScrollTo = document.querySelector(".btn__link");
const footerEl = document.querySelector("#footer");
const navList = document.querySelector(".main__nav-list");
const headerEl = document.querySelector(".header");
const sectionhome = document.querySelector(".section__home");
const bodyEl = document.querySelector("body");
///////////////////////////////////
// BUTTON SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();

  footerEl.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////
// PAGE NAVIGATION

// 1. add event listener to common parent element
navList.addEventListener("click", function (e) {
  e.preventDefault();
  //detrmine where event originated(target)
  // matching strategy
  if (e.target.classList.contains("main__nav-link")) {
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////
//MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains("main__nav-link")) {
    const link = e.target;
    const siblings = link
      .closest(".header")
      .querySelectorAll(".main__nav-link");
    const logo = link.closest(".header").querySelector("img");

    siblings.forEach(function (linkEl) {
      if (linkEl !== link) {
        linkEl.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

headerEl.addEventListener("mouseover", handleHover.bind(0.5));
headerEl.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////////////
//STICKY NAVIGATION: intersecrion observer api

const headerHeight = headerEl.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    bodyEl.classList.add("sticky");
  } else {
    bodyEl.classList.remove("sticky");
  }
};

const sectionhomeObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
sectionhomeObserver.observe(sectionhome);

///////////////////////////////////////////////
//REVEAL SECTION on scroll

const hiddenSection = document.querySelectorAll(".hidden");

const reveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const RevealSection = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.15,
});

hiddenSection.forEach(function (section) {
  section.classList.add("section--hidden");
  RevealSection.observe(section);
});
