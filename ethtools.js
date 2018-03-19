/**
Template Controllers

@module Packages
*/

/**
Helper functions for ethereum dapps

@class [packages] ethereum:tools
@constructor
*/

var isMeteorPackage = true;

// setup LocalStore if not available
if (typeof LocalStore === "undefined") {
  isMeteorPackage = false;
  LocalStore = {
    get: function() {},
    set: function() {}
  };
}

// stup Tracker if not available
if (typeof Tracker === "undefined")
  Tracker = {
    Dependency: function() {
      return {
        depend: function() {},
        changed: function() {}
      };
    }
  };

var dependency = new Tracker.Dependency();

/**
Check for supported currencies

@method supportedCurrencies
@param {String} unit
@return {String}
*/
var supportedCurrencies = function(unit) {
  return (
    unit === "usd" ||
    unit === "eur" ||
    unit === "btc" ||
    unit === "gbp" ||
    unit === "brl"
  );
};

/**
Gets the ether unit if not set from localstorage

@method getUnit
@param {String} unit
@return {String}
*/
var getUnit = function(unit) {
  if (!_.isString(unit)) {
    unit = LocalStore.get("dapp_etherUnit");

    if (!unit) {
      unit = "ether";
      LocalStore.set("dapp_etherUnit", unit);
    }
  }

  return unit;
};

/**
Helper functions for ethereum dapps

@class EthTools
@constructor
*/

EthTools = {
  lang: "en"
};

if (isMeteorPackage) {
  /**
    Sets the default unit used by all EthTools functions, if no unit is provided.

        EthTools.setUnit('ether')

    @method setUnit
    @param {String} unit the unit like 'ether', or 'eur'
    @param {Boolean}
    **/
  EthTools.setUnit = function(unit) {
    if (supportedCurrencies(unit)) {
      LocalStore.set("dapp_etherUnit", unit);
      return true;
    } else {
      try {
        web3.utils.toWei('1', unit);
        LocalStore.set("dapp_etherUnit", unit);
        return true;
      } catch (e) {
        return false;
      }
    }
  };

  /**
    Get the default unit used by all EthTools functions, if no unit is provided.

        EthTools.getUnit()

    @method getUnit
    @return {String} unit the unit like 'ether', or 'eur'
    **/
  EthTools.getUnit = function() {
    return LocalStore.get("dapp_etherUnit");
  };
}

/**
Sets the locale to display numbers in different formats.

    EthTools.setLocale('de')

@method language
@param {String} lang the locale like "de" or "de-DE"
**/
EthTools.setLocale = function(lang) {
  var lang = lang.substr(0, 2).toLowerCase();
  // numeral.language(lang);
  EthTools.lang = lang;

  dependency.changed();

  return lang;
};

/**
Formats a given number

    EthTools.formatNumber(10000, "0.0[000]")

@method formatNumber
@param {Number|String|BigNumber} number the number to format
@param {String} format           the format string e.g. "0,0.0[000]" see http://numeraljs.com for more.
@return {String} The formated time
**/
EthTools.formatNumber = function(number, format) {
  var length = (optionalLength = 0);
  dependency.depend();

  if (!_.isFinite(number) && !(number instanceof BigNumber)) number = 0;

  if (format instanceof Spacebars.kw) format = null;

  if (_.isString(number)) number = new BigNumber(number, 10);
  if (_.isFinite(number) && !_.isObject(number)) number = new BigNumber(number);

  options =
    EthTools.lang === "en"
      ? {
          decimalSeparator: ".",
          groupSeparator: ",",
          groupSize: 3
        }
      : {
          decimalSeparator: ",",
          groupSeparator: " ",
          groupSize: 3
        };
  BigNumber.config({ FORMAT: options });

  // get segment positions (0,0. | 0 | [0])
  if (format && ~format.indexOf(".")) {
    var decimalPos = format.indexOf(".");
    if (~format.indexOf("[")) {
      length = format
        .substr(decimalPos, format.indexOf("[") - decimalPos)
        .replace(/[\.\[\]]/g, "").length;
      optionalLength = format.substr(format.indexOf("[")).replace(/[\[\]]/g, "")
        .length;
    } else {
      length = format.substr(decimalPos).replace(/[\.\[\]]/g, "").length;
      optionalLength = 0;
    }
  }
  var fullLength = length + optionalLength;
  number = number.toFormat(fullLength ? fullLength : undefined);

  // if segements are detected, rebuild the number string
  if (fullLength) {
    var beforeDecimal = number.substr(
      0,
      number.indexOf(options.decimalSeparator) + 1
    );
    var afterDecimal = number.replace(beforeDecimal, "").substr(0, length);
    var afterDecimalOptional = number
      .replace(beforeDecimal, "")
      .substr(length, optionalLength)
      .replace(/0*$/, "");
    beforeDecimal = beforeDecimal.replace(options.decimalSeparator, "");

    return !afterDecimal && !afterDecimalOptional
      ? beforeDecimal
      : beforeDecimal +
          options.decimalSeparator +
          afterDecimal +
          afterDecimalOptional;

    // otherwise simply return the formated number
  } else {
    return number;
  }
};

/**
Formats a number of wei to a balance.

    EthTools.formatBalance(myNumber, "0,0.0[0000] unit")

@method (formatBalance)
@param {String} number
@param {String} format       the format string
@return {String} The formatted number
**/
EthTools.formatBalance = function(number, format, unit) {
  dependency.depend();

  if (!_.isFinite(number) && !(number instanceof BigNumber)) number = 0;

  if (format instanceof Spacebars.kw) format = null;

  format = format || "0,0.[00000000]";

  unit = getUnit(unit);

  if (typeof EthTools.ticker !== "undefined" && supportedCurrencies(unit)) {
    var ticker = EthTools.ticker.findOne(unit, { fields: { price: 1 } });

    // convert first to ether
    number = web3.utils.fromWei(
      number instanceof BigNumber || typeof number === "number"
        ? web3.utils.toBN(number)
        : number,
      "ether"
    );

    // then times the currency
    if (ticker) {
      number =
        number instanceof BigNumber || _.isObject(number)
          ? number.times(ticker.price)
          : new BigNumber(String(number), 10).times(ticker.price);
    } else {
      number = "0";
    }
  } else {
    number = web3.utils.fromWei(
      number instanceof BigNumber || typeof number === "number"
        ? web3.utils.toBN(number)
        : number,
      unit.toLowerCase()
    );
  }

  var isUppercase = format.indexOf("UNIT") !== -1;

  var cleanedFormat = format.replace(/ *unit */i, "").replace(/ +/, "");
  var format = format.replace(cleanedFormat, "__format__");

  if (format.toLowerCase().indexOf("unit") !== -1) {
    return format
      .replace("__format__", EthTools.formatNumber(number, cleanedFormat))
      .replace(/unit/i, isUppercase ? unit.toUpperCase() : unit);
  } else return EthTools.formatNumber(number, cleanedFormat);
};

/**
Formats any of the supported currency to ethereum wei.

    EthTools.toWei(myNumber, unit)

@method (toWei)
@param {String} number
@return {String} unit
**/
EthTools.toWei = function(number, unit) {
  if (!_.isFinite(number) && !(number instanceof BigNumber)) return number;

  unit = getUnit(unit);

  if (typeof EthTools.ticker !== "undefined" && supportedCurrencies(unit)) {
    var ticker = EthTools.ticker.findOne(unit, { fields: { price: 1 } });

    // convert first to ether
    number = web3.utils.toWei(
      number instanceof BigNumber || typeof number === "number"
        ? web3.utils.toBN(number)
        : number,
      "ether"
    );

    // then times the currency
    if (ticker) {
      number =
        number instanceof BigNumber || _.isObject(number)
          ? number.dividedBy(ticker.price)
          : new BigNumber(String(number), 10).dividedBy(ticker.price);

      // make sure the number is flat
      number = number.round(0).toString(10);
    } else {
      number = "0";
    }
  } else {
    number = web3.utils.toWei(
      number instanceof BigNumber || typeof number === "number"
        ? web3.utils.toBN(number)
        : number,
      unit.toLowerCase()
    );
  }

  return number;
};
