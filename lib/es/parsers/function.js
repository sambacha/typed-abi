import { concat, fromHex, toHex } from '../utils';
import { fixedBytes } from './fixed-bytes';
/**
 * Get the encoded function as buffer. It consists of the address (20 bytes) and function selector (4 bytes).
 *
 * @param input The function-like input.
 * @return The function as buffer.
 */

export const getFunction = input => {
  if (typeof input === 'string') {
    return fromHex(input);
  }

  return concat([fromHex(input.address), fromHex(input.selector)]);
};
export const fn = {
  isDynamic: false,

  encode({
    buffer,
    value
  }) {
    const fn = getFunction(value);
    return fixedBytes.encode({
      type: 'bytes24',
      buffer,
      value: fn
    });
  },

  decode({
    value
  }) {
    return {
      address: `0x${toHex(value.slice(0, 20))}`,
      selector: toHex(value.slice(20, 24))
    };
  }

};
//# sourceMappingURL=function.js.map