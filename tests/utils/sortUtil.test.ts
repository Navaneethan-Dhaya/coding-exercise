import * as sortUtil from '../../src/utils/sortUtil';

import {getSortedItemsNames} from "../../src/utils/sortUtil";

describe('getSortedItemsNames', () => {
  it('should sort item names numerically', async () => {
    const input = ['item1', 'item10', 'item2'];
    const output = getSortedItemsNames(input);
    expect(output).toEqual(['item1', 'item2', 'item10']);
  });

  it('should not mutate original array', async () => {
    const input = ['item3', 'item20', 'item1'];
    const copy = [...input];
    getSortedItemsNames(input);
    expect(input).toEqual(copy);
  });

  it('getSortedItemsNames additional conditions', async () => {
    const input = ['a', 'item3', 'item20', 'item1', 'b', '1'];
    const output = getSortedItemsNames(input);
    expect(output).toEqual(['1', 'a', 'b', 'item1', 'item3', 'item20']);
  });
});
