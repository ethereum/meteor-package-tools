// Price ticker
EthTools.ticker = new Mongo.Collection('ethereum_price_ticker', {connection: null});
if(Meteor.isClient)
    new PersistentMinimongo(EthTools.ticker);

var updatePrice = function(e, res){

    if(!e && res && res.statusCode === 200) {
        var content = JSON.parse(res.content);

        if(content && content.Response === 'Success' && content.Data){
            _.each(content.Data, function(item){
                var name = item.Symbol.toLowerCase();

                // make sure its a number and nothing else!
                if(_.isFinite(item.Price)) {
                    EthTools.ticker.upsert(name, {$set: {
                        price: String(item.Price),
                        timestamp: item.LastUpdateTS
                    }});
                }

            });
        }
    } else {
        console.warn('Can not connect to https://www.cryptocompare.com/api to get price ticker data, please check your internet connection.');
    }
};

// update right away
HTTP.get(' https://www.cryptocompare.com/api/data/price?fsym=ETH&tsyms=BTC,USD,EUR', updatePrice);
    

// update prices
Meteor.setInterval(function(){
    HTTP.get(' https://www.cryptocompare.com/api/data/price?fsym=ETH&tsyms=BTC,USD,EUR', updatePrice);    
}, 1000 * 30);
