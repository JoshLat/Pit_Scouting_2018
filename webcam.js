const CSS_GREEN = "color: Lime; background: Black";
const CSS_WHITE = "color: White; background: Black";
const CSS_RED = "color: Red; background: Black";
const SRC_NULL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
var feed = null;

$.fn.hasAttr = function(name, val) {
  if (val) {
    return $(this).attr(name) === val;
  }
  return $(this).attr(name) !== undefined;
};


function CaptureImage() {
  // add canvas element
  var canvas = null;
  if (document.querySelector("canvas") == null, document.getElementById("grid").getAttribute("src") == "") {
    console.log("No canvas found, creating one!");
    canvas = document.createElement('canvas');
    document.querySelector('body').appendChild(canvas);
  } else {
    console.log("Canvas found!");
    return 1;
  }

  // set canvas dimensions to video ones to not truncate picture
  const vid = document.getElementById("stream");
  canvas.width = vid.videoWidth;
  canvas.height = vid.videoHeight;

  // copy full video frame into the canvas
  canvas.getContext('2d').drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);

  // get image data URL and remove canvas
  const snapshot = canvas.toDataURL("image/png");
  canvas.parentNode.removeChild(canvas);

  // update grid picture source
  $("#grid").attr("src", snapshot);
  $("#grid").show()

  //stop the video!
  const video = $("#stream");
  video.attr("src", SRC_NULL);
  video.hide();

  //video.parentNode.removeChild(video);
  window.URL.revokeObjectURL(feed);
}


function StartVideo() {
  navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 1024,
        height: 768
      }
    })
    .then(function(KILLME) {
      console.log($("#stream").hasAttr("src"));
      feed = KILLME;
      $("#grid").attr("src", ""); //set the grids image to NULL
      $("#grid").hide();
      if ($("#stream").attr("src") == SRC_NULL) {
        $("#stream").attr("src", window.URL.createObjectURL(KILLME))
        $("#stream").show();
        document.querySelector("#stream").onloadedmetadata = function(e) {
          document.querySelector("#stream").play();
        };
      } else {
        console.log("Camera is already streaming!");
      }
    })
    .catch(function(error) {
      console.log(error);
      console.log("camera not found!");
      $("#stream").hide();
      $("#grid").hide();
    });
}

function SaveImage() {
  if (document.getElementById("grid").getAttribute("src") != "") {
    const img = document.getElementById("grid").src;
    const crap = JSON.stringify({
      "base64": img,
      "team": "3098"
    });

    $.ajax({
      url: "SaveImage.php",
      type: "post",
      data: crap,

      success: function(returns) {
        if (returns == JSON.parse(crap).team) {
          console.log("%c[PHP] %cSuccessfully saved Image for team [%c" + returns + "%c]", CSS_GREEN, CSS_WHITE, CSS_GREEN, CSS_WHITE);
          $("#savesuccess").collapse("show");
        } else {
          console.log("%c[PHP] %cFailed to save Image!", CSS_RED, CSS_WHITE);
        }
      }
    });
  } else {
    console.log("canot save non-eixtent image!");
    $("#takeapic").collapse("show");
  }

}

function HideAlert(element) {
  //const id = $(element).attr("id");
  $("#" + element.parentNode.parentNode.id).collapse("hide");
}
