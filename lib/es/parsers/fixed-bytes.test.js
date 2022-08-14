import { fromHex, toHex } from '../utils';
import { fixedBytes, getByteLength } from './fixed-bytes';
describe('getByteLength', () => {
  it('returns the byte length for a type', () => {
    expect(getByteLength('bytes32')).toBe(32);
    expect(getByteLength('bytes16')).toBe(16);
    expect(getByteLength('bytes1')).toBe(1);
  });
  it('throws an error if the length is invalid', () => {
    expect(() => getByteLength('bytes64')).toThrow();
    expect(() => getByteLength('bytes0')).toThrow();
    expect(() => getByteLength('bytes')).toThrow();
  });
});
describe('fixed-bytes', () => {
  describe('isType', () => {
    it('checks if a type is a fixed bytes type', () => {
      var _fixedBytes$isType, _fixedBytes$isType2, _fixedBytes$isType3, _fixedBytes$isType4, _fixedBytes$isType5, _fixedBytes$isType6;

      expect((_fixedBytes$isType = fixedBytes.isType) === null || _fixedBytes$isType === void 0 ? void 0 : _fixedBytes$isType.call(fixedBytes, 'bytes32')).toBe(true);
      expect((_fixedBytes$isType2 = fixedBytes.isType) === null || _fixedBytes$isType2 === void 0 ? void 0 : _fixedBytes$isType2.call(fixedBytes, 'bytes16')).toBe(true);
      expect((_fixedBytes$isType3 = fixedBytes.isType) === null || _fixedBytes$isType3 === void 0 ? void 0 : _fixedBytes$isType3.call(fixedBytes, 'bytes1')).toBe(true);
      expect((_fixedBytes$isType4 = fixedBytes.isType) === null || _fixedBytes$isType4 === void 0 ? void 0 : _fixedBytes$isType4.call(fixedBytes, 'bytes')).toBe(false);
      expect((_fixedBytes$isType5 = fixedBytes.isType) === null || _fixedBytes$isType5 === void 0 ? void 0 : _fixedBytes$isType5.call(fixedBytes, 'bytes32[]')).toBe(false);
      expect((_fixedBytes$isType6 = fixedBytes.isType) === null || _fixedBytes$isType6 === void 0 ? void 0 : _fixedBytes$isType6.call(fixedBytes, '(bytes32)')).toBe(false);
    });
  });
  describe('encode', () => {
    it('encodes fixed bytes', () => {
      expect(toHex(fixedBytes.encode({
        type: 'bytes32',
        value: 'abcdef1234567890000000000000000000000000000000000000000000000000',
        buffer: new Uint8Array()
      }))).toBe('abcdef1234567890000000000000000000000000000000000000000000000000');
    });
    it('throws if the length is invalid', () => {
      expect(() => fixedBytes.encode({
        type: 'bytes32',
        value: 'abcdef123456789',
        buffer: new Uint8Array()
      })).toThrow();
    });
  });
  describe('decode', () => {
    it('decodes encoded fixed bytes', () => {
      const value = fromHex('abcdef1234567890000000000000000000000000000000000000000000000000');
      expect(toHex(fixedBytes.decode({
        type: 'bytes32',
        value,
        skip: jest.fn()
      }))).toBe('abcdef1234567890000000000000000000000000000000000000000000000000');
    });
  });
});
//# sourceMappingURL=fixed-bytes.test.js.map