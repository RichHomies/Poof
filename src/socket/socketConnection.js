var client = new WebSocket('ws://localhost:8080/', "echo-protocol");



function connectClient(){
    return new Promise(function (resolve, reject) {
        client.onopen = function() {
            console.log('WebSocket Client Connected');

            resolve(client);
        };

        client.onclose = function() {
            console.log('echo-protocol Connection Closed');
        };

        client.onerror = function(error) {
            console.log('Connect Error: ' + error.toString());
            reject(error);
        };
    });
}





module.exports = connectClient();