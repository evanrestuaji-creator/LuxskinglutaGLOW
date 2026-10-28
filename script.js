// Ganti nomor WhatsApp di bawah jika nomor admin berubah.
const WHATSAPP_NUMBER = "62882001761117";
const defaultMessage = "Halo Admin Luxskingluta GLOWUP, saya ingin bertanya tentang produk dan pemesanan.";
const waUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const message = `Halo Admin Luxskingluta GLOWUP, saya tertarik dengan produk ${product}. Boleh info harga terbaru, stok, detail produk, dan pilihan pembayaran Lunas/DP/Cicilan?`;
    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  });
});
["faqWhatsApp","closingWhatsApp","floatingWhatsApp"].forEach((id) => {
  const link = document.getElementById(id);
  if (link) {
    link.href = waUrl(defaultMessage);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

// Search + category filters
const searchInput = document.getElementById("searchInput");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";
function updateCatalog() {
  const query = (searchInput.value || "").trim().toLowerCase();
  let visible = 0;
  productCards.forEach((card) => {
    const categoryMatches = activeFilter === "all" || card.dataset.category === activeFilter;
    const textMatches = (card.dataset.name + " " + card.textContent).toLowerCase().includes(query);
    const show = categoryMatches && textMatches;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible > 0;
}
searchInput.addEventListener("input", updateCatalog);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === button));
    updateCatalog();
  });
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

// Soft entrance animation
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
document.getElementById("year").textContent = new Date().getFullYear();
