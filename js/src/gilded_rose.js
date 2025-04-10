function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

class ItemWrapper {
  constructor(item) {
    this.item = item;
  }

  update() {
    this.decreaseSellIn();

    if (this.item.quality <= 0) return;

    if (this.item.sell_in < 0) {
      this.decreaseQuality(2);
      return;
    }

    this.decreaseQuality(1);
  }

  decreaseSellIn() {
    this.item.sell_in -= 1;
  }

  decreaseQuality(amount = 1) {
    this.item.quality = Math.max(0, this.item.quality - amount);
  }
}

class AgedBrie extends ItemWrapper {
  update() {
    this.decreaseSellIn();

    this.increaseQuality();

    if (this.item.sell_in >= 0) return;

    this.increaseQuality();
  }

  increaseQuality(amount = 1) {
    this.item.quality = Math.min(50, this.item.quality + amount);
  }
}

class BackstagePass extends ItemWrapper {
  update() {
    this.decreaseSellIn();

    if (this.item.sell_in < 0) {
      this.item.quality = 0;

      return;
    }

    this.increaseQuality();

    if (this.item.sell_in >= 10) return;

    this.increaseQuality();

    if (this.item.sell_in >= 5) return;

    this.increaseQuality();
  }

  increaseQuality(amount = 1) {
    this.item.quality = Math.min(50, this.item.quality + amount);
  }
}

class Sulfuras extends ItemWrapper {
  update() {}
}

class ConjuredItem extends ItemWrapper {
  update() {
    this.decreaseSellIn();
    this.decreaseQuality(this.item.sell_in < 0 ? 4 : 2);
  }
}

var items = [];

const wrapItem = (item) => {
  if (item.name.startsWith('Conjured')) {
    return new ConjuredItem(item);
  }

  switch (item.name) {
    case 'Sulfuras, Hand of Ragnaros':
      return new Sulfuras(item);

    case 'Aged Brie':
      return new AgedBrie(item);
    
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePass(item);

    default:
      return new ItemWrapper(item);
  }
}

function update_quality() {
  for (let i = 0; i < items.length; i++) {  
    const wrapper = wrapItem(items[i])

    wrapper.update()
  }
}