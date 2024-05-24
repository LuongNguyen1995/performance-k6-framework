import http from 'k6/http';
import { check } from 'k6';
import { EnvVariables } from '../constants/EnvVariables';

// export const options = {
//     vus: 20,
//     duration: '2m',
//     thresholds: {
//       http_req_failed: ['rate<0.01'], // http errors should be less than 1%
//       http_req_duration: ['p(95)<500'], // 95% of requests should be below 200ms
//     },
//   };

export default function openUrl(){

    const res = http.get(EnvVariables.BASE_URL);
    check(res, {
        'is status 200': (r) => r.status === 200,
      });
}