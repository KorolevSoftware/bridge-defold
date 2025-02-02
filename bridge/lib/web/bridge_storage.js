let js_bridge_storage = {
    js_bridge_storage_defaultType() {
        return stringToNewUTF8(bridge.storage.defaultType);
    },

    js_bridge_storage_isAvailable(storageType) {
        return bridge.storage.isAvailable(UTF8ToString(storageType));
    },
    
    js_bridge_storage_isSupported(storageType) {
        return bridge.storage.isSupported(UTF8ToString(storageType));
    },

    js_bridge_storage_get: function (handler, key, success, failure, storageType) {
        bridge.storage.get(UTF8ToString(key), UTF8ToString(storageType), false)
            .then(data => {
                var luaData = "";
                if(Array.isArray(data)) {
                    luaData = data[0];
                } else {
                    luaData = data;
                }
                {{{ makeDynCall('viiii', 'handler') }}} (success, failure, 0, stringToNewUTF8(luaData));
            })
            .catch(error => {
                {{{ makeDynCall('viiii', 'handler') }}} (success, failure, 1, stringToNewUTF8("" + error));
            });
    },

    js_bridge_storage_set: function (handler, key, value, success, failure, storageType) {
        bridge.storage.set(UTF8ToString(key), UTF8ToString(value), UTF8ToString(storageType))
            .then(() => {
                {{{ makeDynCall('viiii', 'handler') }}} (success, failure, 0, stringToNewUTF8(""));
            })
            .catch(error => {
                {{{ makeDynCall('viiii', 'handler') }}} (success, failure, 1, stringToNewUTF8("" + error));
            });
    },

    js_bridge_storage_delete: function (handler, key, success, failure, storageType) {
        bridge.storage.delete(UTF8ToString(key), UTF8ToString(storageType))
            .then(() => {
                {{{ makeDynCall('viiii', 'handler') }}} (success, failure, 0, stringToNewUTF8(""));
            })
            .catch(error => {
                {{{ makeDynCall('viiii', 'handler') }}} (success, failure, 1, stringToNewUTF8("" + error));
            });
    }
}

mergeInto(LibraryManager.library, js_bridge_storage);