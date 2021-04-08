interface IItem {
  id: string;
  name: string;
  data: string[];
}

interface ITest {
  getItemId: () => string;
  getItem: () => IItem;
}

class TestClass implements ITest {
  itemId: string;
  data: string[] | null;

  constructor(itemId: string) {
    this.itemId = itemId;
  }

  getItem() {
    return {
      id: this.itemId,
      name: "random name",
      data: this.formatItemData,
      info: this.fetchInfo,
    };
  }

  getItemId() {
    return this.itemId;
  }

  protected get fetchInfo() {
    return "fetched info";
  }

  private get formatItemData(): string[] {
    return this.data || ["asd", "asd", "asd"];
  }

  set someData(array) {
    this.data = array;
  }
}

class AnotherClass extends TestClass {
  constructor() {
    super("random id");
  }

  test() {
    return this.fetchInfo;
  }
}

class ThirdClass extends AnotherClass {
  data: string[];

  constructor(data: string[]) {
    super();

    this.data = data;
  }

  somethingTwo() {
    return "asdasd";
  }

  somethingThree() {
    return this.test();
  }

  static awaitedData(): Promise<string[]> {
    return new Promise((resolve) => setTimeout(() => resolve(["asd"]), 1500));
  }

  static async init() {
    console.log("waiting");
    const awaitedData = await this.awaitedData();
    return new this(awaitedData);
  }
}

// const testClass = new TestClass("random id");
// console.log(testClass.getItem());
// testClass.someData = ["1", "2", "3"];
// console.log(testClass.getItem());

// const anotherClass = new AnotherClass();
// console.log(anotherClass.test());

async function run() {
  const thirdClassData = await ThirdClass.init();
  console.log(thirdClassData);
  console.log("awaited, finished.");
}

run();

// (async () => {
//   const thirdClassData = await ThirdClass.init();
//   console.log(thirdClassData);
//   console.log("awaited, finished.");
// })();

export {};
