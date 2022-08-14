import { pack, unpack } from './packer';

/**
 * Encode the data with the provided types.
 *
 * @param types The types to encode.
 * @param values The values to encode. This array must have the same length as the types array.
 * @return The ABI encoded buffer.
 */
export const encode = (types, values) => {
  return pack(types, values, new Uint8Array());
};
/**
 * Decode an ABI encoded buffer with the specified types.
 *
 * @param types The types to decode the buffer with.
 * @param buffer The buffer to decode.
 * @return The decoded values as array.
 */

export const decode = (types, buffer) => {
  return unpack(types, buffer);
};
//# sourceMappingURL=abi.js.map