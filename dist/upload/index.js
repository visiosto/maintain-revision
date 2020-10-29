module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(974);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 613:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.run = void 0;
const path = __importStar(__webpack_require__(622));
const core = __importStar(__webpack_require__(929));
const bucket = __importStar(__webpack_require__(659));
const resolveDevelopmentVersion = (bucketName, path) => __awaiter(void 0, void 0, void 0, function* () {
    const numberString = yield bucket.readFile(bucketName, path);
    const versionNumber = parseInt(numberString) + 1;
    return versionNumber;
});
const uploadDevelopmentVersion = (bucketName, path, version) => __awaiter(void 0, void 0, void 0, function* () { return bucket.putFile(bucketName, path, String(version)); });
exports.run = (readVersion, writeVersion, isNpm = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workspace = process.env["GITHUB_WORKSPACE"];
        const versionFile = path.join(workspace, core.getInput("file"));
        const isRelease = core.getInput("release") === "true";
        core.info("Reading local version data from " + versionFile);
        const projectVersion = isNpm
            ? yield readVersion()
            : yield readVersion(versionFile);
        core.debug("The package version is " + projectVersion);
        if (isRelease) {
            core.setOutput("version", projectVersion);
        }
        else {
            const bucketName = core.getInput("bucket");
            const pathInput = core.getInput("path");
            const filePath = pathInput == ""
                ? yield bucket.getDefaultPath(projectVersion)
                : pathInput;
            const fileExists = yield bucket.fileExists(bucketName, filePath);
            const versionNumber = fileExists
                ? yield resolveDevelopmentVersion(bucketName, filePath)
                : 1;
            core.info("The development version number for the current run is " + versionNumber);
            const version = projectVersion.replace("-dev", "-dev." + versionNumber);
            if (isNpm) {
                yield writeVersion(projectVersion, version);
            }
            else {
                yield writeVersion(projectVersion, version, versionFile);
            }
            core.saveState("filePath", filePath);
            core.saveState("versionNumber", versionNumber);
            core.setOutput("version", version);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
});
exports.upload = () => __awaiter(void 0, void 0, void 0, function* () {
    const shouldUpload = core.getInput("upload") === "true";
    const isRelease = core.getInput("release") === "true";
    if (shouldUpload && !isRelease) {
        const bucketName = core.getInput("bucket");
        const filePath = core.getState("filePath");
        const versionNumber = parseInt(core.getState("versionNumber"));
        uploadDevelopmentVersion(bucketName, filePath, versionNumber);
    }
    else {
        core.info("Uploading the next development version number is disabled");
    }
});
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 659:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultPath = exports.putFile = exports.readFile = exports.fileExists = void 0;
const aws = __importStar(__webpack_require__(959));
const core = __importStar(__webpack_require__(929));
exports.fileExists = (bucketName, path, accessKeyId, secretAccessKey, region) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        const s3 = new aws.S3({
            apiVersion: "2006-03-01",
            accessKeyId: accessKeyId === undefined
                ? process.env["AWS_ACCESS_KEY_ID"]
                : accessKeyId,
            secretAccessKey: secretAccessKey === undefined
                ? process.env["AWS_SECRET_ACCESS_KEY"]
                : secretAccessKey,
            region: region === undefined ? process.env["AWS_DEFAULT_REGION"] : region
        });
        const params = {
            Bucket: bucketName,
            Key: path
        };
        s3.headObject(params, (err, data) => {
            if (err && err.code === "NotFound") {
                core.debug("File " + path + " doesn't exist in bucket " + bucketName);
                // Return false as the file doesn't exist.
                resolve(false);
            }
            else {
                core.debug("File " + path + " exists in bucket " + bucketName);
                resolve(true);
            }
        });
    });
});
exports.readFile = (bucketName, path, accessKeyId, secretAccessKey, region) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        const s3 = new aws.S3({
            apiVersion: "2006-03-01",
            accessKeyId: accessKeyId === undefined
                ? process.env["AWS_ACCESS_KEY_ID"]
                : accessKeyId,
            secretAccessKey: secretAccessKey === undefined
                ? process.env["AWS_SECRET_ACCESS_KEY"]
                : secretAccessKey,
            region: region === undefined ? process.env["AWS_DEFAULT_REGION"] : region
        });
        const params = {
            Bucket: bucketName,
            Key: path
        };
        s3.getObject(params, (err, data) => {
            var _a;
            if (err) {
                // TODO
                resolve(undefined);
            }
            else {
                resolve((_a = data.Body) === null || _a === void 0 ? void 0 : _a.toString());
            }
        });
    });
});
exports.putFile = (bucketName, path, content, accessKeyId, secretAccessKey, region) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const s3 = new aws.S3({
            apiVersion: "2006-03-01",
            accessKeyId: accessKeyId === undefined
                ? process.env["AWS_ACCESS_KEY_ID"]
                : accessKeyId,
            secretAccessKey: secretAccessKey === undefined
                ? process.env["AWS_SECRET_ACCESS_KEY"]
                : secretAccessKey,
            region: region === undefined ? process.env["AWS_DEFAULT_REGION"] : region
        });
        const params = {
            Bucket: bucketName,
            Key: path,
            Body: content
        };
        s3.putObject(params, (err, data) => {
            if (err) {
                core.warning("The upload of the file " +
                    path +
                    " with the content " +
                    content +
                    " failed: " +
                    err.code);
                reject();
            }
            else {
                core.debug("The latest development version was uploaded to bucket " + bucketName);
                resolve();
            }
        });
    });
});
exports.getDefaultPath = (version) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        var _a;
        const repository = (_a = process.env["GITHUB_REPOSITORY"]) === null || _a === void 0 ? void 0 : _a.replace("-", "_");
        const path = repository + "/" + version + "_version.txt";
        resolve(path);
    });
});
//# sourceMappingURL=bucket.js.map

/***/ }),

/***/ 929:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 959:
/***/ (function(module) {

module.exports = eval("require")("aws-sdk");


/***/ }),

/***/ 974:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __webpack_require__(613);
main_1.upload();
//# sourceMappingURL=index.js.map

/***/ })

/******/ });