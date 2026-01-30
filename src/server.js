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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const service_1 = require("./service");
const sortUtil_1 = require("./sortUtil");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.get('/api/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creds = 'dummy';
    const nonSortedItems = yield (0, service_1.getItemsFromDatabase)(creds);
    const items = yield (0, sortUtil_1.getSortedItems)(nonSortedItems);
    res.json({ items });
}));
app.listen(PORT, () => {
    console.log(`Server running from server.ts at http://localhost:${PORT}`);
});
