import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string when value is null or undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return the original string if its length is less than or equal to the limit', () => {
    expect(pipe.transform('short text', 20)).toBe('short text');
    expect(pipe.transform('12345678901234567890', 20)).toBe('12345678901234567890'); // equal to limit case
  });

  it('should truncate the string and add "..." if its length exceeds the limit', () => {
    const value = 'This is a very long string that should be truncated';
    expect(pipe.transform(value, 10)).toBe('This is a ...');
    expect(pipe.transform(value, 20)).toBe('This is a very long ...');
  });

  it('should use the default limit of 20 when no limit is specified', () => {
    const value = 'This is a very long string that should be truncated';
    expect(pipe.transform(value)).toBe('This is a very long ...');
  });
});
