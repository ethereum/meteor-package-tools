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

/**
Takes a number of wei and converts it to any other ether unit.

Possible units are:

    - kwei/ada
    - mwei/babbage
    - gwei/shannon
    - szabo
    - finney
    - ether
    - kether/grand/einstein
    - mether
    - gether
    - tether

@method fromWei
@param {Number|String} number can be a number or a HEX of a decimal
@param {String} unit the unit to convert to
@return {Number}
*/
EthTools.fromWei = function(number, unit) {
    if(!number)
        return number;

    if(typeof number === 'string' && number.indexOf('0x') === 0)
        number = web3.toDecimal(number);
    
    if(!(number instanceof BigNumber))
        number = new BigNumber(number.toString()); // toString to prevent errors, the user have to handle giving correct bignums themselves


    unit = unit.toLowerCase();

    switch(unit) {
        case 'kwei':
        case 'ada':
            number = number.dividedBy(1000);
            break;
        case 'mwei':
        case 'babbage':
            number = number.dividedBy(1000000);
            break;
        case 'gwei':
        case 'schannon':
            number = number.dividedBy(1000000000);
            break;
        case 'szabo':
            number = number.dividedBy(1000000000000);
            break;
        case 'finney':
            number = number.dividedBy(1000000000000000);
            break;
        case 'ether':
            number = number.dividedBy(1000000000000000000);
            break;
        case 'kether':
        case 'grand':
        case 'einstein':
            number = number.dividedBy(1000000000000000000000);
            break;
        case 'mether':
            number = number.dividedBy(1000000000000000000000000);
            break;
        case 'gether':
            number = number.dividedBy(1000000000000000000000000000);
            break;
        case 'tether':
            number = number.dividedBy(1000000000000000000000000000000);
            break;
    }

    return number.toNumber();
};

/**
Takes a number of a unit and converts it to wei.

Possible units are:

    - kwei/ada
    - mwei/babbage
    - gwei/shannon
    - szabo
    - finney
    - ether
    - kether/grand/einstein
    - mether
    - gether
    - tether

@method toWei
@param {Number|String} number can be a number or a HEX of a decimal
@param {String} unit the unit to convert to
@return {Number}
*/
EthTools.toWei = function(number, unit) {
    if(!number)
        return number;

    if(typeof number === 'string' && number.indexOf('0x') === 0)
        number = web3.toDecimal(number);

    if(!(number instanceof BigNumber))
        number = new BigNumber(number.toString());// toString to prevent errors, the user have to handle giving correct bignums themselves


    unit = unit.toLowerCase();

    switch(unit) {
        case 'kwei':
        case 'ada':
            number = number.times(1000);
            break;
        case 'mwei':
        case 'babbage':
            number = number.times(1000000);
            break;
        case 'gwei':
        case 'schannon':
            number = number.times(1000000000);
            break;
        case 'szabo':
            number = number.times(1000000000000);
            break;
        case 'finney':
            number = number.times(1000000000000000);
            break;
        case 'ether':
            number = number.times(1000000000000000000);
            break;
        case 'kether':
        case 'grand':
        case 'einstein':
            number = number.times(1000000000000000000000);
            break;
        case 'mether':
            number = number.times(1000000000000000000000000);
            break;
        case 'gether':
            number = number.times(1000000000000000000000000000);
            break;
        case 'tether':
            number = number.times(1000000000000000000000000000000);
            break;
    }

    return number.toNumber();
};


/**
Checks if the given string is a valid ethereum HEX address.

@method isAddress
@param {String} address the given HEX adress
@return {Boolean}
*/
EthTools.isAddress = function(address) {
    if(address.indexOf('0x') === 0 && address.length != 42)
        return false;
    if(address.indexOf('0x') === -1 && address.length != 40)
        return false;

    return /^\w+$/.test(address);
};


