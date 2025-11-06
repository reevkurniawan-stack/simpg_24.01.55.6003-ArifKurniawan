// ===============================
// Navbar Dinamis SIMPG
// SIMPG_24.01.55.6003-ArifKurniawan
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Tentukan halaman aktif
  const path = window.location.pathname.split("/").pop();

  const navHTML = `
  <nav class="navbar navbar-expand-lg bg-white shadow-sm rounded mb-4">
    <div class="container">
      <a class="navbar-brand" href="#">📊 SIMPG</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link ${path === 'dashboard.html' ? 'active' : ''}" href="dashboard.html">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${path === 'index.html' ? 'active' : ''}" href="index.html">Produk</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${path === 'add_product.html' ? 'active' : ''}" href="add_product.html">Tambah Produk</a>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <span id="userInfo" class="me-3 text-secondary small">${user.username} (${user.role})</span>
          <button class="btn btn-outline-danger btn-sm" id="btnLogout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
  `;

  // Sisipkan navbar di atas halaman (paling awal body)
  document.body.insertAdjacentHTML("afterbegin", navHTML);

  // Tambahkan event Logout
  document.getElementById("btnLogout").addEventListener("click", () => {
    Swal.fire({
      title: "Logout?",
      text: "Apakah Anda yakin ingin keluar dari sistem?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        window.location.href = "login.html";
      }
    });
  });
});
