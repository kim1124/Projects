var crypto = require('crypto');
var mysalt = "kim1124";

module.exports = function(password){

    return crypto.createHash('sha512').update( password + mysalt).digest('base64');
    
};
