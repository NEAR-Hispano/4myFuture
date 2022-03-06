
export const coingeckoUrl = async (date: string) => {
        return `https://api.coingecko.com/api/v3/coins/near/history?date=${date}&localization=false`;
}  
export const coingeckoFetch = async (data: string) => {         
        fetch(await coingeckoUrl(data)).then((response) =>
          response.json().then((jsonData) => {
            return (parseFloat(jsonData.market_data.current_price.usd).toFixed(2))
           })
        );
      };