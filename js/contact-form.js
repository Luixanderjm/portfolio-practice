const contactForm = (form, loader, response) => {
  const d = document,
    $form = d.getElementById(form),
    $inputs = $form.querySelectorAll("input[pattern]"),
    $loader = d.querySelector(loader),
    $response = d.querySelector(response);

  const generateValidationMessages = (input) => {
    const $span = d.createElement("span");
    $span.textContent = input.title;
    $span.classList.add("none");
    input.insertAdjacentElement("afterend", $span);
  };

  /* $inputs.forEach((input) => {
    generateValidationMessages(input);
  }); */

  $inputs.forEach((input) => generateValidationMessages(input));

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

  const sendEmail = async () => {
    try {
      const formData = new FormData($form);

      const settings = {
        method: "POST",
        body: formData,
        mode: "cors",
      };

      $loader.classList.remove("none");

      const req = await fetch("./php/send-email.php", settings);

      if (!req.ok) throw { status: req.status, statusText: req.statusText };

      const data = await req.json();

      if (!data.success) throw { message: data.message };

      $response.textContent = data.message;
    } catch (err) {
      let message2 = `Error: ${err.status}: ${err.statusText}`;
      $response.textContent = err.message || message2;
    } finally {
      $form.reset();

      $loader.classList.add("none");
      $response.parentElement.classList.remove("none");
      setTimeout(() => {
        $response.textContent = "";
        $response.parentElement.classList.add("none");
      }, 3000);
    }
  };

  $form.addEventListener("input", inputValidation);
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
  });
};

export default contactForm;
