import {Item} from "./items";

/**
 * This function uses the Shell-sort algorithm to sort an array of item names.
 * It is a simple implementation that sorts the names in ascending order.
 *
 * This function takes an array of item names as input and returns a new array with the names sorted in ascending order.
 * @param itemNames - An array of item names to be sorted.
 * @returns A new array containing the sorted item names.
 */
export async function getSortedItemsNames(itemNames: string[]): Promise<string[]> {
  const preprocess = (name: string): string =>
      name.toLowerCase().trim();

  const extractNumber = (name: string): number => {
    const match = name.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  let indexesAndNamesMap: [number, string][] = itemNames.map(
      (name, index) => [index, preprocess(name)]
  );

  let gap = Math.floor(indexesAndNamesMap.length / 2);

  while (gap > 0) {
    for (let i = gap; i < indexesAndNamesMap.length; i++) {
      const currentPair = indexesAndNamesMap[i];
      const currentNum = extractNumber(currentPair[1]);

      let j = i;
      while (j >= gap) {
        const prevPair = indexesAndNamesMap[j - gap];
        const prevNum = extractNumber(prevPair[1]);

        if (
            prevNum > currentNum ||
            (prevNum === currentNum && prevPair[1] > currentPair[1])
        ) {
          indexesAndNamesMap[j] = prevPair;
          j -= gap;
        } else {
          break;
        }
      }

      indexesAndNamesMap[j] = currentPair;
    }

    gap = Math.floor(gap / 2);
  }

  return indexesAndNamesMap.map(([index]) => itemNames[index]);
}

/**
 * This function uses the Shell-sort algorithm to sort an array of items.
 * It is a simple implementation that sorts the names in ascending order.
 *
 * This function takes an array of items as input and returns a new array with the items sorted in ascending order.
 * @param items - An array of items to be sorted.
 * @returns A new array containing the sorted items.
 */
export async function getSortedItems(items: Item[]): Promise<Item[]> {
  const preprocess = (name: string): string =>
      name.toLowerCase().trim();

  const extractNumber = (name: string): number => {
    const match = name.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Pair each item with its sortable name
  let indexedItems: [Item, string][] = items.map(item => [
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

        if (
            prevNum > currentNum ||
            (prevNum === currentNum && prev[1] > current[1])
        ) {
          indexedItems[j] = prev;
          j -= gap;
        } else {
          break;
        }
      }

      indexedItems[j] = current;
    }

    gap = Math.floor(gap / 2);
  }

  return indexedItems.map(([item]) => item);
}
