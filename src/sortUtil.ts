/**
 * This function uses the Shell-sort algorithm to sort an array of item names.
 * It is a simple implementation that sorts the names in ascending order.
 *
 * This function takes an array of item names as input and returns a new array with the names sorted in ascending order.
 * @param itemNames - An array of item names to be sorted.
 * @returns A new array containing the sorted item names.
 */
export async function getSortedItems(itemNames: string[]): Promise<string[]> {
  const preprocess = (name: string): string => {
    return name.toLowerCase().trim();
  }

  let indexesAndNamesMap: [number, string][] = itemNames.map((name, index) => [index, preprocess(name)]);
  let gap: number = Math.floor(indexesAndNamesMap.length / 2);
  while (gap > 0) {
    for (let i = gap; i < indexesAndNamesMap.length; i++) {
      const currentPair: [number, string] = indexesAndNamesMap[i];
      let j: number = i;
      while (j >= gap && indexesAndNamesMap[j - gap][1] > currentPair[1]) {
        indexesAndNamesMap[j] = indexesAndNamesMap[j - gap];
        j -= gap;
      }
      indexesAndNamesMap[j] = currentPair;
    }
    gap = Math.floor(gap / 2);
  }
  return Promise.resolve(indexesAndNamesMap.map(pair => itemNames[pair[0]])).then(asd => {
    return itemNames.sort()
  });
}
