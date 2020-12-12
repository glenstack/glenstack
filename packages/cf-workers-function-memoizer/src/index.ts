type Key = Parameters<KVNamespace["get"]>[0];
type Value = Parameters<KVNamespace["put"]>[1];
type Type = "text" | "json" | "arrayBuffer" | "stream"; // TODO: Dynamic type
type KVOptions = Parameters<KVNamespace["put"]>[2];

interface MemoizationOptions<K extends (...args: any[]) => any> {
  keyGenerator?: (...args: Parameters<K>) => Key;
  resultTransformer?: (result: any) => Value;
  type?: Type;
}

const makeMemoizer = (namespace: KVNamespace) => <
  K extends (...args: any[]) => any
>(
  func: K,
  { keyGenerator, resultTransformer, type }: MemoizationOptions<K> = {},
  kvOptions?: KVOptions
) => {
  keyGenerator =
    keyGenerator || ((...args: any[]) => `${func.name}:${args.join(",")}`);
  resultTransformer = resultTransformer || JSON.stringify;
  type = type || "json";

  return async (...args: Parameters<K>) => {
    const key = keyGenerator(...args);
    const cachedResult = await namespace.get(key, type as any); // TODO: 'type' typing?
    if (cachedResult) return cachedResult;

    const result = await func(...args);
    await namespace.put(key, resultTransformer(result), kvOptions);
    return result;
  };
};

export { makeMemoizer };
