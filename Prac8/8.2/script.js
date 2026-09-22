const admissionForm = document.querySelector("#admission-form");
const formMessage = document.querySelector("#form-message");

admissionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(admissionForm);
  const memberName = formData.get("name").trim();

  formMessage.textContent = `Thanks, ${memberName}! Your gym admission information has been entered.`;
  admissionForm.reset();
});
