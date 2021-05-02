const _path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
          rules: [tsxRule()],
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: './template/index.html',
            minify: false,
          }),
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
