require('isomorphic-fetch');

global.fetch = fetch;
global.Buffer = global.Buffer || require('buffer').Buffer;

// Add any additional setup needed for your tests