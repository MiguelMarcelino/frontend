import { getCache, setCache } from "$lib/store";

function daysLeft(targetDate) {
  const targetTime = new Date(targetDate).getTime();
  const currentTime = new Date().getTime();
  const difference = targetTime - currentTime;

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math?.ceil(difference / millisecondsPerDay);

  return daysLeft;
}

export const load = async ({ parent, params }) => {
  const { apiKey, apiURL } = await parent();

  const getOptionsPlotData = async () => {
    const cachedData = getCache(params.tickerID, "getOptionsPlotData");
    if (cachedData) {
      return cachedData;
    } else {
      const postData = {
        ticker: params.tickerID,
      };

      const response = await fetch(apiURL + "/options-plot-ticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify(postData),
      });

      const output = await response.json();

      setCache(params.tickerID, output, "getOptionsPlotData");
      return output;
    }
  };

  const getOptionsChain = async () => {
    let output;
    const cachedData = getCache(params.tickerID, "getOptionsChain");
    if (cachedData) {
      output = cachedData;
    } else {
      const postData = {
        ticker: params.tickerID,
      };

      // make the POST request to the endpoint
      const response = await fetch(apiURL + "/options-chain-ticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify(postData),
      });

      output = await response.json();

      setCache(params.tickerID, output, "getOptionsChain");
    }

    return output;
  };

  const getOptionsGexData = async () => {
    let output;
    const cachedData = getCache(params.tickerID, "getOptionsGexData");
    if (cachedData) {
      output = cachedData;
    } else {
      const postData = {
        ticker: params.tickerID,
      };

      // make the POST request to the endpoint
      const response = await fetch(apiURL + "/options-gex-ticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify(postData),
      });

      output = await response.json();

      setCache(params.tickerID, output, "getOptionsGexData");
    }

    return output;
  };

  // Make sure to return a promise
  return {
    getOptionsPlotData: await getOptionsPlotData(),
    getOptionsChain: await getOptionsChain(),
    getOptionsGexData: await getOptionsGexData(),
  };
};
