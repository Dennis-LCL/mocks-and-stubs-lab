const processPayments = require("../src/main");
const generateQueue = require("../src/queueService");
const { makePayment, refundPayment } = require("../src/paymentService");

jest.mock("../src/queueService");
jest.mock("../src/paymentService");

beforeEach(() => {
  jest.resetAllMocks();
});

it("does not call makePayment or refundPayment when paymentQueue is empty", () => {
  generateQueue.mockReturnValue([]);
  processPayments();
  expect(generateQueue).toBeCalledTimes(1);
  expect(makePayment).toBeCalledTimes(0);
  expect(refundPayment).toBeCalledTimes(0);
});

it("calls makePayment when next item in paymentQueue is 0", () => {
  generateQueue.mockReturnValue([0]);
  processPayments();
  expect(generateQueue).toBeCalledTimes(1);
  expect(makePayment).toBeCalledTimes(1);
  expect(refundPayment).toBeCalledTimes(0);
});

it("calls makePayment when next item in paymentQueue is positive", () => {
  generateQueue.mockReturnValue([10]);
  processPayments();
  expect(generateQueue).toBeCalledTimes(1);
  expect(makePayment).toBeCalledTimes(1);
  expect(refundPayment).toBeCalledTimes(0);
});

it("calls refundPayment when next item in paymentQueue is negative", () => {
  generateQueue.mockReturnValue([-10]);
  processPayments();
  expect(generateQueue).toBeCalledTimes(1);
  expect(makePayment).toBeCalledTimes(0);
  expect(refundPayment).toBeCalledTimes(1);
});
