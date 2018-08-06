$.fn.hasAttr = function(name, val) {
  if (val) {
    return $(this).attr(name) === val;
  }
  return $(this).attr(name) !== undefined;
};

function Check(element) {
  const checked = $("#" + element).is(":checked");
  if (checked) {
    $("#cube_mech_push").removeAttr("disabled", "disabled");
    $("#cube_mech_carry").removeAttr("disabled", "disabled");
    $("#cube_mech_place").removeAttr("disabled", "disabled");
    $("#cube_mech_shoot").removeAttr("disabled", "disabled");
    $("#cube_mech_options").collapse("show");
  } else if (!checked) {
    $("#cube_mech_push").attr("disabled", "disabled");
    $("#cube_mech_push").prop("checked", false);
    $("#cube_mech_carry").attr("disabled", "disabled");
    $("#cube_mech_carry").prop("checked", false);
    $("#cube_mech_place").attr("disabled", "disabled");
    $("#cube_mech_place").prop("checked", false);
    $("#cube_mech_shoot").attr("disabled", "disabled");
    $("#cube_mech_shoot").prop("checked", false);
    $("#cube_mech_options").collapse("hide");
  }
}


function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './Resources/data.json', false);
  xobj.setRequestHeader("Cache-Control", "no-cache");
  xobj.setRequestHeader("Pragma", "no-cache");
  xobj.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function settup() {
  var json;
  this.loadJSON(function(response) {
    json = JSON.parse(response);
  });
  for (i=0; i<json.teams.length; i++) {
    $("#team_num").append("<option>" + json.teams[i] + "</option>")
  }
  for (i=0; i<json.members.length; i++) {
    $("#scouter_name").append("<option>" + json.members[i] + "</option>")
  }
}

function HideAlert(element) {
  //const id = $(element).attr("id");
  $("#" + element.parentNode.parentNode.id).collapse("hide");
}


function GrabLength(element) {
  return $("#" + element).val().length;
}
function CheckValue(element) {
  return $.isNumeric($("#" + element).val());
}
function CheckSelection(element) {
  if ($("#" + element).find(":selected").val() == "-- Please Select --")  {
    return true;
  } else {
    return false;
  }
}
function CheckStupidity() {
  //send checkbox value even if not checked
  $("#form").find($("input:checkbox:not(:checked)")).each(
    function(index) {
      var input = $('<input />');
      input.attr('type', 'hidden');
      input.attr('name', $(this).attr("name"));
      input.attr('value', "no");
      var form = $(this)[0].form;
      $(form).append(input);
    }
  );

  //stupuid proofing
  //check selection boxes

  var missingfield = false;
  var notnumber = false;
  var notentered = false;
  if (CheckSelection("team_num") || CheckSelection("scouter_name") || CheckSelection("robot_type") || CheckSelection("programming_lang")) {
    $("#errormsg").collapse("show");
    notentered = true;
  }

  //check if values werent entered
  if (GrabLength("wheels") == 0) {
    $("#wheels").attr("class", "invalid");
    $("#wheelslabel").attr("data-error", " ");
    missingfield = true;
  }
  if (GrabLength("weight") == 0) {
    $("#weight").attr("class", "invalid");
    $("#weightlabel").attr("data-error", " ");
    missingfield = true;
  }
  if (GrabLength("length") == 0) {
    $("#length").attr("class", "invalid");
    $("#lengthlabel").attr("data-error", " ");
    missingfield = true;
  }
  if (GrabLength("width") == 0) {
    $("#width").attr("class", "invalid");
    $("#widthlabel").attr("data-error", " ");
    missingfield = true;
  }
  if (GrabLength("height") == 0) {
    $("#height").attr("class", "invalid");
    $("#heightlabel").attr("data-error", " ");
    missingfield = true;
  }

  //check for numeric character only
  if (!CheckValue("wheels")) {
    console.log("rip");
    $("#wheels").attr("class", "invalid");
    $("#wheelslabel").attr("data-error", "NUMBERS!");
    notnumber = true;
  } else {
    $("#wheels").attr("class", "valid");
  }
  if (!CheckValue("weight")) {
    $("#weight").attr("class", "invalid");
    $("#weightlabel").attr("data-error", "NUMBERS!");
    notnumber = true;
  } else {
    $("#weight").attr("class", "valid");
  }
  if (!CheckValue("length")) {
    $("#length").attr("class", "invalid");
    $("#lengthlabel").attr("data-error", "NUMBERS!");
    notnumber = true;
  } else {
    $("#length").attr("class", "valid");
  }
  if (!CheckValue("width")) {
    $("#width").attr("class", "invalid");
    $("#widthlabel").attr("data-error", "NUMBERS!");
    notnumber = true;
  } else {
    $("#width").attr("class", "valid");
  }
  if (!CheckValue("height")) {
    $("#height").attr("class", "invalid");
    $("#heightlabel").attr("data-error", "NUMBERS!");
    notnumber = true;
  } else {
    $("#height").attr("class", "valid");
  }

  if (!notentered) {
    if (!notnumber) {
      if (!missingfield) {
        return true;
      } else {
        $("#errormsg").collapse("show");
        return false;
      }
    } else {
      return false;
    }
  } else {
    $("#errormsg").collapse("show");
    return false;
  }
  /*if (missingfield) {
    console.log("A data field is NULL! Aborting Submit!");
    return false;
  } else {
    return true;
  }*/
}
