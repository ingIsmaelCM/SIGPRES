export default abstract class Middleware {
  constructor() {
    const prototype = Object.getPrototypeOf(this);
    const methodNames = Object.getOwnPropertyNames(prototype);

    for (const methodName of methodNames) {
      const method = (this as any)[methodName];
      if (methodName !== "constructor" && typeof method === "function") {
        (this as any)[methodName] = method.bind(this) as typeof method;
      }
    }
  }
}
