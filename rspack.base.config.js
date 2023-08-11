/**
 * @type {import('@rspack/cli').Configuration}
 */
const NodePolyfill = require('@rspack/plugin-node-polyfill');
const path = require('path');
const AesConfig = require('./aes.config');

const getInitialState = (config) => {
  return {
    state: {
      env: config.env,
      pid: config.pid,
    },
    ...AesConfig,
  };
};

const aesConfig = getInitialState(AesConfig);

module.exports = {
  context: __dirname,
  entry: {
    main: './src/App.tsx',
  },
  builtins: {
    html: [
      {
        template: './public/index.html',
        templateParameters: {
          state: JSON.stringify(aesConfig.state),
          pid: aesConfig.pid,
        },
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    alias: {
      '@': './src',
    },
    tsConfigPath: path.resolve(__dirname, 'tsconfig.json'),
  },
  plugins: [new NodePolyfill()],
  devServer: {
    allowedHosts: ['all'],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    webSocketServer: 'ws',
    devMiddleware: {
      publicPath: '/',
    },
    open: true,
    historyApiFallback: true,
    static: './',
    client: {
      overlay: false,
    },
  },
  experiments: {
    incrementalRebuild: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
    axios: 'axios',
    moment: 'moment'
  },
};
