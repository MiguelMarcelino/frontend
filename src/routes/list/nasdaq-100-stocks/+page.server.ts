export const load = async ({ locals }) => {
  const getNasdaqConstituentsStocks = async () => {
    const { apiKey, apiURL } = locals;

    const postData = { filterList: "nasdaqConstituent" };

    const response = await fetch(apiURL + "/exchange-constituents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(postData),
    });

    const output = await response.json();

    return output;
  };

  // Make sure to return a promise
  return {
    getNasdaqConstituentsStocks: await getNasdaqConstituentsStocks(),
  };
};
