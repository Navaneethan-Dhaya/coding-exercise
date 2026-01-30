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
const sortUtil_1 = require("../src/sortUtil");
describe('getSortedItemsNames', () => {
    it('should sort item names numerically', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = ['item1', 'item10', 'item2'];
        const output = yield (0, sortUtil_1.getSortedItemsNames)(input);
        expect(output).toEqual(['item1', 'item2', 'item10']);
    }));
    it('should not mutate original array', () => {
        const input = ['item3', 'item20', 'item1'];
        const copy = [...input];
        (0, sortUtil_1.getSortedItemsNames)(input);
        expect(input).toEqual(copy);
    });
});
