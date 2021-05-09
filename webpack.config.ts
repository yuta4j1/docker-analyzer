const _path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

type BundleTarget = 'electron-main' | 'electron-preload' | 'web' | 'node'

const bundleTarget = (): BundleTarget => {
  switch (process.env.BUNDLE_TARGET) {
    case 'main':
      return 'electron-main'
    case 'preload':
      return 'electron-preload'
    case 'ui':
      return 'web'
    case 'tool':
      return 'node'
    default:
      return 'web'
  }
}

const defaultOutputPath = _path.resolve(__dirname, 'dist')

const tsRule = (): any => {
  return {
    test: /\.ts$/,
    use: ['ts-loader'],
    exclude: /node_modules/,
  }
}

const tsxRule = (): any => {
  return {
    test: /\.tsx?$/,
    use: ['ts-loader'],
    exclude: /node_modules/,
  }
}

const webpackConfig = (bundleTarget: BundleTarget) => {
  switch (bundleTarget) {
    case 'electron-main':
      return {
        mode: 'development',
        target: bundleTarget,
        entry: './src/app.ts',
        output: {
          filename: 'app.js',
          path: defaultOutputPath,
        },
        module: {
          rules: [tsRule()],
        },
        resolve: {
          extensions: ['.ts'],
        },
      }
    case 'electron-preload':
      return {
        mode: 'development',
        target: bundleTarget,
        entry: './src/preload.ts',
        output: {
          filename: 'preload.js',
          path: defaultOutputPath,
        },
        module: {
          rules: [tsRule()],
        },
        resolve: {
          extensions: ['.ts'],
        },
      }
    case 'web':
      return {
        mode: 'development',
        target: bundleTarget,
        entry: './src/ui/index.tsx',
        output: {
          filename: 'index.js',
          path: defaultOutputPath,
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/i,
              exclude: /node_modules/,
              use: [
                {
                  loader: 'babel-loader',
                },
                {
                  loader: '@linaria/webpack-loader',
                },
                {
                  loader: 'ts-loader',
                },
              ],
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: process.env.NODE_ENV !== 'production',
                  },
                },
              ],
            },
          ],
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './template/index.html',
            minify: false,
          }),
          new MiniCssExtractPlugin(),
        ],
      }
    case 'node':
      return {
        mode: 'development',
        target: bundleTarget,
        entry: './_tool/endpointTypedef.ts',
        output: {
          filename: 'endpointTypedef.js',
          path: __dirname,
        },
        module: {
          rules: [tsRule()],
        },
        resolve: {
          extensions: ['.ts'],
        },
      }
  }
}

module.exports = webpackConfig(bundleTarget())
