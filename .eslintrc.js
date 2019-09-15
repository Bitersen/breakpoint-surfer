module.exports = {
	"env": {
		"node": true
	},
  "parser": "babel-eslint",
	"extends": "standard",
  "rules": {
		"comma-dangle": ["error", "only-multiline"],
		"no-tabs": "off"
	},
	"parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": true
  }
}
