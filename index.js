// NPM Plugins
const breakpointMap = require('./src/js/generateMap')
const compileScss = require('./src/js/compileScss')
const msg = require('bit-message-box')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

class BreakpointSurfer {
  constructor (options = {}) {
    this._options = {
      breakpointsJson: './src/breakpoints.json',
      input: '',
      output: '',
      ...options
    }
  }

  // Error checking
  // --------------
  // Check for correct extensions
  _extensionCheck (file, expectedExtension) {
    if (path.extname(file).toLowerCase() !== `.${expectedExtension}`) {
      msg.error(`ERROR: File ${chalk.yellow(path.basename(file))} must have ${chalk.yellow(expectedExtension)} extension`)

      return false
    }

    return true
  }

  // Complete error check
  _errorCheck () {
    if (
      this._extensionCheck(this._options.breakpointsJson, 'json') &&
      this._extensionCheck(this._options.input, 'scss') &&
      this._extensionCheck(this._options.output, 'css')
    ) { return true } else { return false }
  }

  // Compile results
  // ---------------
  compile () {
    // Check for errors before continuing
    if (!this._errorCheck()) { return false }

    // Compile
    breakpointMap(this._options.breakpointsJson)
      .then((data) => {
        // Create scss map with name based on breakpointsJson
        this._mapName =

        fs.outputFile(path.join(__dirname, './generated/_resolutions.scss'), data)
          .then(() => {
            if (this._options.input !== '' && this._options.output !== '') {
            // Generate output
              compileScss({
                src: this._options.input,
                dest: this._options.output
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
}

module.exports = BreakpointSurfer
