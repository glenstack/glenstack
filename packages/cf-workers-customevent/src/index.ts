interface CustomEventConstructor {
  new (name: string, args?: object): CustomEvent;
}

type x = typeof CustomEvent;

// @ts-ignore-line
let CustomEvent: CustomEventConstructor = function <T extends {}>(
  name: string,
  args?: T
) {
  const event = new Event(name);
  if (args !== undefined) {
    Object.assign(event, args);
  }
  return event;
};

export { CustomEvent };
