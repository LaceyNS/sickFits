import formatMoney from '../lib/formatMoney';

describe('format Money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('CA$0.01');
    expect(formatMoney(10)).toEqual('CA$0.10');
    expect(formatMoney(9)).toEqual('CA$0.09');
    expect(formatMoney(40)).toEqual('CA$0.40');
  });

  it('leaves off cents when its whole dollars', () => {
    expect(formatMoney(5000)).toEqual('CA$50');
    expect(formatMoney(100)).toEqual('CA$1');
    expect(formatMoney(50000000)).toEqual('CA$500,000');
  });

  it('works with whole and fractional dollars', () => {
    expect(formatMoney(140)).toEqual('CA$1.40');
    expect(formatMoney(5012)).toEqual('CA$50.12');
    expect(formatMoney(110)).toEqual('CA$1.10');
    expect(formatMoney(109)).toEqual('CA$1.09');
    expect(formatMoney(345345999)).toEqual('CA$3,453,459.99');
  });
});
