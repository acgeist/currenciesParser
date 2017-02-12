"use strict";

function hideAdmin() {
  let elementIds = "fileInput fileData csvToJson sanitizeIts".split(" ");
  for (let el of elementIds){
    document.getElementById(el).setAttribute("hidden", true);
  }
}

function genRandomName(len){
  var i, text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (i=0; i<len; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function csvToJson() {
  hideAdmin();
  var contents = $("#fileDisplayArea")[0].innerHTML,
    tokenArr, i, outputHtml = "";
  tokenArr = contents.toUpperCase()
    .split(/,|\n/g);
  outputHtml += "{<br>\"tasks\": [";
  for (i = 0; i < tokenArr.length; i++) {
    switch (i % 28) {
    case 0:
      outputHtml += "<br>{\"id\":\"" + tokenArr[i] + "\",";
      break;
    case 1:
      outputHtml += "\"name\":\"" + tokenArr[i] + "\",";
      break;
    case 2:
      outputHtml += "\"armsName\":\"" + tokenArr[i] + "\",";
      break;
    case 3:
      outputHtml += "\"eventHeading\":\"" + tokenArr[i] + "\",";
      break;
    case 4:
      outputHtml += "\"B-1\":\"" + tokenArr[i] + "\",";
      break;
    case 5:
      outputHtml += "\"A-10\":\"" + tokenArr[i] + "\",";
      break;
    case 6:
      outputHtml += "\"F-15C\":\"" + tokenArr[i] + "\",";
      break;
    case 7:
      outputHtml += "\"F-15E\":\"" + tokenArr[i] + "\",";
      break;
    case 8:
      outputHtml += "\"F-16CM\":\"" + tokenArr[i] + "\",";
      break;
    case 9:
      outputHtml += "\"F-16CJ\":\"" + tokenArr[i] + "\",";
      break;
    case 10:
      outputHtml += "\"F-22\":\"" + tokenArr[i] + "\",";
      break;
    case 11:
      outputHtml += "\"F-35\":\"" + tokenArr[i] + "\",";
      break;
    case 12:
      outputHtml += "\"T-38\":\"" + tokenArr[i] + "\",";
      break;
    case 13:
      outputHtml += "\"MQ-1/9\":\"" + tokenArr[i] + "\",";
      break;
    case 14:
      outputHtml += "\"RQ-4\":\"" + tokenArr[i] + "\",";
      break;
    case 15:
      outputHtml += "\"U-2\":\"" + tokenArr[i] + "\",";
      break;
    case 16:
      outputHtml += "\"TU-2\":\"" + tokenArr[i] + "\",";
      break;
    case 17:
      outputHtml += "\"PJ/CRO\":\"" + tokenArr[i] + "\",";
      break;
    case 18:
      outputHtml += "\"HH-60\":\"" + tokenArr[i] + "\",";
      break;
    case 19:
      outputHtml += "\"E-3\":\"" + tokenArr[i] + "\",";
      break;
    case 20:
      outputHtml += "\"E-8\":\"" + tokenArr[i] + "\",";
      break;
    case 21:
      outputHtml += "\"E-4\":\"" + tokenArr[i] + "\",";
      break;
    case 22:
      outputHtml += "\"OC-135\":\"" + tokenArr[i] + "\",";
      break;
    case 23:
      outputHtml += "\"RC-135\":\"" + tokenArr[i] + "\",";
      break;
    case 24:
      outputHtml += "\"WC-135\":\"" + tokenArr[i] + "\",";
      break;
    case 25:
      outputHtml += "\"EC-130\":\"" + tokenArr[i] + "\",";
      break;
    case 26:
      outputHtml += "\"H/MC-130\":\"" + tokenArr[i] + "\",";
      break;
    case 27:
      outputHtml += "\"MC-12\":\"" + tokenArr[i] + "\"";
      outputHtml += (i === tokenArr.length - 1) ? "}" : "},";
      break;
    }
  }
  outputHtml += "]}";
  $("#fileDisplayArea")[0].innerHTML = outputHtml;
}

function sanitizeIts(stdNameLen=5) {
  hideAdmin();
  var contents = $("#fileDisplayArea")[0].innerHTML,
    pilotArr, currName, outputHtml = "", re;
  outputHtml = contents.replace(/SSAN: \*\*\*-\*\*-(\d{4})/gi, "SSAN: ***-**-0000");
  pilotArr = contents.match(/NAME: ([a-zA-Z'-]+) ?,[^]*NAME: \1[^]*?PAGE/gi);
  for (var i=0; i < pilotArr.length; i++){
    currName = pilotArr[i].replace(/NAME: ([a-zA-Z'-]+) ?,[^]*NAME: \1[^]*?PAGE/i, "$1");
    re = new RegExp(currName, "gi");
    outputHtml = outputHtml.replace(re, genRandomName(stdNameLen));
  }

  outputHtml = outputHtml.replace(/(NAME: [A-Z]+), [A-Z'-]+ ([A-Z] )?/gi, "$1, FIRST MI ");

  $("#fileDisplayArea")[0].innerHTML = outputHtml;
}

function displayFile(input) {
  $("#fileDisplayArea")[0].innerHTML = "<textarea id=\"tempTa\">" + input + "</textarea>";
  $("#fileDisplayArea")[0].innerHTML = "<pre>" + $("#tempTa")[0].innerHTML + "</pre>";
}

function printFileData(fileIn) {
  $("#fileData")[0].innerHTML += "<button type=\"button\" id=\"csvToJson\">Convert CSV to JSON</button><br>";
  $("#fileData")[0].innerHTML += "<button type=\"button\" id=\"sanitizeIts\">Sanitize ITS</button><br>";
  $("#fileData")[0].innerHTML += "File Name: " + fileIn.name + "<br>File Type: " + fileIn.type + "<br>Last Modified: " +
    fileIn.lastModifiedDate + "<br>File Size: " + (fileIn.size / 1048576)
    .toFixed(3) + "MB<br><br>";
  document.getElementById("csvToJson")
    .addEventListener("click", function () {
      csvToJson();
    });
  document.getElementById("sanitizeIts")
    .addEventListener("click", function () {
      sanitizeIts();
    });
}
$("#fileInput")[0].addEventListener("change", function () {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function () {
    $("#fileInputJumbotron")
      .attr("hidden", true);
    printFileData(file);
    displayFile(reader.result);
  };
  reader.readAsText(file);
}, false);
