<?php
/*
  ===============================================
  File: login.php
  Project: SIMPG_24.01.55.6003-ArifKurniawan
  Fungsi: API Login User (Verifikasi Password Hash)
  ===============================================
*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Konfigurasi Database
$host = "localhost";
$dbname = "simpg";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Koneksi database gagal: " . $e->getMessage()]);
    exit();
}

// Ambil input JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Username dan password wajib diisi"]);
    exit();
}

$userInput = trim($data['username']);
$passInput = trim($data['password']);

// Cek user berdasarkan username
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$userInput]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(["success" => false, "message" => "Username tidak ditemukan"]);
    exit();
}

// Verifikasi password hash
if (!password_verify($passInput, $user['password_hash'])) {
    echo json_encode(["success" => false, "message" => "Password salah"]);
    exit();
}

// Jika berhasil login
$response = [
    "success" => true,
    "message" => "Login berhasil",
    "user" => [
        "id" => $user['id'],
        "username" => $user['username'],
        "name" => $user['name'],
        "role" => $user['role'],
        "email" => $user['email'],
        "phone" => $user['phone']
    ]
];

echo json_encode($response);
?>
