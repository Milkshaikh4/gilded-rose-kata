function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name === "Sulfuras, Hand of Ragnaros") continue;

    items[i].sell_in = items[i].sell_in - 1;

    if (items[i].name === "Aged Brie") {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
      }
      if (items[i].quality < 50 && items[i].sell_in < 0) {
        items[i].quality = items[i].quality + 1;
      }

      continue;
    }

    if (items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
      if (items[i].sell_in < 0) {
        items[i].quality = items[i].quality - items[i].quality;

        continue;
      }

      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
      }
      if (items[i].sell_in < 10) {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
      }
      if (items[i].sell_in < 5) {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
      }

      continue;
    }

    if (items[i].quality <= 0) continue;

    if (items[i].sell_in < 0) {
      items[i].quality = items[i].quality - 2;
      continue;
    }

    items[i].quality = items[i].quality - 1;
  }
}
