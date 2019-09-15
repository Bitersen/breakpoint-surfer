const sass = require('node-sass')
const fs = require('fs-extra')
const msg = require('bit-message-box')
const groupCss = require('group-css-media-queries')
const CleanCss = require('clean-css')
const path = require('path')
const chalk = require('chalk')

module.exports = (options = {}) => {
  return new Promise((resolve, reject) => {
    // Set default options
    options = {
      style: 'compressed',
      includePaths: [
        path.join(__dirname, '../'),
        path.join(__dirname, '../scss/'),
        path.join(__dirname, '../../generated/')
      ],
      ...options
    }

    // Compile SCSS
    let result = sass.renderSync({
      includePaths: options.includePaths,
      file: options.src,
      outputStyle: options.style,
    })

    // Group media queries
    result = groupCss(result.css.toString())

    // Clean output CSS
    const cleaned = new CleanCss({
      level: 2,
      format: 'beautify',
      specialComments: 'all'
    }).minify(result)

    // Write the result to file
    fs.outputFile(options.dest, cleaned.styles)
      .then(() => {
        // log successful compilation to terminal
        msg.info(`${chalk.blue('Surf\'s up:')} ${chalk.cyan(options.dest)}`)

        resolve()
      })
      .catch((err) => {
        msg.error(err)
      })
  })
}
