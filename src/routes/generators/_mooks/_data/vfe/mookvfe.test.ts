// import { describe, test, expect } from "bun:test";
// import { proficiencyBonusByCr, xpByCr } from "./cr";

// describe("CR Proficiency Function", () => {
//   test("CR 0 => 2", () => {
//     expect(proficiencyBonusByCr(0)).toBe(2);
//   });
//   test("CR 4 => 2", () => {
//     expect(proficiencyBonusByCr(4)).toBe(2);
//   });
//   test("CR 8 => 3", () => {
//     expect(proficiencyBonusByCr(8)).toBe(3);
//   });
//   test("CR 16 => 5", () => {
//     expect(proficiencyBonusByCr(16)).toBe(5);
//   });
// });

// describe("CR XP Function", () => {
//   test("CR Logs", () => {
//     let counter = 2;
//     while (counter <= 4) {
//       console.log({ counter, result: xpByCr(counter) });
//       counter++;
//     }
//   });
//   test("CR 2 = 450", () => {
//     expect(xpByCr(2)).toBe(450);
//   });
//   test("CR 3 = 700", () => {
//     expect(xpByCr(3)).toBe(700);
//   });
//   test("CR 4 = 1100", () => {
//     expect(xpByCr(4)).toBe(1100);
//   });
// });
