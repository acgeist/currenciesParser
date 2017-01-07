function printAll(xml) {
    var temp, taskName, re, currName;
    var taskNames = ["ACBT", "PREC APP", "A/R DAY", "SEPT",  "DAY LANDING", "FORM LNDG"];
    var htmlOut = "";
    var out = xml.match(/NAME: ([A-Z]+) ?,[^]*NAME: \1[^]*?PAGE/gi);
    for (var i = 0; i < out.length; i++) {
        currName = out[i].replace(/NAME: ([A-Z]+) ?,[^]*NAME: \1[^]*?PAGE/i, '$1');
        htmlOut += "<h3>" + currName + "</h3>";
        htmlOut += "<table><th>TASK NAME</th><th>ACCOMPLISHED</th><th>DUE</th>";
        // htmlOut += "<tr>" + out[i].replace(/NAME[^]*(PHYSICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, '<td>PHA</td><td></td><td>$2</td>') + "</tr>";
        // htmlOut += "<tr>" + out[i].replace(/NAME[^]*(PHYSIOLOGICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, '<td>ALT CHAMBER/ROBD</td><td></td><td>$2</td>') + "</tr>";
        for (var j = 0; j < taskNames.length; j++) {
            taskName = taskNames[j];
            re = new RegExp(taskName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "i");
            // console.log("re = " + re);
            if (re.test(out[i])) {
                temp = out[i].replace(/(<\/?(TD|TR|TH)\/?>)|\n+/g, " ");
                temp = temp.replace(/\s+/g, " ");
                re = new RegExp(taskName + " \\w{4}[^]*?[A-Z]{2}[0-9]{2}", "i");
                temp = temp.match(re)[0];
                if (/\d\d [A-Z]{3} \d\d/g.test(temp)) {
                    if (temp.match(/\d\d [A-Z]{3} \d\d/g).length === 2) {
                        temp = "<td>" + temp.match(/\d\d [A-Z]{3} \d\d/g)[0] + "</td><td class=\"due\">" + temp.match(/\d\d [A-Z]{3} \d\d/g)[1] + "</td>";
                    } else temp = "Number of dates found = " + temp.match(/\d\d [A-Z]{3} \d\d/g).length;
                } else {
                    temp = "<td>no date found</td><td>no date found</td>";
                }
                htmlOut += "<tr><td>" + taskName + "</td>" + temp + "</tr>";
            }
        }
        htmlOut += "</table>";
    }    
    document.getElementById("fileDisplayArea").innerHTML = colorize(htmlOut);
    // console.log(colorize(htmlOut));
}

function colorize(html){
    var output = "";
    var xDates = html.replace(/<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/gi, function(capture){
        var xDate = makeDate(capture);
        var dateString = xDate.getDate() + " " + numToMonAbbr(xDate.getMonth(), true) + " " + xDate.getFullYear();
        dateString = dateString.replace(/(\d+ [A-Z]{3} )\d\d(\d\d)/i, "$1$2"); 
        dateString = dateString.replace(/^\d [A-Z]{3} \d\d/i, "0$&");
        if (xDate<=Date.now()){
            return "<td style=\"color:red\">" + dateString + "</td>";
        } else {
            return "<td>" + dateString + "</td>";
        }
    });
    return xDates;
}

function makeDate(dd_mmm_yy){
    xDay = parseInt(dd_mmm_yy.replace(/<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/i, "$1"));
    xMon = monthAbbrToNum(dd_mmm_yy.replace(/<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/i, "$2"), true);
    xYr = parseInt(dd_mmm_yy.replace(/<td class="due">(\d\d) ([A-Z]{3}) (\d\d)<\/td>/i, "$3")) + 2000;
    // console.log("xDay = " + xDay + "\nxMon = " + xMon + "\nxYr = " + xYr);
    return new Date(xYr, xMon, xDay);
}

function monthAbbrToNum(input, isZeroSubscript = false){
    var output;
    if (!/[A-Z]{3}/i.test(input)){
        output = "Error in function monthAbbrToNum: input received " +
        "did not match expected format /[A-Z]{3}/.\n" +
        "(/[A-Z]{3}/i.test(" + input + ") returned false.)";
    } else {
        switch(input.toLowerCase()){
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
    if (typeof(output) === 'string'){
        alert(output);
        return output;
    } else if (typeof(output) === 'number'){
        if (isZeroSubscript){
            return output - 1;
        } else{
            return output;
        }
    }
}

function numToMonAbbr(input, isZeroSubscript = false){
    var output;
    if (!/\d+/i.test(input)){
        output = "Error in function monthAbbrToNum: input received " +
        "did not match expected format /\d+/i.\n" +
        "(/\d+/i.test(" + input + ") returned false.)";
    } else {
        if (isZeroSubscript){
            input += 1;
        }
        switch(input){
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