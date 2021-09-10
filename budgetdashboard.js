import http from "k6/http";
import { check,sleep } from "k6";

export let options = {
  vus: 1000,
  duration: "60s"
};

export default function() {
  var url = "https://danone.gits.id/budgets/dashboard-new";
  var params = { 
    headers: {
         "Authorization": "hide for secure",
         "Content-Type": "application/json",
         "profile_id": "100"      
    },
    body : {
      "year" : "2020"
    }
  };
  check(http.get(url, params), {
    "status is 200": (r) => r.status == 200,
    "status is not 200": (r) => r.status != 200,
    "transaction time OK": (r) => r.timings.duration < 1000
  });
  sleep(1);
};

