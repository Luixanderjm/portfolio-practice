const switchTheme = (themeBtn) => {
  const d = document,
    $root = document.documentElement,
    $themeBtn = d.getElementById(themeBtn);

  $themeBtn.addEventListener("click", (e) => {
    $root.classList.toggle("light-theme");
    if ($root.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light");
      $themeBtn.setAttribute("aria-label", "Switch to dark mode");
    } else {
      localStorage.setItem("theme", "dark");
      $themeBtn.setAttribute("aria-label", "Switch to light mode");
    }
  });

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    $root.classList.add("light-theme");
    $themeBtn.setAttribute("aria-label", "Switch to dark mode");
  }
};

export default switchTheme;
