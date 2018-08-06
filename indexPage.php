<?php
include './Resources/ChromePhp.php';
session_start();

$array = filter_input_array(INPUT_POST);
$data = (object)$array;
//var_dump($array);

function convertdata($parameter) {
  if (is_bool($parameter)) return $parameter;
  switch (strtolower($parameter)) {
    case 'on':
      return true;
      break;
    case 'true':
      return true;
      break;
    case 'off':
      return false;
      break;
    case 'false':
      return false;
      break;
    case null:
      return false;
      break;
    default:
      return (string)$parameter;
      break;
  }
}
if (!isset($data->teamnum)) {

}

$team_num = convertdata($data->team_num);
$scouter_name = convertdata($data->scouter_name);
$robot_type = convertdata($data->robot_type);
$cube_mech = convertdata($data->cube_mech);
$cube_mech_push = convertdata($data->cube_mech_push);
$cube_mech_carry = convertdata($data->cube_mech_carry);
$cube_mech_place = convertdata($data->cube_mech_place);
$cube_mech_shoot = convertdata($data->cube_mech_shoot);
$num_wheels = convertdata($data->num_wheels);
$programming_lang = convertdata($data->programming_lang);
$auton = convertdata($data->auton);
$weight = convertdata($data->weight);
$height = convertdata($data->height);
$width = convertdata($data->width);
$length = convertdata($data->length);
$climb_mech = convertdata($data->climb_mech);
$_SESSION["team_num"] = $team_num;

date_default_timezone_set("America/New_York");
$id = '3098_PC_JQOSK' . date("Y/m/d") . "_" . date("h:i:sa");

class SQL {
  protected $conn;
  protected $connn;
  protected $insert_query;
  protected $delete_query;

  function __construct() {
    $this->conn = new mysqli("127.0.0.1", "appUser", "4E12486C3A0F8FA2DAE48D8DBCE2A52E30DB7AC114ACDADF2357C28ACE86C1A2", "3098_scouting_2018");
    $this->connn = new mysqli("127.0.0.1", "appUser", "4E12486C3A0F8FA2DAE48D8DBCE2A52E30DB7AC114ACDADF2357C28ACE86C1A2", "3098_scouting_2018");
  }

  private function RemoveEntry($team) {
    $this->delete_query = $this->connn->prepare("DELETE FROM pitscoutingdata WHERE team_num=?;");
    $this->delete_query->bind_param("i", $team);
    $this->delete_query->execute();
    if ($this->connn->error) {
      echo $this->connn->error;
    }
  }

  public function AddEntry($a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $o, $p, $q) {
    //echo $a . "<br>" . $b . "<br>" . $c . "<br>" . $d . "<br>" . $e . "<br>" . $f . "<br>" . $g . "<br>" . $h . "<br>" . $i . "<br>" . $j . "<br>" . $k . "<br>" . $l . "<br>" . $m . "<br>" . $n . "<br>" . $o;
    $this->RemoveEntry($a);
    $this->insert_query = $this->conn->prepare("INSERT INTO pitscoutingdata (id, team_num, scouter_name, robot_type, cube_mech, cube_mech_push, cube_mech_carry, cube_mech_place, cube_mech_shoot, num_wheels, programming_lang, auton, weight, height, width, length, climb_mech) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
    $this->insert_query->bind_param("sissiiiiiissiiiii", $a, $b, $c, $d, $e, $f, $g, $h, $i, $j, $k, $l, $m, $n, $o, $p, $q);
    $this->insert_query->execute();
    if ($this->conn->error) {
      echo $this->conn->error;
    } else {
      header("Location: ./Camera.html");
    }
  }

}
$asd = new SQL();
$asd->AddEntry($id, $team_num, $scouter_name, $robot_type, $cube_mech, $cube_mech_push, $cube_mech_carry, $cube_mech_place, $cube_mech_shoot, $num_wheels, $programming_lang, $auton, $weight, $height, $width, $length, $climb_mech);


?>
