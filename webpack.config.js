const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  // Function to get all the files in a folder recursively
  function getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    });
    return files.flat();
  }

  const entries = {};

  // Array of folder to search for files
  const folders = ['api', 'constants','env', 'reports', 'tests', 'utils'];

  // Iterate all files and attach them to the entries object
  folders.forEach(folder => {
    const files = getFiles(`./src/${folder}/`);

    files.forEach(file => {
      entries[file.replace(/src\\|\.ts/g, '')] = file.replace('src\\', './');
    });
  });

  const commonConfig = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'), // sets src as the base project path
    entry: entries, // Generates multiple entry for each test
    output: {
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs',
      filename: '[name].js',
    },

    resolve: {
      extensions: ['.ts', '.js'],

    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    target: 'web',
    externals: /^(k6|https?\:\/\/)(\/.*)?/,
    // Generate map files for compiled scripts
    devtool: "source-map",
    stats: {
      colors: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      // Copy assets to the destination folder
      // see `src/post-file-test.ts` for an test example using an asset
      new CopyPlugin({
        patterns: [{
          //Copy assets to the destination folder
          from: path.resolve(__dirname, 'assets'),
          noErrorOnMissing: true
        }, {
          //Copy all files from src/config to dist/config 
          from: path.resolve(__dirname, 'src/config'),
          to: path.resolve(__dirname, 'dist/config'),
          noErrorOnMissing: true
        }],
      }),
    ],
    optimization: {
      // Don't minimize, as it's not used in the browser
      minimize: false,
    },
  }

  return commonConfig;
}