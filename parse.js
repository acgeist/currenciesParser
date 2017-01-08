"use strict";

function monthAbbrToNum(input, isZeroSubscript) {
  isZeroSubscript = arguments.length === 1 ? false : isZeroSubscript;
  var output;
  if (!/[A-Z]{3}/i.test(input)) {
    output = "Error in function monthAbbrToNum: input received " +
      "did not match expected format /[A-Z]{3}/.\n" +
      "(/[A-Z]{3}/i.test(" + input + ") returned false.)";
  } else {
    switch (input.toLowerCase()) {
    case "jan":
      output = 1;
      break;
    case "feb":
      output = 2;
      break;
    case "mar":
      output = 3;
      break;
    case "apr":
      output = 4;
      break;
    case "may":
      output = 5;
      break;
    case "jun":
      output = 6;
      break;
    case "jul":
      output = 7;
      break;
    case "aug":
      output = 8;
      break;
    case "sep":
      output = 9;
      break;
    case "oct":
      output = 10;
      break;
    case "nov":
      output = 11;
      break;
    case "dec":
      output = 12;
      break;
    default:
      output = "Error in function monthAbbrToNum: " + input +
        "not recognized as a valid month.";
    }
  }
  if (typeof (output) === "string") {
    window.alert("function monthAbbrToNum(" + input + ", " +
      isZeroSubscript + ") is outputting " + output + ", which is a " +
      "string (vice a number). ");
    return output;
  } else if (typeof (output) === "number") {
    return isZeroSubscript ? output - 1 : output;
  }
}

function numToMonAbbr(input, isZeroSubscript) {
  isZeroSubscript = arguments.length === 1 ? false : isZeroSubscript;
  var output;
  if (!/\d{1,2}/i.test(input)) {
    output = "Error in function monthAbbrToNum: input received " +
      "did not match expected format /\d+/i.\n" +
      "(/\d+/i.test(" + input + ") returned false.)";
  } else {
    if (isZeroSubscript) {
      input += 1;
    }
    switch (input) {
    case 1:
      output = "JAN";
      break;
    case 2:
      output = "FEB";
      break;
    case 3:
      output = "MAR";
      break;
    case 4:
      output = "APR";
      break;
    case 5:
      output = "MAY";
      break;
    case 6:
      output = "JUN";
      break;
    case 7:
      output = "JUL";
      break;
    case 8:
      output = "AUG";
      break;
    case 9:
      output = "SEP";
      break;
    case 10:
      output = "OCT";
      break;
    case 11:
      output = "NOV";
      break;
    case 12:
      output = "DEC";
      break;
    default:
      output = "Error in function numToMonAbbr: " + input +
        "not recognized as a valid month.";
    }
  }
  return output;
}

function NOW_PLUS_ONE_WEEK() {
  return new Date(Date.now()
  .valueOf() + 7 * 24 * 60 * 60 * 1000);
}

function makeDate(ddMmmYy) {
  var xDay, xMon, xYr;
  /* Reference http://stackoverflow.com/a/4090577/7366582 for discussion
  of explicit conversion of the date and year to numbers.  +"42" is
  shorthand for Number("42") and, in this particular situation, 
  accomplishes roughly the same thing as ParseInt("42", 10). */
  xDay = +ddMmmYy.replace(/<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/i, "$1");
  xMon = monthAbbrToNum(ddMmmYy.replace(
    /<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/i, "$2"), true);
  xYr = +ddMmmYy.replace(
      /<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/i, "$3") + 2000;
  return new Date(xYr, xMon, xDay);
}

/* Take in a Date object and convert 
it to a string of format "DD MMM YY". */
function dateToDd_Mmm_YyString(dateIn){
  return dateIn.toString().toUpperCase().replace(
    /.*([A-Z]{3}) (\d\d) \d{2}(\d{2}).*/i, "$2 $1 $3");
}

function colorize(html) {
  var xDates = html.replace(
    /<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/gi,
    function (capture) {
      var xDate = makeDate(capture);
      var dateString = xDate.getDate() + " " +
        numToMonAbbr(xDate.getMonth(), true) + " " +
        xDate.getFullYear();
      dateString = dateString.replace(
        /(\d+ [A-Z]{3} )\d\d(\d\d)/i, "$1$2");
      dateString = dateString.replace(
        /^\d [A-Z]{3} \d\d/i, "0$&");
      if (xDate <= Date.now()) {
        return "<td style=\"color:red\">" + dateString + "</td>";
      } else if (xDate <= NOW_PLUS_ONE_WEEK()) {
        return "<td style=\"color:Gold\">" + dateString + "</td>";
      } else {
        return "<td>" + dateString + "</td>";
      }
    });
  return xDates;
}

function printAll(xml) {
  var temp, taskName, re, currName;
  var taskNames = ["ACBT", "PREC APP", "A/R DAY", "SEPT", "DAY LANDING",
        "FORM LNDG", "DEGRAD/DEN GPS", "LOWAT"];
  var htmlOut = "";
  /* Step one: slice the xml into an array of pilots.  Each array member
  contains from the first time that pilot's name is mentioned to the 
  page number declaration on the last page that has their name */
  var out = xml.match(/NAME: ([A-Z]+) ?,[^]*NAME: \1[^]*?PAGE/gi);
  for (var i = 0; i < out.length; i++) {
    console.log(out[i]);
    currName = out[i].replace(
      /NAME: ([A-Z]+) ?,[^]*NAME: \1[^]*?PAGE/i, "$1");
    htmlOut += "<h3>" + currName + "</h3>";
    htmlOut +=
      "<table><th>TASK NAME</th><th>DATE LAST ACCOMP</th><th>DATE DUE</th>";
    /*
    htmlOut += "<tr>" + out[i].replace(
        /NAME[^]*(PHYSICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, 
        "<td>PHA</td><td></td><td>$2</td>") + "</tr>";
    htmlOut += "<tr>" + out[i].replace(
        /NAME[^]*(PHYSIOLOGICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, 
        "<td>ALT CHAMBER/ROBD</td><td></td><td>$2</td>") + "</tr>";
    */
    for (var j = 0; j < taskNames.length; j++) {
      taskName = taskNames[j];
      re = new RegExp(taskName.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "i");
      if (re.test(out[i])) {
        temp = out[i].replace(/(<\/?(TD|TR|TH)\/?>)|\n+/g, " ");
        temp = temp.replace(/\s+/g, " ");
        re = new RegExp(taskName + " \\w{4}[^]*?[A-Z]{2}[0-9]{2}", "i");
        temp = temp.match(re)[0];
        if (/\d\d [A-Z]{3} \d\d/g.test(temp)) {
          temp = temp.match(/\d\d [A-Z]{3} \d\d/g)
            .length === 2 ?
            "<td>" + temp.match(/\d\d [A-Z]{3} \d\d/g)[0] +
            "</td><td class=\"due\">" + temp.match(
              /\d\d [A-Z]{3} \d\d/g)[1] + "</td>" :
            (
              window.alert("Error while trying to print dates. " +
                "Search the code for \"Number of dates found = \""
              ),
              "Number of dates found = " + temp.match(
                /\d\d [A-Z]{3} \d\d/g)
              .length
            );
        } else {
          temp = "<td>no date found</td><td>no date found</td>";
        }
        htmlOut += "<tr><td>" + taskName + "</td>" + temp + "</tr>";
      }
    }
    htmlOut += "</table>";
  }
  $("#fileDisplayArea")[0].innerHTML = colorize(htmlOut);
}

$("#fileInput")[0].addEventListener("change", function () {
  if (this.files[0].type.match(/text.*/)) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      $("#fileData")[0].innerHTML = "File Name: " + file.name +
        "<br>File " +
        "Type: " + file.type + "<br>Last Modified: " + dateToDd_Mmm_YyString(file.lastModifiedDate) +
        "<br>File Size: " + (file.size / 1048576).toFixed(3) + "MB";
        /* Is a kilobyte 1000 or 1024 bytes?  Yes.
        https://en.wikipedia.org/wiki/Kilobyte*/
      printAll(reader.result);
      $("#fileInput").attr("hidden", true);
    };
    reader.readAsText(file);
  } else {
    $("#fileDisplayArea")[0].innerText = "File not supported!";
  }
}, false);
