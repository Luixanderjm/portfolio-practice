const switchTheme = (themeBtn) => {
  const d = document,
    $html = document.documentElement,
    $themeBtn = d.getElementById(themeBtn);

  $themeBtn.addEventListener("click", (e) => {
    $html.classList.toggle("light-theme");
  });
};

export default switchTheme;
