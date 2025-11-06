<?php
/*
  API Login - SIMPG_24.01.55.6003-ArifKurniawan
  Verifikasi login menggunakan password_hash (bcrypt)
*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// Koneksi ke database
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "simpg";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["status" => "error", "message" => "Database gagal terhubung"]);
  exit();
}

// Baca input JSON
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

// Validasi input
if (empty($username) || empty($password)) {
  http_response_code(400);
  echo json_encode(["status" => "error", "message" => "Username dan password wajib diisi"]);
  exit();
}

// Cek user di database
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  http_response_code(401);
  echo json_encode(["status" => "error", "message" => "Username tidak ditemukan"]);
  exit();
}

$user = $result->fetch_assoc();

// Verifikasi password hash
if (!password_verify($password, $user['password_hash'])) {
  http_response_code(401);
  echo json_encode(["status" => "error", "message" => "Password salah"]);
  exit();
}

// Login sukses
echo json_encode([
  "status" => "success",
  "message" => "Login berhasil",
  "data" => [
    "id" => $user['id'],
    "username" => $user['username'],
    "role" => $user['role'],
    "name" => $user['name']
  ]
]);
?>
