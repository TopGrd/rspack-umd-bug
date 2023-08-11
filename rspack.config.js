/**
 * @type {import('@rspack/cli').Configuration}
 */
const NodePolyfill = require('@rspack/plugin-node-polyfill');
const baseConfig = require('./rspack.base.config');
const minifyPlugin = require('@rspack/plugin-minify');


const getBuildPlugins = () => {
  const plugins = [new NodePolyfill()];

  return plugins;
};

const getBuildConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    const plugins = getBuildPlugins();
    const output = baseConfig.output;
    return {
      ...baseConfig,
      builtins: {
        html: [
          {
            template: './public/index.html',
          },
        ],
      },
      entry: {
        main: './src/App.tsx',
      },
      output: {
        ...(output ?? {}),
        filename: 'aes-cube-analytic.min.js',
        cssFilename: 'aes-cube-analytic.min.css',
        library: {
          name: 'Analytics',
          type: 'umd',
          umdNamedDefine: true,
        },
      },
      devtool: 'hidden-source-map',
      plugins,
      optimization: {
        minimize: true,
        minimizer: [
          new minifyPlugin({
            minifier: 'esbuild',
            css: true,
          }),
        ],
      },
    };
  }

  return baseConfig;
};

module.exports = getBuildConfig();
