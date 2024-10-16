// CommonJS
// const axiosRetry = require('axios-retry').default;

// ES6
import axiosRetry from "axios-retry";

useEffect(() => {
  axiosRetry(client, { retries: 3, retryDelay: linearDelay() });
  fetchCountAllFloor();
}, [payloadSearch]);

const client = axios.create({
  headers: {
    Authorization: authorizationCode ? authorizationCode : "",
  },
});

const fetchCountAllFloor = async () => {
  await client
    .get("/statistic/countAllFloor", {
      params: payloadSearch,
    })
    .then((response) => {
      setCountAllFloorKey(response.data.floor);
      setCountAllFloorVal(response.data.floorData.map(Number));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
