## Running the test

**Install dependencies**
```bash
npm install
```

## Running the test
To run a test written in TypeScript, we first have to transpile the TypeScript code into JavaScript running a bundler. This project uses `Webpack` to bundle the different files into ES modules (ESM), using its [`webpack.config.js`](./webpack.config.js) configuration.
The next command transforms each TypeScript test in `./src` to the `./dist` folder as ES modules.
```bash
npm start
```

Once that is done, we can run our script the same way we usually do, for instance:



```bash
k6 run -e BASE_URL=<URL> --config <config path> <file run>
```
Example:
```bash
k6 run -e BASE_URL=http://test.k6.io/ --config src/config/Opt_Load.json dist/tests/GoToHomePage.js
```