const BASE_URL = "http://localhost/simpg_24.01.55.6003-ArifKurniawan/api.php/records";
const API_URL = `${BASE_URL}/products`;

document.addEventListener("DOMContentLoaded", () => {
  loadDropdowns();

  document.getElementById("productForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    addProduct();
  });
});

// === Fungsi memuat kategori dan supplier ===
async function loadDropdowns() {
  try {
    const [categoriesRes, suppliersRes] = await Promise.all([
      fetch(`${BASE_URL}/categories`),
      fetch(`${BASE_URL}/suppliers`)
    ]);

    const categories = await categoriesRes.json();
    const suppliers = await suppliersRes.json();

    const catRecords = categories.records || categories;
    const supRecords = suppliers.records || suppliers;

    const catSelect = document.getElementById("category_id");
    const supSelect = document.getElementById("supplier_id");

    catSelect.innerHTML = `<option value="">Pilih Kategori</option>`;
    catRecords.forEach(c => {
      catSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });

    supSelect.innerHTML = `<option value="">Pilih Supplier</option>`;
    supRecords.forEach(s => {
      supSelect.innerHTML += `<option value="${s.id}">${s.company}</option>`;
    });

  } catch (error) {
    console.error("Gagal memuat dropdown:", error);
    Swal.fire("Error", "Gagal memuat kategori/supplier!", "error");
  }
}

// === Fungsi menambah produk ===
async function addProduct() {
  const productData = {
    product_name: document.getElementById("product_name").value,
    category_id: parseInt(document.getElementById("category_id").value),
    supplier_id: parseInt(document.getElementById("supplier_id").value),
    unit_price: parseFloat(document.getElementById("unit_price").value),
    units_in_stock: parseInt(document.getElementById("units_in_stock").value),
    unit: document.getElementById("unit").value
  };

  if (!productData.category_id || !productData.supplier_id) {
    Swal.fire("Peringatan", "Pilih kategori dan supplier terlebih dahulu!", "warning");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData)
    });

    if (!response.ok) throw new Error("Gagal menambah produk");

    Swal.fire({
      title: "Berhasil!",
      text: "Produk berhasil ditambahkan 🎉",
      icon: "success",
      confirmButtonColor: "#3085d6"
    }).then(() => (window.location.href = "index.html"));
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
}
