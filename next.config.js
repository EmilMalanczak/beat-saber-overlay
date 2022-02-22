/**
 * @type {import('next').NextConfig}
 * */
// import { join, relative } from 'path'
// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: (content, { resourcePath, rootContext }) => {
      // More information about available properties https://webpack.js.org/api/loaders/
      const relativePath = path.relative(rootContext, resourcePath).replace(/\\/g, '/')

      // prevent import loop in sass modules
      const isModule = relativePath.startsWith('src/styles/')

      if (isModule) return content

      return `@use 'common' as *; ${content}`
    }
  }
}
