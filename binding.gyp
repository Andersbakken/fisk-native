{
    "targets": [
        {
            "target_name": "fisk-native",
            "sources": [ "fisk-native.cpp" ],
            "defines": [ "NODE_ADDON_API_DISABLE_CPP_EXCEPTIONS" ],
            "include_dirs": [
                "node_modules/node-api-headers/include",
                "node_modules/node-addon-api/"
            ]
        }
    ]
}
