import * as sortUtil from '../src/sortUtil';

import {getSortedItemsNames} from "../src/sortUtil";

describe('getSortedItemsNames', () => {
  it('should sort item names numerically', async () => {
    const input = ['item1', 'item10', 'item2'];
    const output = await getSortedItemsNames(input);
    expect(output).toEqual(['item1', 'item2', 'item10']);
  });

  it('should not mutate original array', async () => {
    const input = ['item3', 'item20', 'item1'];
    const copy = [...input];
    await getSortedItemsNames(input);
    expect(input).toEqual(copy);
  });
});
