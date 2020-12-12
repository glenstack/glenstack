import { makeMemoizer } from "./index";

const namespace: KVNamespace = {
  get: jest.fn(),
  put: jest.fn(),
} as any;

describe("makeMemoize", () => {
  const memoize = makeMemoizer(namespace);
  const originalFunction = (name: string, age: number) => ({
    greet: `Hello, ${name}!`,
    age,
  });
  const memoizedFunction = memoize(originalFunction);
  const memoizedFunctionWithCustomKey = memoize(
    originalFunction,
    {
      keyGenerator: (name, age) => `memoizedFunction:${name}`,
    },
    { expirationTtl: 60 * 60 }
  );

  beforeEach(() => {
    (namespace.get as jest.Mock).mockReset();
    (namespace.put as jest.Mock).mockReset();
  });

  it("works with default settings", async () => {
    let result = await memoizedFunction("John", 123);
    expect(result).toEqual({ greet: "Hello, John!", age: 123 });
    expect(namespace.put).toBeCalledWith(
      "originalFunction:John,123",
      '{"greet":"Hello, John!","age":123}',
      undefined
    );
    expect(namespace.put).toHaveBeenCalledTimes(1);

    (namespace.get as jest.Mock).mockReturnValue({
      greet: "Hi, Jane!",
      age: 321,
    });
    result = await memoizedFunction("John", 123);
    expect(result).toEqual({ greet: "Hi, Jane!", age: 321 });
    expect(namespace.put).toHaveBeenCalledTimes(1);
  });

  it("works with custom keys", async () => {
    await memoizedFunctionWithCustomKey("John", 123);
    expect(namespace.put).toBeCalledWith(
      "memoizedFunction:John",
      '{"greet":"Hello, John!","age":123}',
      { expirationTtl: 3600 }
    );
  });
});
