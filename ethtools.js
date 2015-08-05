/**
Template Controllers

@module Packages
*/

/**
Helper functions for ethereum dapps

@class [packages] ethereum:tools
@constructor
*/

EthTools = {};


// stup LocalStore if not available
if(typeof LocalStore === 'undefined')
    LocalStore = {
        get: function(){},
        set: function(){}
    };

// stup Tracker if not available
if(typeof Tracker === 'undefined')
    Tracker = {
        Dependency: function(){
            return {
                depend: function(){},
                changed: function(){}
            }
        }
    };

var dependency = new Tracker.Dependency;

/**
Sets the locale to display numbers in different formats.

    EthTools.locale('de')

@method language
@param {String} lang the locale like "de" or "de-DE"
**/
EthTools.locale = function(lang){
    numeral.language(lang.substr(0,2));
    dependency.changed();
};

/**
Formats a given number

    EthTools.formatNumber(10000, "0.0[000]")

@method formatNumber
@param {Number|String|BigNumber} number the number to format
@param {String} format           the format string e.g. "0.0[000]" see http://numeraljs.com for more.
@return {String} The formated time
**/
EthTools.formatNumber = function(number, format){
    dependency.depend();

    if(format instanceof Spacebars.kw)
        format = null;

    if(number instanceof BigNumber)
        number = number.toString(10);

    format = format || '0,0.0[0000]';

    if(!_.isFinite(number))
        number = numeral().unformat(number);

    if(_.isFinite(number))
        return numeral(number).format(format);
};

/**
Formats a number to balance.

    EthTools.formatBalance(myNumber, "0,0.0[0000]")

@method (formatBalance)
@param {String} number
@param {String} format       the format string
@return {String} The formatted number
**/
EthTools.formatBalance = function(number, format, unit){
    dependency.depend();
    
    var localstorageUnit = LocalStore.get('dapp_etherUnit');

    if(!localstorageUnit)
        LocalStore.set('dapp_etherUnit', 'ether');

    unit = _.isString(unit) ? unit : (localstorageUnit || 'ether');

    number = web3.fromWei(number, unit.toLowerCase());

    return EthTools.formatNumber(number, format) +' '+ unit;
};


