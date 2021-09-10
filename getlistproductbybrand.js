import http from "k6/http";
import { check,sleep } from "k6";

export let options = {
  vus: 1000,
  duration: "60s"
};

export default function() {
  var url = "https://danone.gits.id/brand?brand_id=1";
  var params = { headers: {
        "Authorization": "hide for secure",
         "Content-Type": "application/json",
         "limit": "10"        
    },
      body : {
      "code": "GGS001",
      "cost_group_id": 1,
      "pctr": "MT",
      "mat_group": "X010201",
      "ar1": "PUB - PUBLICITY",
      "bpc": "CONSUMER COMMUNICATIONS"
    }
  };
  check(http.get(url, params), {
    "status is 200": (r) => r.status == 200,
    "status is not 200": (r) => r.status != 200,
    "transaction time OK": (r) => r.timings.duration < 1000
  });
  sleep(1);
};

