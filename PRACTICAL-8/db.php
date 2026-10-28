<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
function db(): mysqli {
    try {
        $db = new mysqli('localhost', 'root', '', 'studenthub');
        $db->set_charset('utf8mb4');
        return $db;
    } catch (mysqli_sql_exception $e) {
        http_response_code(500);
        exit('Database connection failed. Check MySQL credentials.');
    }
}
