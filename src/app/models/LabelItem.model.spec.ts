import { LabelItem } from './LabelItem.model';

describe('LabelItem', () => {
  it('starts with a count of 1', () => {
    const item = new LabelItem('battle');
    expect(item.name).toBe('battle');
    expect(item.count).toBe(1);
  });

  it('increments the count via addCount()', () => {
    const item = new LabelItem('battle');
    item.addCount();
    item.addCount();
    expect(item.count).toBe(3);
  });
});
