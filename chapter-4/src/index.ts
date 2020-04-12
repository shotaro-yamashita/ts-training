/*
 * issue: 3
 */
type Reservation = {
  from: Date;
  to?: Date;
  destination: string;
} | null;

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination?: string): Reservation;
  (destination: string): Reservation;
};

const reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string,
) => {
  // 即時の渡航
  if (typeof (fromOrDestination) === 'string') {
    return {
      from: new Date(),
      to: new Date(),
      destination: fromOrDestination,
    };
  }
  // 日帰り旅行
  if (fromOrDestination instanceof Date && typeof (toOrDestination) === 'string') {
    return {
      from: fromOrDestination,
      to: fromOrDestination,
      destination: toOrDestination,
    };
  }
  // 通常の旅行
  if (
    fromOrDestination instanceof Date
      && toOrDestination instanceof Date
      && destination !== undefined
  ) {
    return {
      from: fromOrDestination,
      to: toOrDestination,
      destination,
    };
  }

  return null;
};

console.log(reserve('tokyo')); // 即時の渡航
console.log(reserve(new Date('2020-05-01'), 'tokyo')); // 日帰り旅行
console.log(reserve(new Date('2020-06-01'), new Date('2020-06-14'), 'tokyo')); // 通常の旅行


/*
 * issue: 4
 */
const call = <T extends [unknown, string, ...unknown[]], U>(
  f: (...args: T) => U,
  ...args: T
): U => f(...args);

console.log(call((...args) => args.reduce((a, b) => `${a},${b}`), 'a', 'b', 'c', 'd'));


/*
 * issue: 5.1
 */
const is = <T>(a: T, b: T): boolean => a === b;
console.log(is('a', 'a'));
console.log(is(1, 1));

const isMultiple = <T>(a: T, ...b: [T, ...T[]]): boolean => b.every((_) => _ === a);
console.log(isMultiple(1, 2, 3));
console.log(isMultiple(1, 1, 1));
