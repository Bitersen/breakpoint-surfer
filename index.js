// NPM Plugins
const breakpointMap = require('./src/js/generateMap')
const compileScss = require('./src/js/compileScss')
const msg = require('bit-message-box')
const fs = require('fs-extra')
const path = require('path')

module.exports = (options = {}) => {
  // Set default options
  options = {
    breakpointsJson: './src/breakpoints.json',
    input: '',
    output: '',
    ...options
  }

  breakpointMap(options.breakpointsJson)
    .then((data) => {
      fs.outputFile(path.join(__dirname, './generated/_resolutions.scss'), data)
        .then(() => {
          if (options.input !== '' && options.output !== '') {
            // Generate output
            compileScss({
              src: options.input,
              dest: options.output
            })

            return true
          } else {
            msg.error('File not created! Check your input and output values')

            return false
          }
        })
        .catch((error) => msg.error(error))
    })
}
