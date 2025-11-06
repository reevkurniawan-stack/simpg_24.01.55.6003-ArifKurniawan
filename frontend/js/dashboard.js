const BASE_URL = "http://localhost/simpg_24.01.55.6003-ArifKurniawan/api.php/records";

document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});

async function loadDashboard() {
  try {
    const [prodRes, catRes, supRes] = await Promise.all([
      fetch(`${BASE_URL}/products`),
      fetch(`${BASE_URL}/categories`),
      fetch(`${BASE_URL}/suppliers`)
    ]);

    const products = (await prodRes.json()).records || [];
    const categories = (await catRes.json()).records || [];
    const suppliers = (await supRes.json()).records || [];

    document.getElementById("totalProduk").textContent = products.length;
    document.getElementById("totalKategori").textContent = categories.length;
    document.getElementById("totalSupplier").textContent = suppliers.length;
    document.getElementById("stokRendah").textContent =
      products.filter(p => p.units_in_stock < 10).length;

    renderChart(categories, products);
  } catch (err) {
    console.error("Gagal memuat data:", err);
    Swal.fire("Error", "Gagal memuat data dashboard!", "error");
  }
}

function renderChart(categories, products) {
  const kategoriMap = {};
  products.forEach(p => {
    kategoriMap[p.category_id] = (kategoriMap[p.category_id] || 0) + 1;
  });

  const labels = categories.map(c => c.name);
  const data = categories.map(c => kategoriMap[c.id] || 0);

  const ctx = document.getElementById("chartKategori");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Jumlah Produk",
        data,
        backgroundColor: "rgba(13,110,253,0.5)",
        borderColor: "#0d6efd",
        borderWidth: 1
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}
