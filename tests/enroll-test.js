
var binary = require('node-pre-gyp');
var path = require('path')
var binding_path = binary.find(path.resolve(path.join(__dirname,'../package.json')));
var ziti = require(binding_path);
require('assert').equal(ziti.NF_hello(),"ziti");



const NF_enroll = async (jwt_path) => {
    return new Promise((resolve, reject) => {
        let rc = ziti.NF_enroll(jwt_path, (data) => {
            if (data.identity) {
                resolve(data);
            } else {
                reject(data);
            }
        });
    });
};


(async () => {

    let jwt_path = process.argv[2];

    let data = await NF_enroll(jwt_path).catch((data) => {
        console.log('NF_enroll failed with error code (%o)', data.len);
    });

    if (data && data.identity) {
        console.log("data.identity is:\n\n%s", data.identity);
    }

    process.exit(0);

})();
