#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const child_process = require("child_process");

let compiler;
if (os.platform() === "darwin") {
    compiler = "clang++";
} else {
    compiler = "g++";
}

let napiIncludeDir = require("node-addon-api").include;
if (napiIncludeDir.startsWith('"') && napiIncludeDir.endsWith('"')) {
    napiIncludeDir = napiIncludeDir.substring(1, napiIncludeDir.length - 1);
}

try {
    fs.mkdirSync(path.join(__dirname, "build"));
} catch (err) {}

child_process.execFile(
    compiler,
    [
        "-c",
        path.join(__dirname, "fisk-native.cpp"),
        `-I${napiIncludeDir}`,
        `-I${require("node-api-headers").include_dir}`,
        "-pthread",
        "-O3",
        "-Wall",
        "-Wextra",
        "-fPIC",
        "-o",
        path.join(__dirname, "build", "fisk-native.o")
    ],
    (err, stdout, stderr) => {
        if (err) {
            console.error("Compile error:", err);
            process.exit(1);
            return;
        }
        if (stdout) {
            console.log("Compiler output:", stdout);
        }
        if (stderr) {
            console.error("Compiler error Output:", stderr);
        }

        child_process.execFile(
            compiler,
            [
                "-shared",
                "-pthread",
                "-rdynamic",
                "-m64",
                `-Wl,-soname=fisk-native.node`,
                `-Wl,--start-group`,
                path.join(__dirname, "build", "fisk-native.o"),
                `-Wl,--end-group`,
                "-o",
                path.join(__dirname, "build", "fisk-native.node")
            ],
            (err, stdout, stderr) => {
                if (err) {
                    console.error("Error:", err);
                    process.exit(1);
                    return;
                }
                if (stdout) {
                    console.log("Linker output:", stdout);
                }
                if (stderr) {
                    console.error("Linker error Output:", stderr);
                }
            }
        );
    }
);
