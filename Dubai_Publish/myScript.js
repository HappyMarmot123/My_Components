window.addEventListener("DOMContentLoaded", function () {
  const tl2 = gsap.timeline({ defaults: { ease: "power1.out" } });

  // stagger: 여러개 노드 요소의 지연 시간
  // "-=1: 이전 애니메이션이 끝나기 1초 전에 시작"
  tl2.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
  tl2.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
  tl2.to(".intro", { y: "-100%", duration: 1 }, "-=1.5");
  tl2.fromTo(".header", { opacity: 0 }, { opacity: 1, duration: 0.5 });
  tl2.fromTo(".iBIfH", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=2");

  // 레니스 세팅
  const lenis = new Lenis({
    lerp: 0.05,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // 레니스와 gsap을 이용한 텍스트 스플릿
  const target = document.querySelector(".hero_paragraph_text");
  if (target) {
    const results = Splitting({
      target: target,
      by: "words",
      image: document.querySelector(".hero_background_image"),
      navItems: document.querySelectorAll(".nav_item"),
    });

    results.forEach((word) => {
      gsap.from(word.words, {
        opacity: 0,
        stagger: 0.1,
        duration: 0.1,
        scrollTrigger: {
          trigger: target,
          start: "top 80%", // 요소의top, 뷰포트의 80%에 닿으면 트리거 시작
          end: "bottom 80%",
          scrub: 1, // true 1~3
        },
      });
    });
  }

  // 3초에 걸쳐 fade out
  const backgroundImage = document.querySelector(".hero_background_image");
  if (backgroundImage) {
    gsap.to(backgroundImage, {
      opacity: 0,
      ease: "power2.inOut",
      toggleActions: "restart reverse none none",
      scrollTrigger: {
        trigger: target,
        start: "top 60%",
        end: "30% 90%",
        scrub: 3,
        // markers: true,
      },
    });
  }
  const sideBackgroundImage = document.querySelector(".side_background");
  if (sideBackgroundImage) {
    gsap.from(".side_background", {
      opacity: 0, // 처음에는 투명도 0
      y: 200,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 70%",
        scrub: true,
        toggleActions: "restart reverse none none",
        // markers: true,
      },
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const sectionCol = document.querySelectorAll(".section_col"),
    isDesktop = window.matchMedia("(min-width: 768px)");

  gsap.from(".section", {
    opacity: 0, // 처음에는 투명도 0
    x: -200, // 왼쪽에서 시작 (100%는 요소의 너비만큼 이동)
    duration: 2, // 1초 동안 애니메이션
    ease: "power2.out", // 부드럽게 애니메이션
    scrollTrigger: {
      trigger: ".section", // .section 요소가 트리거
      start: "top 90%", // 요소가 화면의 80% 지점에 도달하면 애니메이션 시작
      end: "top 50%", // 요소가 화면을 벗어날 때 애니메이션 끝
      scrub: true, // 스크롤 속도에 맞춰 애니메이션 진행
      toggleActions: "restart reverse none none", // 스크롤에 따른 애니메이션 동작 제어
      // markers: true,
    },
  });

  // 플립페이지
  const elements = document.querySelectorAll(".split");
  const tl = gsap.timeline({ defaults: { ease: "none", duration: 2 } });
  tl.from(elements[1], { width: 0, xPercent: -100 });

  ScrollTrigger.create({
    animation: tl,
    trigger: ".flip_page",
    start: "top top",
    end: "bottom 20%",
    scrub: true,
    pin: ".flip_page", // 애니메이션이 끝날 때까지 'testboy' 요소를 화면에 고정
    pinSpacing: false,
    anticipatePin: 1, // Pin 애니메이션이 시작되기 전에 조금 미리 고정
    markers: true,
  });

  // Luxury !!
  gsap.to(".goldenrod", {
    xPercent: -200, // Move content horizontally
    duration: 2.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".barba_title",
      start: "50% 30%", // 요소의 top, 뷰포트의 20%이 서로 닿으면
      // markers: true,
    },
  });

  //Horizon
  let sections = gsap.utils.toArray(".panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal",
      pin: true,
      scrub: 1,
      snap: {
        snapTo: 1 / (sections.length - 1),
        delay: 2,
        duration: 0.5,
      },
      end: "+=1000",
    },
  });

  // Navigate
  let links = gsap.utils.toArray("nav a");
  links.forEach((a) => {
    let element = document.querySelector(a.getAttribute("href")),
      linkST = ScrollTrigger.create({
        trigger: element,
        start: "top top",
      });
    ScrollTrigger.create({
      trigger: element,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => self.isActive && setActive(a),
    });
    a.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: linkST.start,
        overwrite: "auto",
      });
    });
  });

  function setActive(link) {
    links.forEach((el) => el.classList.remove("active"));
    link.classList.add("active");
  }

  const init = () => {
    // if (isDesktop.matches) addEventListeners();
    addEventListeners();
  };

  const addEventListeners = () => {
    sectionCol.forEach((col, idx) => {
      col.addEventListener("click", () => {
        sectionCol.forEach((el) => {
          el.classList.remove("active");
        });
        col.classList.add("active");
      });
    });
  };

  init();
});
