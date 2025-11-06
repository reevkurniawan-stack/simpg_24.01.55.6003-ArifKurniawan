const LOGIN_API = "http://localhost/simpg_24.01.55.6003-ArifKurniawan/api_login.php";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(LOGIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("user", JSON.stringify(data.data));
      Swal.fire({
        title: "Berhasil!",
        text: `Selamat datang, ${data.data.username}!`,
        icon: "success",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        window.location.href = "dashboard.html";
      });
    } else {
      Swal.fire("Gagal", data.message, "error");
    }

  } catch (err) {
    Swal.fire("Error", "Terjadi kesalahan koneksi ke server!", "error");
    console.error(err);
  }
});
