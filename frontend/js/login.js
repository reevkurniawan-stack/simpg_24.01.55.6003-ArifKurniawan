const LOGIN_API = "http://localhost/simpg_24.01.55.6003-ArifKurniawan/login.php";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(LOGIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!data.success) {
      Swal.fire("Gagal", data.message, "error");
      return;
    }

    // Simpan user info di localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    Swal.fire({
      title: "Berhasil!",
      text: `Selamat datang, ${data.user.name || data.user.username}!`,
      icon: "success",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      window.location.href = "dashboard.html";
    });

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Tidak dapat menghubungi server login!", "error");
  }
});
