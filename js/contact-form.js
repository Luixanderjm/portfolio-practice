const contactForm = (form) => {
  const d = document,
    $form = d.getElementById(form),
    $inputs = $form.querySelectorAll("input[pattern]");

  const generateValidationMessages = (input) => {
    const $span = d.createElement("span");
    $span.textContent = input.title;
    $span.classList.add("none");
    input.insertAdjacentElement("afterend", $span);
  };

  const inputValidation = (e) => {
    const $input = e.target,
      pattern = $input.pattern,
      regex = new RegExp(pattern);

    if (!pattern) return;

    if (!regex.test($input.value)) {
      $input.nextElementSibling.classList.add("active");
    } else {
      $input.nextElementSibling.classList.remove("active");
    }

    if ($input.value === "") {
      $input.nextElementSibling.classList.remove("active");
    }
  };

  $inputs.forEach((input) => {
    generateValidationMessages(input);
  });

  $form.addEventListener("input", (e) => {
    inputValidation(e);
  });
};

export default contactForm;
