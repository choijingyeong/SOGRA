<?php
$sym_list = $_POST["sym_list"];
$sym_file = fopen('../data/older.json', 'r');
$infoArray = array();
$arrIndex = 0;
$result = "";

while(!feof($sym_file)) {
    $my_line = fgets($sym_file);
    $obj = json_decode($my_line);
    $str = "";
    $flag = true;

    if($obj != "") {
        for($i = 0; $i<count($sym_list); $i++) {
            if(in_array($sym_list[$i], $obj->symptom)) {}
            else { $flag = false; }
        }
        if ($flag){
            $str .= "<div class='box'><br><h2>병명: ".$obj->disease."<h2 class='h2'>증상</h2><p class='special'>";
            for($i = 0; $i < count($obj->symptom); $i++) {
                $str .= $obj->symptom[$i].", ";
            }
            $str .= "</p><h2 class='h2'>진료과</h2><p class='special'>";
            for($i = 0; $i < count($obj->medical_department); $i++) {
                $str .= $obj->medical_department[$i].", ";
            }
            $result .= "</p></div>".$str;
        }
    }
}
fclose($sym_file);

echo $result;
?>