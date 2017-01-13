var ConnectionStore = function(){
    this.store = {};
};

ConnectionStore.prototype.add = function(connection, uuid){
    if(!this.store[uuid]){
        this.store[uuid] = connection;  
        return true;
    } 
    return false;
};

ConnectionStore.prototype.get = function(uuid){
    if(!this.store[uuid]){
        return false;
    } 
    return this.store[uuid];
};

ConnectionStore.prototype.delete = function(uuid){
    delete this.store[uuid];
    return true;
};

var store = new ConnectionStore();

module.exports = {
    get: function(){
        return store;
    }
};



