"use strict";
QUnit.test("monthAbbrToNum(input, [isZeroSubscript = false])", function (assert) {
  assert.deepEqual(monthAbbrToNum("JAN"), 1, "monthAbbrToNum(\"JAN\") = 1");
  assert.deepEqual(monthAbbrToNum("feb"), 2, "monthAbbrToNum(\"feb\") = 2");
  assert.deepEqual(monthAbbrToNum("MAR", false), 3, "monthAbbrToNum(\"MAR\", false) = 3");
  assert.deepEqual(monthAbbrToNum("ApR", false), 4, "monthAbbrToNum(\"ApR\", false) = 4");
  assert.deepEqual(monthAbbrToNum("MAY", true), 4, "monthAbbrToNum(\"MAY\", true) = 4");
  assert.deepEqual(monthAbbrToNum(" jun ", true), 5, "monthAbbrToNum(\" jun \", true) = 5");
  assert.deepEqual(monthAbbrToNum("\tjune\t", true), 5, "monthAbbrToNum(\"\tjune\t\", true) = 5");
  assert.deepEqual(monthAbbrToNum("july", false), 7, "monthAbbrToNum(\"july\", false) = 7");
  assert.deepEqual(monthAbbrToNum("somejibberishnotmonthname"), -1,
    "monthAbbrToNum(\"somejibberishnotmonthname\") = -1");
  assert.deepEqual(monthAbbrToNum(6974), -1, "monthAbbrToNum(6974) = -1");
  assert.deepEqual(monthAbbrToNum(null), -1, "monthAbbrToNum(null) = -1");
  assert.deepEqual(monthAbbrToNum(undefined), -1, "monthAbbrToNum(undefined) = -1");
  assert.deepEqual(monthAbbrToNum(true), -1, "monthAbbrToNum(true) = -1");
});
/*
QUnit.test("numToMonAbbr(input, [isZeroSubscript = false])", function (assert) {
  assert.deepEqual(numToMonAbbr(0), "JAN", "numToMonAbbr(0) = \"JAN\"");
  assert.deepEqual(numToMonAbbr(1), "JAN", "numToMonAbbr(1) = \"JAN\"");
  assert.deepEqual(numToMonAbbr("1"), "JAN", "numToMonAbbr(\"1\") = \"JAN\"");
  assert.deepEqual(numToMonAbbr(1, false), "JAN", "numToMonAbbr(1, false) = \"JAN\"");
  assert.deepEqual(numToMonAbbr(1, true), "FEB", "numToMonAbbr(1, true) = \"FEB\"");
  assert.deepEqual(numToMonAbbr(6.9), "JUL", "numToMonAbbr(6.9) = \"JUL\"");
  assert.deepEqual(numToMonAbbr("6.9"), "JUL", "numToMonAbbr(\"6.9\") = \"JUL\"");
  assert.deepEqual(numToMonAbbr(null), null, "numToMonAbbr(null) = null");
  assert.deepEqual(numToMonAbbr(true), null, "numToMonAbbr(true) = null");
  assert.deepEqual(numToMonAbbr(undefined), null, "numToMonAbbr(undefined) = null");
  assert.deepEqual(numToMonAbbr(-5), null, "numToMonAbbr(-5) = null");
}); */

QUnit.test("dD_Mmm_YyStringToDate(ddMmmYy)", function (assert){
  assert.deepEqual(dD_Mmm_YyStringToDate("04 JUL 76"), new Date(1976, 6, 4), "dD_Mmm_YyStringToDate(\"04 JUL 76\") = " + new Date(1976, 6, 4));
  assert.deepEqual(dD_Mmm_YyStringToDate("31 DEC 50"), new Date(2050, 11, 31), "dD_Mmm_YyStringToDate(\"31 DEC 50\") = " + new Date(2050, 11, 31));
  assert.deepEqual(dD_Mmm_YyStringToDate("01 JAN 51"), new Date(1951, 0, 1), "dD_Mmm_YyStringToDate(\"01 JAN 51\") = " + new Date(1951, 0, 1));
  assert.deepEqual(dD_Mmm_YyStringToDate("1 JAN 51"), new Date(1951, 0, 1), "dD_Mmm_YyStringToDate(\"1 JAN 51\") = " + new Date(1951, 0, 1));
});
