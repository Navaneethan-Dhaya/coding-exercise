import {getSortedItems} from '../src/sortUtil';

describe('getSortedItems', () => {
  it('should sort item names numerically', async () => {
    const input = ['item1', 'item10', 'item2'];
    const output = await getSortedItems(input);
    expect(output).toEqual(['item1', 'item2', 'item10']);
  });

  it('should not mutate original array', () => {
    const input = ['item3', 'item20', 'item1'];
    const copy = [...input];
    getSortedItems(input);
    expect(input).toEqual(copy);
  });
});
