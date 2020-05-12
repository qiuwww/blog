// 把验证规则集中到一起
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  export type stringOrNumber = string | number;
  export enum Breakpoint {
    "xxl",
    "xl",
    "lg",
    "md",
    "sm",
    "xs"
  }
  export interface Person {
    name: string;
    age: number;
    location: string;
  }
  export class Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
  export class Snake extends Animal {
    constructor(name: string) {
      super(name);
    }
    move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
    }
  }

  export type K1 = keyof Person; // "name" | "age" | "location"

  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  // 函数输入输出整体定义
  export type StringCapitalizeEveryWord = (str: string) => string;
}
