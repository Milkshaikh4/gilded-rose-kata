const SULFURAS_QUALITY = 80;

describe("Gilded Rose", function () {
  describe("Special cases", () => {
    it("Sulfuras' quality and expiration date never drops (before and after the sell_in date)", function () {
      items = [
        new Item("Sulfuras, Hand of Ragnaros", 5, SULFURAS_QUALITY),
        new Item("Sulfuras, Hand of Ragnaros", -1, SULFURAS_QUALITY),
      ];

      for (let i = 0; i < 10; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(SULFURAS_QUALITY);
      expect(items[0].sell_in).toEqual(5);

      expect(items[1].quality).toEqual(SULFURAS_QUALITY);
      expect(items[1].sell_in).toEqual(-1);
    });

    it("Aged Brie, quality never exceeds 50 (before and after the sell_in date)", function () {
      items = [new Item("Aged Brie", 5, 49)];

      for (let i = 0; i < 10; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(50);
      expect(items[0].sell_in).toEqual(-5);
    });

    it("Aged Brie, quality increases by 1 before sell_in date", function () {
      items = [new Item("Aged Brie", 10, 40)];

      for (let i = 0; i < 10; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(50);
      expect(items[0].sell_in).toEqual(0);
    });

    it("Aged Brie, quality increases by 2 after sell_in date", function () {
      items = [new Item("Aged Brie", 0, 30)];

      for (let i = 0; i < 10; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(50);
      expect(items[0].sell_in).toEqual(-10);
    });

    it("Backstage passes, quality increases by 1 until 10 days from concert", function () {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 20, 5)];

      for (let i = 0; i < 10; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(15);
      expect(items[0].sell_in).toEqual(10);
    });

    it("Backstage passes, quality increases by 2 between 10 and 5 days from concert", function () {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15)];

      for (let i = 0; i < 5; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(25);
      expect(items[0].sell_in).toEqual(5);
    });

    it("Backstage passes, quality increases by 3 between 5 and 0 days from concert", function () {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 25)];

      for (let i = 0; i < 5; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(40);
      expect(items[0].sell_in).toEqual(0);
    });

    it("Backstage passes, quality drops to zero after the concert - and stays at zero", function () {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)];

      for (let i = 0; i < 5; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(0);
      expect(items[0].sell_in).toEqual(-5);
    });

    it("Backstage passes, quality will never exceed 50 before the concert", function () {
      items = [new Item("Backstage passes to a TAFKAL80ETC concert", 20, 45)];

      for (let i = 0; i < 10; i++) {
        update_quality();
      }

      expect(items[0].quality).toEqual(50);
      expect(items[0].sell_in).toEqual(10);
    });
  });

  it("Items quality decreases by 1 before sell_in date", function () {
    items = [
      new Item("5L Water Bottle", 10, 10),
    ];

    for (let i = 0; i < 10; i++) {
      update_quality();
    }

    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(0);
  });

  it("Items quality decreases by 2 after sell_in date", function () {
    items = [
      new Item("5L Water Bottle", 0, 20),
    ];

    for (let i = 0; i < 10; i++) {
      update_quality();
    }

    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(-10);
  });

  it("Items quality never decreases below 0 (before and after sell_in date)", function () {
    items = [
      new Item("5L Water Bottle", 5, 5),
    ];

    for (let i = 0; i < 10; i++) {
      update_quality();
    }

    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(-5);
  });
});
