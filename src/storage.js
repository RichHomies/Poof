import ReactNative from 'react-native';
var { AsyncStorage } =  ReactNative;

function save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

function get(key){
    return AsyncStorage.getItem(key);
}

function remove(key){
    return AsyncStorage.removeItem(key);
}

module.exports = {
    save: save,
    get: get
};