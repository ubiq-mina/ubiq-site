<?php
    $name = $contactNo = $email = $company = $message = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $name = test_input($_POST["name"]);
        $contactNo = test_input($_POST["contactNo"]);
        $email = test_input($_POST["email"]);
        $company = test_input($_POST["company"]);
        $message = test_input($_POST["message"]);;

        $validatedResponse = [];
        $success = true;

        foreach($_POST as  $key => $value) {
            $validatedResponse[$key] = true;
        }

        if (!validateName($name)) {
            $validatedResponse["name"] = false;
            $success = false;
        }
        if (!validateContactNo($contactNo)) {
            $validatedResponse["contactNo"] = false;
            $success = false;
        }
        if (!validateEmail($email)) {
            $validatedResponse["email"] = false;
            $success = false;
        }
        if (!validateCompany($company)) {
            $validatedResponse["company"] = false;
            $success = false;
        }
        if (!validateMessage($message)) {
            $validatedResponse["message"] = false;
            $success = false;
        }

        if ($success) {
            insertInquiry($name, $email, $contactNo, $company, $message);
        }

        echo json_encode($validatedResponse);
    }

    class Inquiry {
        public $inquiryId;
        public $name;
        public $contactNo;
        public $email;
        public $company;
        public $message;
    }

    function insertInquiry($name, $email, $contactNo, $company, $message) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        
        // Create connection
        $conn = new mysqli($servername, $username, $password);
        
        // Check connection
        if (mysqli_connect_error()) {
            die("Database connection failed: " . mysqli_connect_error());
        }

        $sql = "INSERT INTO ubiquitous.inquiries (name, contactNo, email, company, message) 
                VALUES ('" . $name . "', '"
                           . $contactNo . "', '"
                           . $email . "', '"
                           . $company . "', '"
                           . $message
                           . "');";

        echo $sql;

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
        $conn->close();
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);

        return $data;
    }

    function validateName($value) {
        return assertAllLetters($value) && !assertEmpty($value);
    }

    function validateContactNo($value) {
        return !assertAllLetters($value) && !assertEmpty($value);
    }

    function validateEmail($value) {
        return (strpos($value, "@") !== false) && (strpos($value, ".com") !== false) && !assertEmpty($value);
    }

    function validateCompany($value) {
        return !assertEmpty($value);
    }

    function validateMessage($value) {
        return !assertEmpty($value);
    }

    function assertEmpty($value) {
        return $value == '';
    }

    function assertAllLetters($value) {
        return !preg_match('/[^A-Za-z]/', $value);
    }

    function assertNumerical() {
        return ctype_digit($value);
    }

    function assertSpecialCharacters() {

    }
 ?>