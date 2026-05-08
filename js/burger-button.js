const burgerButton = (container, btn, menu) => {
  const d = document,
    $burger = d.querySelector(btn),
    $menu = d.querySelector(menu),
    $container = d.querySelector(container),
    $body = document.body;

  const active = "active";

  let isDesktop = false;

  const accessibility = (v) => {
    if ($menu.classList.contains(v)) {
      $burger.setAttribute("aria-expanded", "true");
      $burger.setAttribute("aria-label", "Close Menu");
    } else {
      $burger.setAttribute("aria-expanded", "false");
      $burger.setAttribute("aria-label", "Open Menu");
    }
  };

  const handleBodyOverflowY = (state) => {
    if (state === active) {
      $body.style.overflowY = "hidden";
    } else if (state === "hiddenState") {
      $body.style.overflowY = "visible";
    }
  };

  const handleMenuState = (toDo) => {
    if (toDo === "toggleMenu") {
      $menu.classList.toggle(active);
      $burger.classList.toggle(active);
      !$menu.classList.contains(active) ? handleBodyOverflowY("hiddenState") : handleBodyOverflowY(active);
    } else if (toDo === "hideMenu" && !isDesktop) {
      $menu.classList.remove(active);
      $burger.classList.remove(active);
      handleBodyOverflowY("hiddenState");
    } else if (toDo === "closeOnDesktop" && $menu.classList.contains(active)) {
      $menu.classList.remove(active);
      $burger.classList.remove(active);
      handleBodyOverflowY("hiddenState");
    }

    accessibility(active);
  };

  $container.addEventListener("click", (e) => {
    const btnClick = e.target.closest(btn),
      menuClick = e.target.closest(`${menu} a`);

    if (!btnClick && !menuClick) return;

    if (btnClick) handleMenuState("toggleMenu");

    if (menuClick) handleMenuState("hideMenu");
  });

  const mediaQuery = window.matchMedia("(min-width: 1024px)");

  function handleBreakpoint(e) {
    if (e.matches) {
      handleMenuState("closeOnDesktop");
      isDesktop = true;
    } else {
      isDesktop = false;
    }
  }

  handleBreakpoint(mediaQuery);
  mediaQuery.addEventListener("change", handleBreakpoint);
};

export default burgerButton;
