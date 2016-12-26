import EventEmitter from 'EventEmitter';

var events = new EventEmitter();

var obj = {
    name: null,
    poofs: []
};

events.addListener('updateState', function(key, value){
    obj[key] = value;
    trigger('newState', obj);
});

function trigger(namespace, data){
    events.emit(namespace, data);
}

module.exports = events;