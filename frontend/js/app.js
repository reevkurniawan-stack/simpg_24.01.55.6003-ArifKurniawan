// app.js
const BASE_URL = "http://localhost/simpg_24.01.55.6003-ArifKurniawan/api.php/records";

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadProducts();
});

async function loadProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const result = await response.json();

    console.log("API Response:", result); // 🧠 Tambahan log debug

    if (!result.records) {
      Swal.fire("Tidak ada data", "Tabel produk kosong atau API salah.", "info");
      return;
    }

    const products = result.records;
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";

    if (products.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Belum ada produk</td></tr>`;
      return;
    }

    let no = 1;
    for (const p of products) {
      tableBody.innerHTML += `
        <tr>
          <td>${no++}</td>
          <td>${p.product_name}</td>
          <td>${p.category_id ?? '-'}</td>
          <td>Rp${Number(p.unit_price).toLocaleString("id-ID")}</td>
          <td>${p.units_in_stock}</td>
          <td>${p.supplier_id ?? '-'}</td>
          <td>
            <button class="btn btn-warning btn-sm me-1" onclick="editProduct(${p.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Hapus</button>
          </td>
        </tr>
      `;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire("Error", "Gagal memuat data produk!", "error");
  }
}

async function deleteProduct(id) {
  Swal.fire({
    title: "Hapus Produk?",
    text: "Data produk akan dihapus permanen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
      Swal.fire("Berhasil!", "Produk berhasil dihapus", "success");
      loadProducts();
    }
  });
}

function editProduct(id) {
  Swal.fire("Fitur Edit", "Akan diarahkan ke halaman edit_product.html (dalam pengembangan).", "info");
}
