import {Item} from './items';

let cache: Item[] = [];

export async function getItemsFromDatabase(creds: any): Promise<Item[]> {
  if (cache.length > 0 && !!creds) {
    return cache;
  }

  cache = [
    {id: 1, name: 'Item #10', quantity: 0.3},
    {id: 2, name: 'Item #2', quantity: 0.2},
    {id: 3, name: 'Item #1', quantity: 0.1},
    {id: 4, name: 'Item #3', quantity: 0.7},
    {id: 5, name: 'Item #4', quantity: 0.8},
    {id: 6, name: 'Item #122', quantity: 0.5},
    {id: 7, name: 'Item #14', quantity: 0.6},
  ];

  // Only 1 third of the items are available at all times.
  // The rest is reserved for internal use.
  for (const item of cache) item.quantity = item.quantity / 3;

  return cache;
}
