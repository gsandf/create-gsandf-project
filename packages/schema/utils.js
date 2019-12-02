import sift from 'sift';

export function isPlainObject(obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    obj === Object(obj)
  );
}

export function filterArray(array, filters = {}) {
  return array.filter(sift(siftifyArguments(filters)));
}

export function siftifyArguments(args, level = 0) {
  const newArgs = {};

  Object.entries(args).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      newArgs[key] = siftifyArguments(value, level + 1);
    }

    if (level > 0) {
      newArgs[`$${key}`] = value;
    }
  });

  return newArgs;
}
