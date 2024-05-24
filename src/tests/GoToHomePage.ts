import http from 'k6/http';
import { check, sleep } from 'k6';
import { EnvVariables } from '../constants/EnvVariables';
import { getRandomInt } from '../utils/helpers';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export default function openUrl(){

    const res = http.get(EnvVariables.BASE_URL);
    check(res, {
        'is status 200': (r) => r.status === 200,
      });
      sleep(getRandomInt(3));
}

export function handleSummary(data: any) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }