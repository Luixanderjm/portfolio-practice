<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';


header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");


if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"] ?? "";
  $email = $_POST["email"] ?? "";
  $message = $_POST["details"] ?? "";
  $subject = "New message from Luixander Mejias Portfolio";

  $body = "Name: $name\r\n";
  $body .= "Email: $email\r\n";
  $body .= "Message: $message\r\n";


  if (empty(trim($name)) || empty(trim($email)) || empty(trim($message))) {
    echo json_encode([
      "success" => false,
      "message" => "All fields are required"
    ]);
    exit;
  }

  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host = 'smtp.dondominio.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'luixdev@luixandermejias.com';
    $mail->Password = 'dkcemlO6rd-;qc';
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
    echo json_encode([
      "success" => false,
      "message" => "Message could not be sent.",
      "error" => $mail->ErrorInfo
    ]);
  }

}