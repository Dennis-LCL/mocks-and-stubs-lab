const generateQueue = require("../src/queueService");
const math = require("mathjs");

math.randomInt = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

it("can generate array with length of a random integer", () => {
  math.randomInt.mockImplementation(() => 1);
  expect(generateQueue().length).toBe(1);

  math.randomInt.mockImplementation(() => 3);
  expect(generateQueue().length).toBe(3);

  math.randomInt.mockImplementation(() => 10);
  expect(generateQueue().length).toBe(10);
});

it("can generate array of all positive numbers", () => {
  math.randomInt.mockImplementation(() => 3);
  expect(generateQueue()).toEqual([3, 3, 3]);
});

it("can generate array of negative numbers", () => {
  math.randomInt.mockImplementationOnce(() => 3);
  math.randomInt.mockImplementation(() => -3);
  expect(generateQueue()).toEqual([-3, -3, -3]);
});

it.only("can generate array of mixed positive & negative numbers", () => {
  math.randomInt.mockImplementationOnce(() => 3);
  math.randomInt.mockImplementationOnce(() => -3);
  math.randomInt.mockImplementation(() => 3);
  // math.randomInt.mockImplementationOnce(() => 3);
  expect(generateQueue()).toEqual([-3, 3, 3]);
});
