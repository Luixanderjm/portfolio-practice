<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer-master/src/Exception.php';
require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/PHPMailer-master/src/SMTP.php';

$config = require __DIR__ . "/../../config/mail-config.phpa";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $name = trim($_POST["name"] ?? "");
  $email = trim($_POST["email"] ?? "");
  $message = trim($_POST["details"] ?? "");
  $subject = "New message from Luixander Mejias Portfolio";

  if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
      "success" => false,
      "message" => "All fields are required"
    ]);
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
      "success" => false,
      "message" => "Please enter a valid email address."
    ]);
    exit;
  }

  $body = "Name: $name\r\n";
  $body .= "Email: $email\r\n\r\n";
  $body .= "Message:\r\n$message\r\n";

  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host = 'smtp.dondominio.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config["smtp_user"];
    $mail->Password = $config["smtp_pass"];
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('luixdev@luixandermejias.com', 'Portfolio Contact Form');
    $mail->addAddress('luixander08@gmail.com');
    $mail->addReplyTo($email, $name);
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->send();

    echo json_encode([
      "success" => true,
      "message" => "The email was submitted successfully"
    ]);

  } catch (Exception $e) {
    http_response_code(500);

    echo json_encode([
      "success" => false,
      "message" => "Message could not be sent.",
    ]);
  }

  exit;
}

http_response_code(405);
echo json_encode([
  "success" => false,
  "message" => "Method not allowed"
]);
exit;