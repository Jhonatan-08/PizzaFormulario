$(document).ready(function ($) {
  "use strict";

  // Inicializar sliders y otros elementos como antes
  var book_table = new Swiper(".book-table-img-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 3,
      stretch: 2,
      depth: 100,
      modifier: 5,
      slideShadows: false,
    },
    loopAdditionSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var team_slider = new Swiper(".team-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  jQuery(".filters").on("click", function () {
    jQuery("#menu-dish").removeClass("bydefault_show");
  });

  $(function () {
    var filterList = {
      init: function () {
        $("#menu-dish").mixItUp({
          selectors: {
            target: ".dish-box-wp",
            filter: ".filter",
          },
          animation: {
            effects: "fade",
            easing: "ease-in-out",
          },
          load: {
            filter: ".all, .breakfast, .lunch, .dinner",
          },
        });
      },
    };
    filterList.init();
  });

  jQuery(".menu-toggle").click(function () {
    jQuery(".main-navigation").toggleClass("toggled");
  });

  jQuery(".header-menu ul li a").click(function () {
    jQuery(".main-navigation").removeClass("toggled");
  });

  gsap.registerPlugin(ScrollTrigger);

  var elementFirst = document.querySelector(".site-header");
  ScrollTrigger.create({
    trigger: "body",
    start: "30px top",
    end: "bottom bottom",
    onEnter: () => myFunction(),
    onLeaveBack: () => myFunction(),
  });

  function myFunction() {
    elementFirst.classList.toggle("sticky_head");
  }

  var scene = $(".js-parallax-scene").get(0);
  var parallaxInstance = new Parallax(scene);

  // Funciones y lógica para manejar el carrito de compras
  const cartButton = document.querySelector(".header-cart");
  const cartNumber = document.querySelector(".cart-number");

  // Ventana flotante (modal)
  const cartModal = document.getElementById("cartModal");
  const closeModal = document.querySelector(".close");
  const goToIndex = document.getElementById("go-to-index");

  // Mostrar ventana flotante (modal) al hacer clic en el carrito
  cartButton.addEventListener("click", (e) => {
    e.preventDefault();
    showCartItems();
    cartModal.style.display = "block";
  });

  // Cerrar la ventana flotante cuando se hace clic en "X"
  closeModal.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  // Cerrar la ventana flotante cuando se hace clic fuera de ella
  window.addEventListener("click", (e) => {
    if (e.target == cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Ir al índice al hacer clic en el botón "Volver al Inicio"
  goToIndex.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Función para actualizar el número del carrito
  function updateCartNumber() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartNumber.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Función para agregar un producto al carrito
  function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.name === name);

    if (existingProduct) {
      // Si el producto ya existe, aumentar la cantidad
      existingProduct.quantity += 1;
      alert(
        `Se ha añadido otra unidad de ${name}. Total: ${existingProduct.quantity}`
      );
    } else {
      // Si no existe, agregar el producto con cantidad 1
      cart.push({ name, price, quantity: 1 });
      alert(`${name} añadido al carrito.`);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartNumber();
  }

  // Función para mostrar productos en el modal
  function showCartItems() {
    const cartItems = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>El carrito está vacío</p>";
    } else {
      cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div>
              <span>${item.name} - $${item.price} x ${item.quantity}</span>
              <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>
          `;
      });
    }
  }

  // Botón de finalizar compra
  document.getElementById("checkout-button").addEventListener("click", (e) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      // Evita la redirección y muestra un mensaje
      e.preventDefault();
      alert(
        "El carrito está vacío. Por favor, añade productos antes de continuar."
      );
    } else {
      // Redirigir al index.html si hay productos en el carrito
      window.location.href = "index.html";
    }
  });

  // Función para eliminar un producto del carrito
  window.removeFromCart = function (index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartItems(); // Actualizar la ventana flotante
    updateCartNumber(); // Actualizar el número en el carrito
  };

  // Agregar evento click a los botones de agregar al carrito
  document.querySelectorAll(".dish-add-btn").forEach((button) => {
    button.removeEventListener("click", addProductToCart); // Remover cualquier evento duplicado
    button.addEventListener("click", addProductToCart); // Añadir el evento una sola vez
  });

  // Función que maneja la lógica de agregar productos
  function addProductToCart() {
    const name = this.getAttribute("data-name");
    const price = parseInt(this.getAttribute("data-price"), 10);
    addToCart(name, price);
  }

  // Inicializar el número del carrito al cargar la página
  updateCartNumber();
});

jQuery(window).on("load", function () {
  $("body").removeClass("body-fixed");

  // Activar tab de filtro
  let targets = document.querySelectorAll(".filter");
  let activeTab = 0;
  let old = 0;
  let dur = 0.4;
  let animation;

  for (let i = 0; i < targets.length; i++) {
    targets[i].index = i;
    targets[i].addEventListener("click", moveBar);
  }

  // Posición inicial en el primero === Todo
  gsap.set(".filter-active", {
    x: targets[0].offsetLeft,
    width: targets[0].offsetWidth,
  });

  function moveBar() {
    if (this.index != activeTab) {
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({
        defaults: {
          duration: 0.4,
        },
      });
      old = activeTab;
      activeTab = this.index;
      animation.to(".filter-active", {
        x: targets[activeTab].offsetLeft,
        width: targets[activeTab].offsetWidth,
      });

      animation.to(
        targets[old],
        {
          color: "#0d0d25",
          ease: "none",
        },
        0
      );
      animation.to(
        targets[activeTab],
        {
          color: "#fff",
          ease: "none",
        },
        0
      );
    }
  }
});
