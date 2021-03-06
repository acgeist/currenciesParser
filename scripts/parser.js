"use strict";
/** 
 * Hard-coded list of task IDs for A-10 pilots to review while preparing to fly.
 * @constant OPS_TASK_IDS
 * @type {string[]} 
 * @default */
const OPS_TASK_IDS = "AE03 AP01 AR01 AR02 GS03 LD01 LD04 LD19 LE00 LE06 SX06 TO03 VV02 SR12 LE08 LE09 AA03 GA02 GA06 GS06 LL02 LL07 SS06".split(" ");
/** 
 * Hard-coded list of grounding task IDs for A-10 pilots
 * @constant GNG_TASK_IDS
 * @type {string[]} 
 * @default */

const GNG_TASK_IDS = "AA03 AA21 GA02 GA06 GS03 GS06 LL01 LL02 LL07 MT17 PP12 SS01 SS06".split(" ");
/** 
 * List of task IDs that affect CMR status for A-10 pilots.  List excludes:
 * AE03, AR01, PP12, SS01
 * @constant CMR_TASK_IDS
 * @type {string[]} 
 * @default */
const CMR_TASK_IDS = "GA06 GA09 GA39 GS03 GS06 GS47 LL01 LL02 LL04 LL05 LL06 SQ09 SS02 SS03 SS05 SS06 SS09".split(" ");
/** 
 * List of task IDs that affect night currency for A-10 pilots. Excludes the following:
 * SIM WD NIGHT (MG69)
 * SELF MK STRF NT (RA84)
 * CAS NIGHT (SR19)
 * CAS NIGHT TSP (SR19T)
 * SA NIGHT (SR28)
 * BSA NIGHT (SR33)
 * @constant NT_TASK_IDS
 * @type {string[]} 
 * @default */
const NT_TASK_IDS = ["TE01", "VV02"];
/**
 * Converts the string name of a month (including abbreviations) to an integer.  Case insensitive, accepts leading/trailing whitespace.
 * @param {string} input - the name of the month.
 * @param {boolean} [isZeroSubscript=false] - if true JAN returns 0, if false JAN returns 1.
 * @returns {number} integer in the range -1 to 12.  -1 indicates an invalid input.
 * @example
 * monthAbbrToNum("JAN");                       // returns 1
 * monthAbbrToNum("feb");                       // returns 2
 * monthAbbrToNum("MAR", false);                // returns 3
 * monthAbbrToNum("ApR", flase);                // returns 4
 * monthAbbrToNum("MAY", true);                 // returns 4
 * monthAbbrToNum(" jun ", true);               // returns 5
 * monthAbbrToNum("	june	", true);    // returns 5
 * monthAbbrToNum("july", false);               // returns 7
 * monthAbbrToNum("somejibberishnotmonthname"); // returns -1
 * monthAbbrToNum(6974);                        // returns -1
 * monthAbbrToNum(null);                        // returns -1
 * monthAbbrToNum(undefined);                   // returns -1
 * monthAbbrToNum(true);                        // returns -1
 */

function monthAbbrToNum(input, isZeroSubscript) {
  isZeroSubscript = arguments.length === 1 ? false : isZeroSubscript;
  var xInput, output;
  var re =
    /\s*(JAN(UARY)?|FEB(RUARY)?|MAR(CH)?|APR(IL)?|MAY|JUN(E)?|JUL(Y)?|AUG(UST)?|SEP(TEMBER)?|OCT(OBER)?|NOV(EMBER)?|DEC(EMBER)?)\s*/gi;
  if (!re.test(input) || typeof (input) !== "string") {
    return -1;
  } else {
    xInput = input.replace(re, "$1");
  }
  switch (xInput.toLowerCase()) {
  case "jan":
  case "january":
    output = 1;
    break;
  case "feb":
  case "february":
    output = 2;
    break;
  case "mar":
  case "march":
    output = 3;
    break;
  case "apr":
  case "april":
    output = 4;
    break;
  case "may":
    output = 5;
    break;
  case "jun":
  case "june":
    output = 6;
    break;
  case "jul":
  case "july":
    output = 7;
    break;
  case "aug":
  case "august":
    output = 8;
    break;
  case "sep":
  case "september":
    output = 9;
    break;
  case "oct":
  case "october":
    output = 10;
    break;
  case "nov":
  case "november":
    output = 11;
    break;
  case "dec":
  case "december":
    output = 12;
    break;
  default:
    output = -1;
  }
  return isZeroSubscript && output !== -1 ? output - 1 : output;
}
/**
 * Converts an integer of the range 0-12 to 3-letter month abbreviation.
 * @param {string} input - the value to convert.
 * @param {boolean} [isZeroSubscript=false] - if true 1 returns "FEB", if false 1 returns "JAN".  Default value is false but if the input is 0, "JAN" will be returned regardless of this value.
 * @returns {string} a month formatted as "MMM", or null if input is invalid.
 * @example
 * numToMonAbbr(0);   //returns "JAN"
 * numToMonAbbr(1);   //returns "JAN"
 * numToMonAbbr("1"); //returns "JAN"
 * numToMonAbbr(1, false);   //returns "JAN"
 * numToMonAbbr(1, true);    //returns "FEB"
 * numToMonAbbr(6.9);        //returns "JUL"
 * numToMonAbbr("6.9");      //returns "JUL"
 * numToMonAbbr(null);       //returns null
 * numToMonAbbr(true);       //returns null
 * numToMonAbbr(undefined);  //returns null
 * numToMonAbbr(-5);         //returns null
 */
/* function numToMonAbbr(input, isZeroSubscript) {
  //TODO: include bitwise error codes?
  var output;
  isZeroSubscript = arguments.length === 1 ? false : isZeroSubscript;
  isZeroSubscript = input === 0 ? true : isZeroSubscript;
  if (typeof (input) === "boolean") {
    return null;
  } else if (typeof (input) !== "number" && isNaN(input)) {
    return null;
  } else {
    input = +input;
  }
  input = Math.round(input);
  if (input < 0 || input > 12) {
    return null;
  }
  input = isZeroSubscript ? input + 1 : input;
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
    return null;
  }
  return output;
} */
/**
 * Placeholder data far in the future (useful for sorting).
 * @constant BLANK_DATE
 * @type {Date}
 * @default
 */
const BLANK_DATE = new Date(9999,11,31);
/**
 * Returns a date object representing the current time plus a given number of days.
 * @param {number} numDays - how many days to add to the current time
 * @returns {Date} a Date object representing the current time plus a given number of days.
 */
function NOW_PLUS_X_DAYS(numDays) {
  return new Date(Date.now()
    .valueOf() + numDays * 24 * 60 * 60 * 1000);
}
/**
 * Converts a string of form "DD MMM YY" to a Date object.  Because it only takes in a two-digit year (YY vice YYYY), the function assumes the date is between 1951 and 2050.
 * @param {string} ddMmmYy - the string to convert
 * @returns {Date} a Date object representing the input string
 */
function dD_Mmm_YyStringToDate(ddMmmYy) {
  /* Reference http://stackoverflow.com/a/4090577/7366582 for discussion
  of explicit conversion of the date and year to numbers.  +"42" is
  shorthand for Number("42") and, in this particular situation,
  accomplishes roughly the same thing as ParseInt("42", 10). */
  /*TODO: see if this can be written using only one "replace" */
  /*http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486*/
  var re = /(\d\d?) (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) (\d\d)/i;
  var century = +ddMmmYy.replace(re, "$3") > 50 ? 1900 : 2000; // Assumes the only dates entered will be between 1951 and 2050.
  return new Date(+ddMmmYy.replace(re, "$3") + century, monthAbbrToNum(ddMmmYy.replace(re, "$2"), true), +ddMmmYy.replace(
    re, "$1"));
}
/**
 * Converts a Date object to a string of format "DD MMM YY".
 * @param {Date} dateIn - date to convert.
 * @returns {string} - output in format "DD MMM YY".
 */
function dateToDd_Mmm_YyString(dateIn) {
  return dateIn.toString()
    .toUpperCase()
    .replace(/.*([A-Z]{3}) (\d\d) \d\d(\d\d).*/i, "$2 $1 $3");
}

/**
 * Used for comparing a cell containing a string matching the format "DD MMM YY" to a blank cell.
 * @param {string} cellContent - the cell's contents
 * @returns {Date} - either a date object equivalent to what the string represents, or a date well in the future for blank cells
 */
function getCellSortValue(cellContent){
  return /\d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d\d/i.test(cellContent) ?
    dD_Mmm_YyStringToDate(cellContent).valueOf() :
    BLANK_DATE.valueOf();
}

/**
 * Sorts a table by a given column.  As currently written this method is not robust and assumes that the cell contents are either a string representing a date (of format "DD MMM YY") or a name.
 * @param {string} tableId - the HTML id of the table being sorted
 * @param {number} column - the column number the table is being sorted by
 * @param {boolean} [isAlphabetic=false] - true = sort names, false = sort dates
 */
function sortTable(tableID, column, isAlphabetic){
  isAlphabetic = arguments.length > 2 ? isAlphabetic : false;
  var table = document.getElementById(tableID).tBodies[0], 
    store=[];
  store = Array.prototype.slice.call(table.rows).map(function(row){
    return isAlphabetic ? 
      [row.cells[column].textContent, row] : 
      [getCellSortValue(row.cells[column].textContent), row];
  });
  store.sort(function(a,b){
      return a[0] > b[0] ? 1 : -1;
  });
  for (let i = 0; i < store.length; i++){
    table.appendChild(store[i][1]);
  }
  store = null;
}
/**
 * Finds all DOM elements of class "due" and colors them yellow or red if applicable.  Dates that are past turn red, dates that are coming due within the warning date turn yellow.  This is accomplished using the Bootstrap classes "text-danger" (red) and "text-warning" (yellow).
 * @param {Date} warnDate - Dates between now and the warnDate will be colored yellow (given the Bootstrap "text-warning" class).
 */
function colorize(warnDate) {
  $(".due")
    .removeClass("text-danger text-warning");
  var xDate;
  $(".due")
    .addClass(function (index) {
      xDate = dD_Mmm_YyStringToDate($(".due")[index].textContent);
      if (xDate <= Date.now()) {
        return "text-danger";
      } else if (xDate <= warnDate) {
        return "text-warning";
      }
    });
  $(".acc").removeClass("cell-blank");
  $(".acc").addClass(function (index){
    if ($(".acc")[index].textContent === ""){
      return "cell-blank";
    }
  });
}
/**
 *  Generates a list of all the unique task ids found in an xml string and return the list as an array of strings.  This is accomplished by using regular expressions to remove tags and whitespace, then search for a character sequence matching <code>/ [A-Z]{2}\d{2}[A-Z]? /gi</code>
 * @param {string} xml - the xml string to be searched for task IDs
 * @returns {string[]} - an array of 4-5 character strings (e.g. ["AA00, AA00A, ..."]).
 */
function getAllTaskIds(xml) {
  var outputStr = "";
  var modXml = xml.replace(/(<\/?(TD|TR|TH|TABLE|P|DIV)\/?>)|\n+/ig, " ")
    .replace(/\s{2,}/g, " ")
    .match(/ [A-Z]{2}\d{2}[A-Z]? /gi);
  for (var i = 0; i < modXml.length; i++) {
    modXml[i] = modXml[i].replace(/\s*/g, "");
    if (outputStr.indexOf(modXml[i].valueOf()) === -1 && modXml[i] !== "") {
      outputStr += modXml[i] + ".";
    }
  }
  return outputStr.split(".")
    .sort()
    .splice(1);
}
/**
 * Convert a task ID to a task name.  Relies on a hard-coded bank of known task IDs (i.e. task names are not generated automatically from the xml).
 * @param {string} input - the task ID to look up.  Should match format <code>/ [A-Z]{2}\d{2}[A-Z]? /gi</code>
 * @returns {string} - the task name. 
 * @example
 * // returns "SEPT"
 * getTaskNameFromId(GS03);
 */
function getTaskNameFromId(input) {
  switch (input) {
  case "AA01":
    return "QUAL EVALUATION";
  case "AA03":
    return "MSN EVAL";
  case "AA11":
    return "INSTRUMENT EVAL";
  case "AA21":
    return "COMB I/Q EVAL";
  case "AE03":
    return "ACBT";
  case "AP00":
    return "TOT APPS";
  case "AP01":
    return "PREC APP";
  case "AP02":
    return "NON-PREC APP";
  case "AP03":
    return "PENETRATION";
  case "AP11":
    return "SIM S/E APP";
  case "AP13":
    return "NO-FLAP APP";
  case "AP21":
    return "CIRCLING APP";
  case "AP30":
    return "S/E OUT GO-ARD";
  case "AR00":
    return "A/R TOTAL";
  case "AR01":
    return "A/R DAY";
  case "AR02":
    return "A/R NIGHT";
  case "DP02":
    return "TRAIL DEPART";
  case "EC01":
    return "EC A/A";
  case "EC02":
    return "EC A/G";
  case "EC04":
    return "DEGRAD/DEN DL";
  case "EC05":
    return "DEGRAD/DEN COMM";
  case "EC08":
    return "DEGRAD/DEN GPS";
  case "EI02":
    return "HUMAN RELATIONS";
  case "EI03":
    return "FORCE PROTECT";
  case "FF00":
    return "TOT FS SORTIES";
  case "FF01":
    return "TOT DAY FS SRTY";
  case "FF02":
    return "TOT NT FS SRTY";
  case "FF11":
    return "FS PRI ACFT DAY";
  case "FF12":
    return "FS PRI ACFT NT";
  case "FF21":
    return "FS NON PRI DAY";
  case "FF22":
    return "FS NON PRI NT";
  case "FH03":
    return "LAD ATT";
  case "FH04":
    return "LAD HIT";
  case "FH05":
    return "MAD ATT";
  case "FH06":
    return "MAD HIT";
  case "FH09":
    return "NIGHT MAD ATT";
  case "GA02":
    return "BOLDFACE/CAPS";
  case "GA03":
    return "ANTI-HIJACK";
  case "GA06":
    return "CRM";
  case "GA07":
    return "MARSHALLING EXAM";
  case "GA09":
    return "COMSEC";
  case "GA12":
    return "CBRNE TRNG";
  case "GA14":
    return "SABC";
  case "GA17":
    return "NVG/DAS/NVC ACD";
  case "GA22":
    return "FCIF CHECK";
  case "GA23":
    return "LASER SAFETY";
  case "GA39":
    return "WEP/TAC ACAD";
  case "GA40":
    return "SAFETY PRIV";
  case "GA43":
    return "M9 QUAL";
  case "GS03":
    return "SEPT";
  case "GS05":
    return "STAN EVAL TEST";
  case "GS06":
    return "IRC";
  case "GS25":
    return "A/C SERVICE";
  case "GS26":
    return "FLY SAFETY TRNG";
  case "GS28":
    return "SOF TRNG";
  case "GS29":
    return "SOF TOUR";
  case "GS47":
    return "VERIFICATION";
  case "IE05":
    return "INTEL TRNG";
  case "LD00":
    return "TOTAL LNDG";
  case "LD01":
    return "DAY LANDING";
  case "LD02":
    return "NIGHT LANDING";
  case "LD04":
    return "FORM LNDG";
  case "LD19":
    return "NVG LNDG";
  case "LE00":
    return "LOWAT";
  case "LE03":
    return "LOW ALT OPS";
  case "LE06":
    return "LOW A/A";
  case "LE08":
    return "LOWAT 100";
  case "LE09":
    return "LOWAT 300";
  case "LL01":
    return "AFE FAM TRNG";
  case "LL02":
    return "EGRESS (EJECT)";
  case "LL03A":
    return "EGRESS HH60G";
  case "LL03D":
    return "EGRESS HC130";
  case "LL04":
    return "ACDT";
  case "LL05":
    return "EGRSS W/ ACDE";
  case "LL06":
    return "AFE TRNG";
  case "LL06A":
    return "LS EQ TNG HH60G";
  case "LL06D":
    return "LS EQ TG HC310P";
  case "LL07":
    return "AFE FIT CHECK";
  case "ME10":
    return "INSTR/EVAL DUTY";
  case "ME14":
    return "TAC RX ATT";
  case "ME28":
    return "NON ADF SEARCH";
  case "ME43":
    return "TAC RW";
  case "ME44":
    return "TAC FW";
  case "ME45":
    return "TAC ISO JTAC";
  case "ME46":
    return "TAC NP";
  case "ME47":
    return "TAC LTD/IR PTR";
  case "MF07":
    return "DMO EVENT MTC";
  case "MF11":
    return "MOV TGT ATT MTC";
  case "MF15":
    return "EC A/G";
  case "MF16":
    return "DT A/G";
  case "MF18":
    return "TGT MARK MTC";
  case "MF19":
    return "NO FLAP APP MTC";
  case "MF20":
    return "SSE GO ARND MTC";
  case "MF21":
    return "SSE APP MTC";
  case "MF29":
    return "CAS TGT EX JTAC";
  case "MF30":
    return "LFE-DMO";
  case "MF34":
    return "VIRTUAL FLAG";
  case "MF38":
    return "LOW A/A MTC";
  case "MF39":
    return "KI MTC";
  case "MF40":
    return "SELF MS NT MTC";
  case "MF41":
    return "D/D GPS MTC";
  case "MF42":
    return "D/D COMM MTC";
  case "MF43":
    return "D/D DL MTC";
  case "MF44":
    return "TAC TYP II MTC";
  case "MF45":
    return "TAC TYP III MTC";
  case "MF46":
    return "URBAN CAS";
  case "MF48":
    return "CHAFF";
  case "MF49":
    return "FLARE";
  case "MG69":
    return "SIM WD NIGHT";
  case "MG70":
    return "SIM IN/EV DUTY";
  case "MG71":
    return "SIM NVG EVENT";
  case "MG77":
    return "NGT UAR W/NVD";
  case "MT01":
    return "SIM CFF";
  case "MT12":
    return "CSAR DMO";
  case "MT14":
    return "MTC CAS";
  case "MT15":
    return "MTC FAC (A)";
  case "MT17":
    return "EMERGENCY PROCEDURES";
  case "MT20":
    return "AIR INTER (AI)";
  case "PP12":
    return "CENTRIFUGE";
  case "PP13":
    return "AGSM ACAD";
  case "RA03":
    return "SEAD-C";
  case "RA05":
    return "TERMA CN W/SOF";
  case "RA06":
    return "TERMA CN W/JTAC";
  case "RA07":
    return "CAS URBAN TERRA";
  case "RA12":
    return "CFTR";
  case "RA13":
    return "CHAFF";
  case "RA19":
    return "ESCORT EVENT";
  case "RA20":
    return "FLAG EVENT";
  case "RA21":
    return "FLARE";
  case "RA23":
    return "FSWD/HVWT";
  case "RA26":
    return "HAVE QUICK";
  case "RA28":
    return "IAM ATT";
  case "RA29":
    return "IAM HIT";
  case "RA33":
    return "ILLUM FLARE";
  case "RA35":
    return "LAS ATT";
  case "RA36":
    return "LAS HIT";
  case "RA38":
    return "LGB LIVE ATT";
  case "RA39":
    return "LGB LIVE HIT";
  case "RA40":
    return "LGB SIM ATT";
  case "RA41":
    return "LGB SIM HIT";
  case "RA46":
    return "SATCOM";
  case "RA49":
    return "SECURE VOICE";
  case "RA52":
    return "TAC RX HIT";
  case "RA72":
    return "KILL BOX OPS";
  case "RA73":
    return "MOV TGT";
  case "RA77":
    return "TAC TYPE I";
  case "RA78":
    return "TAC TYPE II";
  case "RA79":
    return "TAC TYPE III";
  case "RA80":
    return "TAC LV/TNG ORD";
  case "RA81":
    return "TAC TOTAL";
  case "RA82":
    return "TAC NIGHT";
  case "RA84":
    return "SELF MK STRF NT";
  case "RA85":
    return "LSS/T";
  case "RA91":
    return "NIGHT STRAFE";
  case "RB11":
    return "TAC DAY";
  case "SC01":
    return "FCF SRTY";
  case "SC02":
    return "FERRY FLIGHT";
  case "SC11":
    return "HHQ SORTIE";
  case "SC12":
    return "CONTG OPS SORTI";
  case "SD03":
    return "OFFSTATIONSRTY";
  case "SE55":
    return "FLT DOC TEST";
  case "SQ04":
    return "SEPT W/IP-SUP";
  case "SQ09":
    return "ACDE SIM";
  case "SQ10":
    return "FCF SIM";
  case "SQ13":
    return "SIM SEAD/DEAD";
  case "SQ14":
    return "SIM PETRAN";
  case "SQ15":
    return "SIM CIR APP";
  case "SQ18":
    return "SIM PREC APP";
  case "SQ19":
    return "SIM NPREC APP";
  case "SQ23":
    return "SIM TGP";
  case "SR00":
    return "TOT RAP";
  case "SR07":
    return "CSAR";
  case "SR07C":
    return "CSAR CO";
  case "SR07T":
    return "CSAR TSP";
  case "SR09":
    return "FAC A";
  case "SR10":
    return "FL";
  case "SR12":
    return "IP";
  case "SR14":
    return "MISSION CC";
  case "SR15":
    return "ACM";
  case "SR16":
    return "BFM";
  case "SR17":
    return "BSA DAY";
  case "SR18":
    return "CAS DAY";
  case "SR18C":
    return "CAS CO";
  case "SR18T":
    return "CAS DAY TSP";
  case "SR19":
    return "CAS NIGHT";
  case "SR19C":
    return "CAS NIGHT CO";
  case "SR19T":
    return "CAS NIGHT TSP";
  case "SR23":
    return "FAC (A) DAY";
  case "SR23C":
    return "FAC (A) DAY CO";
  case "SR23T":
    return "FAC (A) DAY TSP";
  case "SR24":
    return "FAC (A) NGT";
  case "SR24C":
    return "FAC (A)NGT CO";
  case "SR24T":
    return "FAC (A) NGT TSP";
  case "SR27":
    return "SA DAY";
  case "SR28":
    return "SA NIGHT";
  case "SR28C":
    return "SA NIGHT CO";
  case "SR33":
    return "BSA NIGHT";
  case "SR45":
    return "MAS/CFF";
  case "SR45C":
    return "MAS/CFF CO";
  case "SR45T":
    return "MASS/CFF TSP";
  case "SR72":
    return "AI";
  case "SR72C":
    return "AI CO";
  case "SR72T":
    return "AI TSP";
  case "SS01":
    return "LOCAL AREA SURV";
  case "SS02":
    return "CMBT SURV TRNG";
  case "SS03":
    return "CAC TRNG";
  case "SS05":
    return "WST";
  case "SS06":
    return "EPT";
  case "SS07A":
    return "CSI AFRICOM";
  case "SS07C":
    return "CSI CENTCOM";
  case "SS07E":
    return "CSI EUCOM";
  case "SS07P":
    return "CSI PACOM";
  case "SS07S":
    return "CSI SOUTHCOM";
  case "SS08":
    return "HEEDS TRNG";
  case "SS09":
    return "HHT WITH ACDE";
  case "SS20":
    return "S-V80-A";
  case "SS27":
    return "HSTG SRV SV93A";
  case "SS30":
    return "S-V84-A";
  case "SS31":
    return "WTRSRVPAR SV86A";
  case "SS32":
    return "S-V90-A";
  case "ST00":
    return "TOTAL SORTIES";
  case "SX06":
    return "DEMANDING SRTY";
  case "SX07":
    return "NON-DEMAND SRT";
  case "SX08":
    return "INSTRUMENT SRTY";
  case "SX08C":
    return "INST SORTIE CO";
  case "SX08T":
    return "INST ST THEATE";
  case "SX10":
    return "AHC";
  case "TE01":
    return "NVG EVENT";
  case "TF02":
    return "IMQT COMP";
  case "TF03":
    return "FL QUAL DATE";
  case "TF04":
    return "INSTR QUAL DATE";
  case "TO03":
    return "FORM T/O";
  case "VV02":
    return "NVG/DAS/NVC DMD";
  case "VV03":
    return "NVG CURRENCY";
  case "WD00":
    return "TOT WPNS DEL";
  case "WD11":
    return "AIM-9 ATT";
  case "WD12":
    return "AIM-9 HIT";
  case "WD14":
    return "HAS ATT";
  case "WD15":
    return "HAS HIT";
  case "WD20":
    return "TGP ACTIVITY";
  case "WD22":
    return "LRS ATT";
  case "WD23":
    return "LRS HIT";
  case "WD24":
    return "MAV ATT";
  case "WD25":
    return "MAV HIT";
  case "WD26":
    return "LGB ACTUAL";
  case "WD27":
    return "TARGET MARK";
  case "WD28":
    return "TTS ATT";
  case "WD29":
    return "TTS HIT";
  case "WD31":
    return "DT";
  case "WD45":
    return "IAM SIM ATT";
  case "WD46":
    return "IAM SIM HIT";
  case "WD47":
    return "WD NIGHT";
  case "WD51":
    return "NIGHT HAS ATT";
  case "WD52":
    return "NIGHT HAS HITS";
  case "WD53":
    return "NIGHT MAV ATT";
  case "WD54":
    return "NIGHT MAV HITS";
  case "WD55":
    return "IAM WPNS DEL";
  case "WD56":
    return "LIVE MAVERICK";
  case "WD57":
    return "MAV LIVE HIT";
  default:
    return "";
  }
}
/**
 * Take an XML string and remove all tags and whitespace.
 * @param {string} xmlIn - the XML string to be cleansed
 * @returns {string} - a string of tokens separated by a single whitespace.
 */
function cleanseXml(xmlIn) {
  return xmlIn.replace(/(<\/?[a-zA-Z]*\/?>)|\n+/ig, " ")
    .replace(/\s{2,}/ig, " ");
}

function printCurrencies(xml, taskIds, showPha, showRobd) {
  var datesText, taskId, re, currName, pilotArr;
  var htmlOut = "";
  xml = cleanseXml(xml);
  pilotArr = xml.match(/NAME: ([a-zA-Z'-]+) ?,[^]*NAME: \1[^]*?PAGE/gi);
  for (var i = 0; i < pilotArr.length; i++) {
    currName = pilotArr[i].replace(/NAME: ([a-zA-Z'-]+) ?,[^]*NAME: \1[^]*?PAGE/i, "$1");
    /* Print the current pilot's name to the top of his/her currency table. */
    htmlOut += "<table id=\"" + currName + "\"class=\"table table-bordered table-sm table-hover table-condensed\">" + "<thead class=\"thead-inverse\">" + "<tr>" +
      "<td colspan=\"3\">" + "<h3 class=\"text-center\">" + currName + "</h3>" + "</td></tr>" + "<tr>" +
      "<th>TASK NAME</th>" + "<th>DATE LAST ACCOMP</th>" + "<th>DATE DUE</th>" + "</tr></thead><tbody>";
    /* "PHYSICAL DUE DATE" & "PHYSIOLOGICAL..." are special cases due to how
    they are placed on the page.  */
    if (showPha) {
      htmlOut += "<tr>" + pilotArr[i].replace(/NAME[^]*(PHYSICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i,
        "<td>PHA</td><td></td><td class=\"due\">$2</td>") + "</tr>";
    }
    if (showRobd) {
      htmlOut += "<tr>" + pilotArr[i].replace(/NAME[^]*(PHYSIOLOGICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i,
        "<td>ALT CHAMBER/ROBD</td><td></td><td class=\"due\">$2</td>") + "</tr>";
    }
    /* Once the special cases are out of the way, search iteratively for
    every task id in taskIds. */
    for (var j = 0; j < taskIds.length; j++) {
      taskId = taskIds[j];
      re = new RegExp(taskId, "i");
      /* IF ... the current task name is even found in the current
      pilot's ITS */
      if (re.test(pilotArr[i])) {
        /* Here's the tricky part - finding the TASK ID and extracting the
        DATE LAST ACCOMP and DATE DUE.  The challenge is that there can be 
        0, 1, or 2 dates present.  We're going to assume that if there's
        only one date it's the DATE LAST ACCOMP and doesn't have a DUE
        DATE. 
        The regex we use looks for the task name, and captures everything
        up to the next task id it finds (two letters + two numbers, + optional 
        third letter) */
        re = new RegExp(taskId + "[^]*?([A-Z]{2}[0-9]{2}[A-Z]?|$)", "i");
        /* datesText = a chunk of text starting with the task name and ending with the next
        task id it finds (actual example: "AE03 0 5 30 NOV 16 29 JAN 17 I A-10 
        CMR INEXP-1 TOT APPS AP00").  This will be a much longer string if the task
        name you're looking for is the last one on the page. */
        datesText = pilotArr[i].match(re)[0].replace(/([^]*)PAGE[^]*$/i,"$1");
        /* IF ... the block of the text contains a date of format "DD MMM YY" followed one space
        later by a single letter*/
        if (/ \d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d\d ([A-Z]|YES [A-Z]) /i.test(datesText)) {
          datesText = datesText.replace(
            /(^[^]*?\d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d\d [A-Z]) [^]*$/i, "$1");
          var dateArr = datesText.match(/\d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d\d/g);
          if (dateArr.length === 0) {
            htmlOut += "<tr><td>" + getTaskNameFromId(taskId) + " (" + taskId + ")</td><td></td><td></td></tr>";
          } else if (dateArr.length === 1) {
            htmlOut += "<tr><td>" + getTaskNameFromId(taskId) + " (" + taskId + ")</td><td>" + dateArr[0] +
              "</td><td></td></tr>";
          } else if (dateArr.length === 2) {
            htmlOut += "<tr><td>" + getTaskNameFromId(taskId) + " (" + taskId + ")</td><td>" + dateArr[0] +
              "</td><td class=\"due\">" + dateArr[1] + "</td></tr>";
          }
        }
      } else {
        htmlOut += "<tr><td>" + getTaskNameFromId(taskId) + " (" + taskId + ")</td><td></td><td></td></tr>";
      }
    }
    htmlOut += "</tbody><tfoot class=\"small\"></tfoot></table>";
  }
  $("#fileDisplayArea")[0].innerHTML = htmlOut;

  colorize(NOW_PLUS_X_DAYS($("#cautionSlider")[0].value));
}

function printCurrenciesDotMode(xml, taskIds, showPha, showRobd) {
  var i, j, datesText, taskId, re, currName, pilotArr;
  var htmlOut = "";
  xml = cleanseXml(xml);
  pilotArr = xml.match(/NAME: ([a-zA-Z'-]+) ?,[^]*NAME: \1[^]*?PAGE/gi);
  htmlOut += "<table class=\"table table-bordered table-sm table-hover table-condensed DOT-table\" id=\"dotTable\"><thead><tr id=\"taskIdRow\"><th id=\"pilot\"><a href=#>PILOT</a></th>";
  for (i=0; i<taskIds.length; i++){
    htmlOut += "<th class=\"text-center\" id=" + taskIds[i] + ">" + getTaskNameFromId(taskIds[i]) + "<br>(<a href=#>" + taskIds[i] + "</a>)</th>";    
  }
  if (showPha) {
    htmlOut += "<th class=\"text-center\" id=\"PHA\"><a href=#>PHA</a></th>";
  }
  if (showRobd) {
    htmlOut += "<th class=\"text-center\" id=\"ROBD\"><a href=#>ROBD</a></th>";
  }
  htmlOut += "</tr></thead><tbody>";
  for (i = 0; i < pilotArr.length; i++) {
    currName = pilotArr[i].replace(/NAME: ([a-zA-Z'-]+) ?,[^]*NAME: \1[^]*?PAGE/i, "$1");
    /* Print the current pilot's name at the beginning of their row */
    htmlOut += "<tr><td>" + currName + "</td>";
    for (j = 0; j < taskIds.length; j++) {
      taskId = taskIds[j];
      re = new RegExp(taskId, "i");
      /* IF ... the current task name is even found in the current
      pilot's ITS */
      if (re.test(pilotArr[i])) {
        /* Here's the tricky part - finding the TASK ID and extracting the DATE LAST ACCOMP and DATE DUE.  The challenge is that there can be 0, 1, or 2 dates present.  We're going to assume that if there's only one date it's the DATE LAST ACCOMP and doesn't have a DUE DATE. he regex we use looks for the task name, and captures everything up to the next task id it finds (two letters + two numbers, + optional third letter) */
        re = new RegExp(taskId + "[^]*?([A-Z]{2}[0-9]{2}[A-Z]?|$)", "i");
        /* datesText = a chunk of text starting with the task name and ending with the next task id it finds (actual example: "AE03 0 5 30 NOV 16 29 JAN 17 I A-10 CMR INEXP-1 TOT APPS AP00").  This will be a much longer string if the task name you're looking for is the last one on the page. */
        datesText = pilotArr[i].match(re)[0].replace(/([^]*)PAGE[^]*$/i,"$1");
        /* IF ... the block of the text contains a date of format "DD MMM YY" followed one space
        later by a single letter*/
        if (/ \d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d\d ([A-Z]|YES [A-Z]) /i.test(datesText)) {
          var dateArr = datesText.match(/\d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d\d/g);
          switch (dateArr.length) {
          case 1:
            htmlOut += "<td class=\"acc text-center\">" + dateArr[0] + "</td>";
            break;
          case 2:
            htmlOut += "<td class=\"due text-center\">" + dateArr[1] + "</td>";
            break;
          default:
            break;
          }
        } else {
          htmlOut += "<td class=\"acc\"></td>"; //task is listed on ITS but there is no date
        }
      } else {
        htmlOut += "<td class=\"acc\"></td>"; //task is not listed on ITS
      }
    }
    /* "PHYSICAL DUE DATE" & "PHYSIOLOGICAL..." are special cases due to how they are placed on the page.  Can turn on/off their inclusion using the SHOW_PHA and SHOW_ROBD constants. */
    if (showPha) {
      htmlOut += /NAME[^]*(PHYSICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i.test(pilotArr[i]) ? 
      pilotArr[i].replace(/NAME[^]*(PHYSICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, "<td class=\"due\">$2</td>") : 
      "<td class=\"due text-center\"></td>";
    }
    if (showRobd) {
      htmlOut += /NAME[^]*(PHYSIOLOGICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i.test(pilotArr[i]) ? 
      pilotArr[i].replace(/NAME[^]*(PHYSIOLOGICAL) DUE DATE: (\d\d [A-Z]{3} \d\d)?[^]*?PAGE/i, "<td class=\"due\">$2</td>") :
      "<td class=\"due text-center\"></td>";
    }
    htmlOut += "</tr>";
  }
  htmlOut += "</tbody><tfoot class=\"small\"></tfoot></table>";
  $("#fileDisplayArea")[0].innerHTML = htmlOut;

  addTableSortListener("pilot", "dotTable", true);
  for (i = 0; i<taskIds.length; i++){
    addTableSortListener(taskIds[i], "dotTable");
  }
  if (showPha){
    addTableSortListener("PHA", "dotTable");
  }
  if (showRobd){
    addTableSortListener("ROBD", "dotTable");
  }
  colorize(NOW_PLUS_X_DAYS($("#cautionSlider")[0].value));
}

function addTableSortListener(colId, tableId, alphabetic){
  alphabetic = arguments.length > 2 ? alphabetic : false;
  document.getElementById(colId).addEventListener("click", function (event){
    sortTable(tableId, this.cellIndex, alphabetic);
    event.preventDefault();
    event.stopPropagation();
    return false;
  })
}

function makeBtns(xml) {
  $("#topRowBtns")[0].innerHTML +=
    "<button type=\"button\" class=\"btn btn-secondary\" id=\"opsBtn\">Ops Desk</button>" +
    "<button type=\"button\" class=\"btn btn-secondary\" id=\"gngBtn\">GO/NO-GO</button>" +
    "<button type=\"button\" class=\"btn btn-secondary\" id=\"cmrBtn\">CMR</button>" +
    "<button type=\"button\" class=\"btn btn-secondary\" id=\"ntBtn\">Night</button>" +
    "<button type=\"button\" class=\"btn btn-secondary\" id=\"allBtn\">ALL</button>";
  $("#opsBtn")[0].addEventListener("click", function () {
    printCurrencies(xml, OPS_TASK_IDS, false, false);
  });
  $("#gngBtn")[0].addEventListener("click", function () {
    printCurrencies(xml, GNG_TASK_IDS, true, true);
  });
  $("#cmrBtn")[0].addEventListener("click", function () {
    printCurrenciesDotMode(xml, CMR_TASK_IDS, true, true);
  });
  $("#ntBtn")[0].addEventListener("click", function () {
    printCurrenciesDotMode(xml, NT_TASK_IDS, false, false);
  });
  $("#allBtn")[0].addEventListener("click", function () {
    printCurrencies(xml, getAllTaskIds(xml), true, true);
  });
  /*
  makeBtn("opsBtn", "Ops Desk", xml, OPS_TASK_IDS, false, false);
  makeBtn("gngBtn", "GO/NO-GO", xml, GNG_TASK_IDS, true, true);
  makeBtn("cmrBtn", "CMR", xml, CMR_TASK_IDS, true, true, true);
  makeBtn("ntBtn", "Night", xml, NT_TASK_IDS, false, false, true);
  makeBtn("allBtn", "All Task IDs", xml, getAllTaskIds(xml), true, true);
  */
}

/*
function makeBtn(id, btnTxt, xml, taskArray, showPha, showRobd, useDotMode){
  useDotMode = arguments.length > 6 ? useDotMode : false;
  document.getElementById("topRowBtns").innerHTML += "<button type=\"button\" class=\"btn btn-secondary\" id=\"" + id + "\">" + btnTxt + "</button>";
  document.getElementById(id).addEventListener("click", function(){
    if (useDotMode){
      printCurrenciesDotMode(xml, taskArray, showPha, showRobd);
    } else {
      printCurrencies(xml, taskArray, showPha, showRobd);
    }
  });
}
*/

function getPreparedDateFromXml(xml) {
  var re = /PREPARED \d\d (JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC) \d{4}/gi;
  if (re.test(cleanseXml(xml))) {
    return cleanseXml(xml)
      .match(re)[0].replace(/PREPARED /i, "retrieved from ARMS ")
      .replace(/\d\d(\d\d)/, "$1");
  } else {
    return "???";
  }
}

function makeSlider() {
  /* 
  http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
  http://seiyria.com/bootstrap-slider/ 
  */
  $("#sliderDiv")[0].innerHTML += "<label for=\"cautionSlider\">Highlight yellow if coming due within " +
    "<strong><span id=\"cautionSetting\">7</span></strong>" + " days.</label>" +
    "<br><input type=\"range\" min=\"1\" max=\"90\" value=\"7\" id=\"cautionSlider\" step=\"1\" list=\"cautionOptions\">" +
    "<datalist id=\"cautionOptions\">" + "<option>7</option><option>30</option><option>60</option><option>90</option>" +
    "</datalist>";
  $("#cautionSlider")[0].addEventListener("mouseup", function () {
    $("#cautionSetting")[0].innerHTML = $("#cautionSlider")[0].value;
    colorize(NOW_PLUS_X_DAYS($("#cautionSlider")[0].value));
  });
}

$("#fileInput")[0].addEventListener("change", function () {
  if (this.files[0].type.match(/text.*/)) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      $("#fileData")[0].innerHTML = "File Name: " + file.name + "<br>File Type: " + file.type +
        "<br>Last Modified: " + dateToDd_Mmm_YyString(file.lastModifiedDate) + "<br>File Size: " + (file.size /
          1048576)
        .toFixed(3) + "MB";
      $("#mainHeader")[0].innerHTML += "<p class=\"small\">*ITS " + getPreparedDateFromXml(reader.result) +
        "</p>";
      $("#fileInputJumbotron")
        .attr("hidden", true);
      /* TODO: store reader.result somewhere useful (<div id="rawXml" hidden><p>raw xml</p></div>?) 
      http://api.jquery.com/data/. This should allow uploading a second xml file which can then be 
      appended to the first so two squadrons' reports can be combined (e.g. for 74th/75th/76th TFI).
      */
      makeSlider();
      makeBtns(reader.result);
      printCurrencies(reader.result, OPS_TASK_IDS, false, false);
    };
    reader.readAsText(file);
  } else {
    $("#fileDisplayArea")[0].innerText = "File not supported.";
  }
}, false);
