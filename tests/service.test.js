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
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../src/service");
const config_1 = require("../src/config");
const cred = config_1.CONFIG.dbPassword;
describe('getItemsFromDatabase', () => {
    it('should return 3 items', () => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield (0, service_1.getItemsFromDatabase)(cred);
        expect(items.length).toBe(7);
    }));
    it('should return item1 with quantity 0.03*', () => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield (0, service_1.getItemsFromDatabase)(cred);
        const item = items.find(i => i.name === 'Item #1');
        expect(item === null || item === void 0 ? void 0 : item.quantity).toBe(0.03333333333333333);
    }));
    it('should return cached result on second call', () => __awaiter(void 0, void 0, void 0, function* () {
        const items1 = yield (0, service_1.getItemsFromDatabase)(cred);
        const items2 = yield (0, service_1.getItemsFromDatabase)(cred);
        expect(items1).toBe(items2);
    }));
});
