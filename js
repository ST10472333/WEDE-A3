/* Ntozinhle Lifestyle | Interactive website features */
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "×" : "☰";
    });
  }

  // Product search and category filtering
  const searchInput = document.getElementById("productSearch");
  const categorySelect = document.getElementById("productCategory");
  const productCards = [...document.querySelectorAll(".product-card")];
  const productCount = document.getElementById("productCount");
  const noProducts = document.getElementById("noProducts");
  function filterProducts() {
    if (!productCards.length) return;
    const searchTerm = (searchInput?.value || "").trim().toLowerCase();
    const category = categorySelect?.value || "all";
    let visible = 0;
    productCards.forEach(card => {
      const matchesText = card.dataset.name.includes(searchTerm) || card.textContent.toLowerCase().includes(searchTerm);
      const matchesCategory = category === "all" || card.dataset.category === category;
      const show = matchesText && matchesCategory;
      card.hidden = !show;
      if (show) visible++;
    });
    if (productCount) productCount.textContent = `Showing ${visible} of ${productCards.length} products`;
    if (noProducts) noProducts.hidden = visible !== 0;
  }
  searchInput?.addEventListener("input", filterProducts);
  categorySelect?.addEventListener("change", filterProducts);

  // Carry a selected product name from the catalogue to the enquiry form
  const productField = document.getElementById("product");
  const selectedProduct = new URLSearchParams(window.location.search).get("product");
  if (productField && selectedProduct) productField.value = selectedProduct;

  // Client-side form validation and prototype feedback
  function setupForm(formId, messageId, successMessage) {
    const form = document.getElementById(formId);
    const status = document.getElementById(messageId);
    if (!form || !status) return;
    form.addEventListener("submit", event => {
      event.preventDefault();
      status.classList.remove("is-success", "is-error");
      if (!form.checkValidity()) {
        status.textContent = "Please complete all fields correctly before submitting.";
        status.classList.add("is-error");
        form.reportValidity();
        return;
      }
      status.textContent = successMessage;
      status.classList.add("is-success");
      form.reset();
    });
  }
  setupForm("enquiryForm", "formMessage", "Thank you. Your enquiry has been checked in this academic prototype. No message has been sent.");
  setupForm("contactForm", "contactMessageStatus", "Thank you. Your message has been checked in this academic prototype. No message has been sent.");
});
