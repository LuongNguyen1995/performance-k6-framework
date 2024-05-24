### For run test case
```bash
k6 run -e BASE_URL=http://test.k6.io/ --config src/config/Opt_Load_OpenUrl.json dist/tests/GoToHomePage.js