import { getParser, isDynamicParser, pack, unpack } from '../packer';

/*eslint require-unicode-regexp: error */
// @see {@link https://eslint.org/docs/rules/require-unicode-regexp}
const TUPLE_REGEX = /^\((.*)\)$/;
/**
 * Get elements from a tuple type.
 *
 * @param type The tuple type to get the types for.
 * @return The elements of the tuple as string array.
 */

export const getTupleElements = type => {
  return type.slice(1, -1).split(',').map(type => type.trim());
};
export const tuple = {
  /**
   * Check if the tuple is dynamic. Tuples are dynamic if one or more elements of the tuple are dynamic.
   *
   * @param type The type to check.
   * @return Whether the tuple is dynamic.
   */
  isDynamic(type) {
    const elements = getTupleElements(type);
    return elements.some(element => {
      const parser = getParser(element);
      return isDynamicParser(parser, element);
    });
  },

  /**
   * Check if a type is an tuple type.
   *
   * @param type The type to check.
   * @return Whether the type is a tuple type.
   */
  isType(type) {
    return TUPLE_REGEX.test(type);
  },

  encode({
    type,
    buffer,
    value
  }) {
    const elements = getTupleElements(type);
    return pack(elements, value, buffer);
  },

  decode({
    type,
    value,
    skip
  }) {
    const elements = getTupleElements(type);
    const length = elements.length * 32 - 32;

    if (!isDynamicParser(this, type)) {
      skip(length);
    }

    return unpack(elements, value);
  }

};
//# sourceMappingURL=tuple.js.map