module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
        "jest": true
    },
    "globals": {
        "document": true,
        "global": true,
        "window": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};