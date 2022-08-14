/**
 * Iterate over a buffer with the specified size. This will yield a part of the buffer starting at an increment of the
 * specified size, until the end of the buffer is reached.
 *
 * Calling the `skip` function will make it skip the specified number of bytes.
 *
 * @param buffer The buffer to iterate over.
 * @param [size] The number of bytes to iterate with.
 */
export const iterate = function* (buffer, size = 32) {
  for (let pointer = 0; pointer < buffer.length; pointer += size) {
    const skip = length => {
      if (length % size !== 0) {
        throw new Error('Length must be divisible by size');
      }

      pointer += length;
    };

    const value = buffer.subarray(pointer);
    yield {
      skip,
      value
    };
  }

  return {
    skip: () => undefined,
    value: new Uint8Array()
  };
};
//# sourceMappingURL=iterator.js.map