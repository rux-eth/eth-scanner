import axios from "axios";

test("CC API Req", async () => {
  const url = "http://localhost:3000/claims";
  const res = await axios.get(url, {
    params: {
      address: "0x599ED2119EFC6b97d23729E0f2aF5Bf71c1e1249",
      claimIds: [1, 5, 7],
    },
  });
  console.log(res);
});
