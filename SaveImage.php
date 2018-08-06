<?php
include './Resources/ChromePhp.php';
session_start();

Abstract Class definitions {
  const PICTURES_DIR = "./Pictures/";
  const FIRST_NUMBER_TEAM = self::PICTURES_DIR . TEAM_NUMBER;
  const TEAM_NUMBER_SEARCH = self::FIRST_NUMBER_TEAM  . "*.png";
}

Class Utilities{

  public $json;

  protected static function console($data) {
    //ChromePhp::log("[PHP LOG] " . $data);
    //echo($data . "<br>");
  }
  protected static function ScanFiles($path) {
    return (integer)count(array_slice(glob($path), 0));
  }

  function __construct() {
    /*$this->json = (object)array();
    $this->json->base64 = (string)"jfgiksrjhjseraghasdkghkseufasdjhkghasdribasdzahsdukyhtfguieyhitgehahfsio";
    $this->json->team = (string)$_SESSION["team_num"];*/
    $this->json = JSON_decode(file_get_contents("php://input"));
    $this->json->team = (string)$_SESSION["team_num"];
    define("TEAM_NUMBER", $this->json->team);
    self::console($this->json->base64);
    self::console($this->json->team);
  }

}

Class Core extends Utilities {

  protected function SaveImage($FileName, $jsonObject) {
    file_put_contents(
      definitions::PICTURES_DIR . $FileName . ".png",
      base64_decode(
        preg_replace('#^data:image/\w+;base64,#i',
        '',
        $jsonObject->base64)
      )
    );
    self::console("Saved Image!");
    echo $this->json->team;
  }

  public function Execute() {
    if ($this->json != NULL) {
      if (file_exists(definitions::PICTURES_DIR . $this->json->team . "-(1).png")) {
        self::console("First image for team # does exist!");
        self::SaveImage($this->json->team . "-(" . (self::ScanFiles(definitions::TEAM_NUMBER_SEARCH) + 1) . ")", $this->json);
      } else {
        self::console("First image for team # does not exist!");
        self::SaveImage($this->json->team . "-(1)", $this->json);
      }
    }
  }
}

$run = new Core();
$run->Execute();

?>
