"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_readline_1 = __importDefault(require("node:readline"));
const rl = node_readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question(`Enter you long URL: `, (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield shortUrl(url);
        console.log("Shortened URL: ", response);
    }
    catch (err) {
        console.log(err);
    }
    rl.close();
}));
function shortUrl(longUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
        try {
            const response = yield axios_1.default.get(apiUrl);
            return response.data;
        }
        catch (err) {
            console.log(err);
            throw new Error('Failed to shorten URL');
        }
    });
}
//# sourceMappingURL=url_shortener.js.map