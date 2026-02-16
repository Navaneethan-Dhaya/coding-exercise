import { getItemsFromDatabase } from '../../src/services/service';
import {CONFIG} from "../../src/configs/config";
const cred = CONFIG.dbPassword
describe('getItemsFromDatabase', () => {
  it('should return 3 items', async () => {
    const items = await getItemsFromDatabase(cred);
    expect(items.length).toBe(7);
  });

  it('should return item1 with quantity 0.03*', async () => {
    const items = await getItemsFromDatabase(cred);
    const item = items.find(i => i.name === 'Item #1');
    expect(item?.quantity).toBe(0.03333333333333333);
  });

  it('should return cached result on second call', async () => {
    const items1 = await getItemsFromDatabase(cred);
    const items2 = await getItemsFromDatabase(cred);
    expect(items1).toBe(items2);
  });
});
