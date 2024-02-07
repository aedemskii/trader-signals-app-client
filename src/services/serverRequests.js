const API_BASE_URL = 'http://127.0.0.1:5000';

export const requestAuth = async (password) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });
    if (!response.ok) {
      throw new Error("There was an error in auth request");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching auth:", error);
    return null;
  }
};

export const requestChartData = async (assetName, timeframe) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${assetName}/${timeframe}`);
    if (!response.ok) {
      throw new Error("There was an error in trade signals request");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${assetName} trade signals:`, error);
    return null;
  }
};
