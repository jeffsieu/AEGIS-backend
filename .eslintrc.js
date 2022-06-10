/* eslint-disable no-undef */
module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:security/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "no-unused-vars": 1,
        "semi": [
          "error",
          "always"
        ],
        "quotes": [
          "error",
          "double"
        ]
    },
};
