#pragma once

#include <dmsdk/sdk.h>

#if defined(DM_PLATFORM_HTML5)

typedef void (*StoreGetHandler)(dmScript::LuaCallbackInfo* onSuccess,
                                dmScript::LuaCallbackInfo* onFailure,
                                const int callbackType,
                                char* dataOrError);

typedef void (*StoreSetHandler)(dmScript::LuaCallbackInfo* onSuccess,
                                dmScript::LuaCallbackInfo* onFailure,
                                const int callbackType,
                                char* error);

typedef void (*StoreDeleteHandler)(dmScript::LuaCallbackInfo* onSuccess,
                                   dmScript::LuaCallbackInfo* onFailure,
                                   const int callbackType,
                                   char* error);

extern "C" {
    void js_bridge_storage_get(StoreGetHandler handler,
                             const char* key,
                             dmScript::LuaCallbackInfo* onSuccess,
                             dmScript::LuaCallbackInfo* onFailure,
                             const char* storageType);

    void js_bridge_storage_set(StoreGetHandler handler,
                             const char* json,
                             dmScript::LuaCallbackInfo* onSuccess,
                             dmScript::LuaCallbackInfo* onFailure,
                             const char* storageType);

    char* js_bridge_storage_defaultType();

    bool js_bridge_storage_isAvailable(const char* storageType);

    bool js_bridge_storage_isSupported(const char* storageType);

    void js_bridge_storage_delete(StoreGetHandler handler,
                                const char* key,
                                dmScript::LuaCallbackInfo* onSuccess,
                                dmScript::LuaCallbackInfo* onFailure,
                                const char* storageType);
}

#endif