module.exports = {
    "extends": "eslint-config-zcool",
    "rules": {
      // https://eslint.org/docs/rules/object-curly-spacing
      "object-curly-spacing": ["error", "always"],
  
      // https://eslint.org/docs/rules/lines-between-class-members
      "lines-between-class-members": ["error", "always", {
        exceptAfterSingleLine: true
      }],
  
      // https://eslint.org/docs/rules/no-multiple-empty-lines
      "no-multiple-empty-lines": ["error", {
        "max": 2,
        "maxBOF": 0,
        "maxEOF": 1,
      }]
    }
  };
  