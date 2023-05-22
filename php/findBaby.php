<?php
$sym_list = $_POST["sym_list"];
$id_index = $_POST["id"];
$sym_file = fopen('../data/baby.json', 'r');
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
            $str .= "<div class='container1'><div class='image1'><img src='".$obj->image;
            $str .= "' alt='전격성 간염'></div><div class='text1'><h2>".$obj->disease."<h2>증상: </h2><p>";
            for($i = 0; $i < count($obj->symptom); $i++) {
                $str .= $obj->symptom[$i].", ";
            }
            $str .= "</p><h2>진료과: </h2><p>";
            for($i = 0; $i < count($obj->medical_department); $i++) {
                $str .= $obj->medical_department[$i].", ";
            }
            $result .= "</p><input type='button' id='more".$id_index."' value='더보기'></div></div>".$str;
            $id_index += 1;
        }
    }
}
fclose($sym_file);

echo $result. "@". $id_index;
?>