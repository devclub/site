export class LabelItem {
  name: string;
  count = 1;

  constructor(name: string) {
    this.name = name;
  }

  addCount() {
    this.count++;
  }
}
