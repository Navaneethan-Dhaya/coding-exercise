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
exports.getItemsFromDatabase = getItemsFromDatabase;
let cache = [];
function getItemsFromDatabase(creds) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cache.length > 0 && !!creds) {
            return cache;
        }
        cache = [
            { id: 1, name: 'Item #10', quantity: 0.3 },
            { id: 2, name: 'Item #2', quantity: 0.2 },
            { id: 3, name: 'Item #1', quantity: 0.1 },
            { id: 4, name: 'Item #3', quantity: 0.7 },
            { id: 5, name: 'Item #4', quantity: 0.8 },
            { id: 6, name: 'Item #122', quantity: 0.5 },
            { id: 7, name: 'Item #14', quantity: 0.6 },
        ];
        // Only 1 third of the items are available at all times.
        // The rest is reserved for internal use.
        for (const item of cache)
            item.quantity = item.quantity / 3;
        return cache;
    });
}
