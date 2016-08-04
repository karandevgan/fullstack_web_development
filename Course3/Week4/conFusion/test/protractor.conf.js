exports.config = {

    allScriptsTimeout: 11000,

    specs: [
        'e2e/contact.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3001',

    framework: 'jasmine',

    directConnect: true,

    jasmineNodeOpts: {

        defaultTimeoutInterval: 30000

    }
};