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
Takes a number fo wei and converts it to any other ether unit.

Possible units are:

    - kwei
    - mwei
    - gwei
    - szabo
    - finney
    - ether
    - kether/grand
    - mether
    - gether
    - tether

@method convertWei
@param {Number|String} number can be a number or a HEX of a decimal
@param {String} unit the unit to convert to
@return {Number}
*/
EthTools.convertWei = function(number, unit) {
    if(_.isString(number) && number.indexOf('0x') === 0)
        number = web3.toDecimal(number);

    unit = unit.toLowerCase();

    switch(unit) {
        case 'kwei':
            number /= 1000;
            break;
        case 'mwei':
            number /= 1000000;
            break;
        case 'gwei':
            number /= 1000000000;
            break;
        case 'szabo':
            number /= 1000000000000;
            break;
        case 'finney':
            number /= 1000000000000000;
            break;
        case 'ether':
            number /= 1000000000000000000;
            break;
        case 'kether':
        case 'grand':
            number /= 1000000000000000000000;
            break;
        case 'mether':
            number /= 1000000000000000000000000;
            break;
        case 'gether':
            number /= 1000000000000000000000000000;
            break;
        case 'tether':
            number /= 1000000000000000000000000000000;
            break;
    }

    return number;
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


