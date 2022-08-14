import { number } from './number';
/**
 * Get a number for a boolean-like value (e.g., strings).
 *
 * @param value The value to get a boolean for.
 * @return The parsed boolean value. This is 1n for truthy values, or 0n for falsy values.
 */

export const getBooleanValue = value => {
  if (value === true || typeof value === 'string' && value === 'true' || value === 'yes') {
    return 1n;
  }

  return 0n;
};
export const bool = {
  isDynamic: false,

  encode({
    buffer,
    value
  }) {
    const booleanValue = getBooleanValue(value);
    return number.encode({
      type: 'uint256',
      buffer,
      value: booleanValue
    });
  },

  decode(args) {
    return number.decode({ ...args,
      type: 'uint256'
    }) === 1n;
  }

};
//# sourceMappingURL=bool.js.map