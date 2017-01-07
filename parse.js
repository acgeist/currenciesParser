function printAll(xml) {
    var temp, taskName, re, currName;
    var taskNames = ["ACBT", "PREC APP", "A/R DAY", "SEPT",  "DAY LANDING", "FORM LNDG"];
    var htmlOut = "";

    var out = xml.match(/NAME: ([A-Z]+) ?,[^]*NAME: \1[^]*?PAGE/gi);
    for (var i = 0; i < out.length; i++) {
        currName = out[i].replace(/NAME: ([A-Z]+) ?,[^]*NAME: \1[^]*?PAGE/i, '$1');
        htmlOut += "<h3>" + currName + "</h3>";
        htmlOut += "<table><th>TASK NAME</th><th>ACCOMPLISHED</th><th>DUE</th>";
        htmlOut += "<tr>" + out[i].replace(/NAME[^]*(PHYSICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, '<td>$1</td><td></td><td>$2</td>') + "</tr>";
        htmlOut += "<tr>" + out[i].replace(/NAME[^]*(PHYSIOLOGICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, '<td>$1</td><td></td><td>$2</td>') + "</tr>";
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
                        temp = "<td>" + temp.match(/\d\d [A-Z]{3} \d\d/g)[0] + "</td><td>" + temp.match(/\d\d [A-Z]{3} \d\d/g)[1] + "</td>";
                    } else temp = "Number of dates found = " + temp.match(/\d\d [A-Z]{3} \d\d/g).length;
                } else {
                    temp = "<td>no date found</td>";
                }
                htmlOut += "<tr><td>" + taskName + "</td>" + temp + "</tr>";
            }
        }
        htmlOut += "</table>";
    }
    document.getElementById("fileDisplayArea").innerHTML = htmlOut;
}