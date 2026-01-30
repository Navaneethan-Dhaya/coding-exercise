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
exports.getSortedItemsNames = getSortedItemsNames;
exports.getSortedItems = getSortedItems;
/**
 * This function uses the Shell-sort algorithm to sort an array of item names.
 * It is a simple implementation that sorts the names in ascending order.
 *
 * This function takes an array of item names as input and returns a new array with the names sorted in ascending order.
 * @param itemNames - An array of item names to be sorted.
 * @returns A new array containing the sorted item names.
 */
function getSortedItemsNames(itemNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const preprocess = (name) => name.toLowerCase().trim();
        const extractNumber = (name) => {
            const match = name.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
        };
        let indexesAndNamesMap = itemNames.map((name, index) => [index, preprocess(name)]);
        let gap = Math.floor(indexesAndNamesMap.length / 2);
        while (gap > 0) {
            for (let i = gap; i < indexesAndNamesMap.length; i++) {
                const currentPair = indexesAndNamesMap[i];
                const currentNum = extractNumber(currentPair[1]);
                let j = i;
                while (j >= gap) {
                    const prevPair = indexesAndNamesMap[j - gap];
                    const prevNum = extractNumber(prevPair[1]);
                    if (prevNum > currentNum ||
                        (prevNum === currentNum && prevPair[1] > currentPair[1])) {
                        indexesAndNamesMap[j] = prevPair;
                        j -= gap;
                    }
                    else {
                        break;
                    }
                }
                indexesAndNamesMap[j] = currentPair;
            }
            gap = Math.floor(gap / 2);
        }
        return indexesAndNamesMap.map(([index]) => itemNames[index]);
    });
}
/**
 * This function uses the Shell-sort algorithm to sort an array of items.
 * It is a simple implementation that sorts the names in ascending order.
 *
 * This function takes an array of items as input and returns a new array with the items sorted in ascending order.
 * @param items - An array of items to be sorted.
 * @returns A new array containing the sorted items.
 */
function getSortedItems(items) {
    return __awaiter(this, void 0, void 0, function* () {
        const preprocess = (name) => name.toLowerCase().trim();
        const extractNumber = (name) => {
            const match = name.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
        };
        // Pair each item with its sortable name
        let indexedItems = items.map(item => [
            item,
            preprocess(item.name),
        ]);
        let gap = Math.floor(indexedItems.length / 2);
        while (gap > 0) {
            for (let i = gap; i < indexedItems.length; i++) {
                const current = indexedItems[i];
                const currentNum = extractNumber(current[1]);
                let j = i;
                while (j >= gap) {
                    const prev = indexedItems[j - gap];
                    const prevNum = extractNumber(prev[1]);
                    if (prevNum > currentNum ||
                        (prevNum === currentNum && prev[1] > current[1])) {
                        indexedItems[j] = prev;
                        j -= gap;
                    }
                    else {
                        break;
                    }
                }
                indexedItems[j] = current;
            }
            gap = Math.floor(gap / 2);
        }
        return indexedItems.map(([item]) => item);
    });
}
