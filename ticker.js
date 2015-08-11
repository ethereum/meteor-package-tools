// Price ticker
EthTools.ticker = new Mongo.Collection('ethereum_price_ticker', {connection: null});
if(Meteor.isClient)
    new PersistentMinimongo(EthTools.ticker);

var updatePrice = function(e, res){
    if(!e && res.statusCode === 200 && res.data && _.isEmpty(res.data.error)){
        _.each(res.data.result, function(item, key){
            var name = key.replace('XETHZ','').toLowerCase();

            if(key === 'XETHXXBT')
                name = 'btc';

            EthTools.ticker.upsert(name, {$set: {
                price: item.c[0]
            }});

        });
    } else {
        console.warn('Can not connect to api.kraken.com to get price ticker data, please check you internet connection');
    }
};

// update right away
HTTP.get('https://api.kraken.com/0/public/Ticker?pair=XETHZEUR,XETHZUSD,XETHZGBP,XETHZJPY,XETHZCAD,XETHXXBT', updatePrice);
    

// update prices
Meteor.setInterval(function(){
    HTTP.get('https://api.kraken.com/0/public/Ticker?pair=XETHZEUR,XETHZUSD,XETHZGBP,XETHZJPY,XETHZCAD,XETHXXBT', updatePrice);    
}, 1000 * 30);
