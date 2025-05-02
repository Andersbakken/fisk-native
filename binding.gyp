{
    "targets": [
        {
            "target_name": "fisk-native",
            "sources": [ "fisk-native.cpp" ],
            "defines": [ "NODE_ADDON_API_DISABLE_CPP_EXCEPTIONS" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
            ]
        }
    ]
}
