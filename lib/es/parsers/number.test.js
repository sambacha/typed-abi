import { fromHex, toHex } from '../utils';
import { asNumber, isSigned, number } from './number';
describe('isSigned', () => {
  it('checks if a number type is signed', () => {
    expect(isSigned('int')).toBe(true);
    expect(isSigned('int256')).toBe(true);
    expect(isSigned('int123')).toBe(true);
    expect(isSigned('uint')).toBe(false);
    expect(isSigned('uint256')).toBe(false);
    expect(isSigned('uint123')).toBe(false);
  });
});
describe('asNumber', () => {
  it('returns a bigint for a number-like input', () => {
    expect(asNumber(123)).toBe(123n);
    expect(asNumber('123')).toBe(123n);
    expect(asNumber('0x123')).toBe(291n);
  });
});
describe('number', () => {
  describe('isType', () => {
    it('checks if a type is a number type', () => {
      var _number$isType, _number$isType2, _number$isType3, _number$isType4, _number$isType5, _number$isType6, _number$isType7, _number$isType8, _number$isType9;

      expect((_number$isType = number.isType) === null || _number$isType === void 0 ? void 0 : _number$isType.call(number, 'uint256')).toBe(true);
      expect((_number$isType2 = number.isType) === null || _number$isType2 === void 0 ? void 0 : _number$isType2.call(number, 'uint128')).toBe(true);
      expect((_number$isType3 = number.isType) === null || _number$isType3 === void 0 ? void 0 : _number$isType3.call(number, 'uint')).toBe(true);
      expect((_number$isType4 = number.isType) === null || _number$isType4 === void 0 ? void 0 : _number$isType4.call(number, 'int256')).toBe(true);
      expect((_number$isType5 = number.isType) === null || _number$isType5 === void 0 ? void 0 : _number$isType5.call(number, 'int128')).toBe(true);
      expect((_number$isType6 = number.isType) === null || _number$isType6 === void 0 ? void 0 : _number$isType6.call(number, 'int')).toBe(true);
      expect((_number$isType7 = number.isType) === null || _number$isType7 === void 0 ? void 0 : _number$isType7.call(number, 'string')).toBe(false);
      expect((_number$isType8 = number.isType) === null || _number$isType8 === void 0 ? void 0 : _number$isType8.call(number, '(uint256)')).toBe(false);
      expect((_number$isType9 = number.isType) === null || _number$isType9 === void 0 ? void 0 : _number$isType9.call(number, 'uint256[]')).toBe(false);
    });
  });
  describe('encode', () => {
    it('encodes a unsigned number', () => {
      expect(toHex(number.encode({
        type: 'uint256',
        value: 314159n,
        buffer: new Uint8Array()
      }))).toBe('000000000000000000000000000000000000000000000000000000000004cb2f');
      expect(toHex(number.encode({
        type: 'uint256',
        value: 314159,
        buffer: new Uint8Array()
      }))).toBe('000000000000000000000000000000000000000000000000000000000004cb2f');
      expect(toHex(number.encode({
        type: 'uint256',
        value: '314159',
        buffer: new Uint8Array()
      }))).toBe('000000000000000000000000000000000000000000000000000000000004cb2f');
      expect(toHex(number.encode({
        type: 'uint256',
        value: '0x314159',
        buffer: new Uint8Array()
      }))).toBe('0000000000000000000000000000000000000000000000000000000000314159');
    });
    it('encodes a signed number', () => {
      expect(toHex(number.encode({
        type: 'int256',
        value: -314159n,
        buffer: new Uint8Array()
      }))).toBe('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb34d1');
      expect(toHex(number.encode({
        type: 'int256',
        value: -314159,
        buffer: new Uint8Array()
      }))).toBe('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb34d1');
      expect(toHex(number.encode({
        type: 'int256',
        value: '-314159',
        buffer: new Uint8Array()
      }))).toBe('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb34d1');
    });
  });
  describe('decode', () => {
    it('decodes an encoded unsigned number', () => {
      const value = fromHex('000000000000000000000000000000000000000000000000000000000004cb2f');
      expect(number.decode({
        type: 'uint256',
        value,
        skip: jest.fn()
      })).toBe(314159n);
    });
    it('decodes an encoded signed number', () => {
      const value = fromHex('000000000000000000000000000000000000000000000000000000000004cb2f');
      expect(number.decode({
        type: 'int256',
        value,
        skip: jest.fn()
      })).toBe(314159n);
      const negativeValue = fromHex('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffb34d1');
      expect(number.decode({
        type: 'int256',
        value: negativeValue,
        skip: jest.fn()
      })).toBe(-314159n);
    });
  });
});
//# sourceMappingURL=number.test.js.map