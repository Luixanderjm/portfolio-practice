const burgerButton = (container, btn, menu) => {
  const d = document,
    $burger = d.querySelector(btn),
    $menu = d.querySelector(menu),
    $container = d.querySelector(container);

  const active = "active";

  const accessibility = (v) => {
    if ($menu.classList.contains(v)) {
      $burger.setAttribute("aria-expanded", "true");
      $burger.setAttribute("aria-label", "Close Menu");
    } else {
      $burger.setAttribute("aria-expanded", "false");
      $burger.setAttribute("aria-label", "Open Menu");
    }
  };

  const activeMenu = (toDo) => {
    if (toDo === "toggle") {
      $menu.classList.toggle(active);
      $burger.classList.toggle(active);
    } else if (toDo === "remove") {
      $menu.classList.remove(active);
      $burger.classList.remove(active);
    } else if (toDo === undefined && $menu.classList.contains(active) && $burger.classList.contains(active)) {
      $menu.classList.remove(active);
      $burger.classList.remove(active);
    }

    accessibility(active);
  };

  $container.addEventListener("click", (e) => {
    const btnClick = e.target.closest(btn),
      menuClick = e.target.closest(`${menu} a`);

    if (!btnClick && !menuClick) return;

    if (btnClick) activeMenu("toggle");

    if (menuClick) activeMenu("remove");
  });

  const mediaQuery = window.matchMedia("(min-width: 1024px)");

  function handleBreakpoint(e) {
    if (e.matches) {
      activeMenu();
    }
  }

  handleBreakpoint(mediaQuery);
  mediaQuery.addEventListener("change", handleBreakpoint);
};

export default burgerButton;
