document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");
  const saveLocationBtn = document.getElementById("save-location");
  const savePersonalBtn = document.getElementById("save-personal");
  const totalField = document.getElementById("total");

  // Mostrar el total en el formulario
  if (totalField) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalField.value = `$${total}`;
  }

  // Función para validar el nombre (solo letras y espacios)
  function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(name);
  }

  // Función para validar el correo (debe contener @)
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Función para validar el teléfono (solo números)
  function validatePhone(phone) {
    const regex = /^[0-9]*$/;
    return regex.test(phone);
  }

  // Guardar datos del formulario de ubicación
  saveLocationBtn.addEventListener("click", () => {
    const city = document.getElementById("city").value;
    const neighborhood = document.getElementById("neighborhood").value;
    const address = document.getElementById("address").value;

    localStorage.setItem("city", city);
    localStorage.setItem("neighborhood", neighborhood);
    localStorage.setItem("address", address);

    container.classList.remove("active");
  });

  // Guardar datos del formulario personal
  savePersonalBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!validateName(name)) {
      alert("El nombre solo debe contener letras y espacios.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!validatePhone(phone)) {
      alert("El teléfono solo debe contener números.");
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    alert("Datos personales guardados");
  });

  // Mostrar el formulario de registro
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  // Mostrar el formulario de login
  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });

  // Recuperar datos del formulario de ubicación al cargar la página
  if (localStorage.getItem("city")) {
    document.getElementById("city").value = localStorage.getItem("city");
  }
  if (localStorage.getItem("neighborhood")) {
    document.getElementById("neighborhood").value =
      localStorage.getItem("neighborhood");
  }
  if (localStorage.getItem("address")) {
    document.getElementById("address").value = localStorage.getItem("address");
  }

  // Recuperar datos del formulario personal al cargar la página
  if (localStorage.getItem("name")) {
    document.getElementById("name").value = localStorage.getItem("name");
  }
  if (localStorage.getItem("email")) {
    document.getElementById("email").value = localStorage.getItem("email");
  }
  if (localStorage.getItem("phone")) {
    document.getElementById("phone").value = localStorage.getItem("phone");
  }

  updateCartNumber();
});
