import { parseRates } from '../parseRates';

describe('parseRates', () => {
  it('returns empty array if no header line', () => {
    const data = 'foo\nbar\nbaz';
    expect(parseRates(data)).toEqual([]);
  });

  it('parses rates table correctly', () => {
    const data = [
      'Some header',
      'Country|Currency|Amount|Code|Rate',
      'USA|Dollar|1|USD|22.123',
      'Eurozone|Euro|1|EUR|24.456',
      'UK|Pound|1|GBP|28.789',
    ].join('\n');
    const result = parseRates(data);
    expect(result).toEqual([
      {
        Country: 'USA',
        Currency: 'Dollar',
        Amount: '1',
        Code: 'USD',
        Rate: '22.123',
      },
      {
        Country: 'Eurozone',
        Currency: 'Euro',
        Amount: '1',
        Code: 'EUR',
        Rate: '24.456',
      },
      {
        Country: 'UK',
        Currency: 'Pound',
        Amount: '1',
        Code: 'GBP',
        Rate: '28.789',
      },
    ]);
  });

  it('handles extra lines and empty lines', () => {
    const data = [
      '',
      'Country|Currency|Amount|Code|Rate',
      '',
      'USA|Dollar|1|USD|22.123',
      '',
      'Eurozone|Euro|1|EUR|24.456',
      '',
    ].join('\n');
    const result = parseRates(data);
    expect(result).toEqual([
      {
        Country: 'USA',
        Currency: 'Dollar',
        Amount: '1',
        Code: 'USD',
        Rate: '22.123',
      },
      {
        Country: 'Eurozone',
        Currency: 'Euro',
        Amount: '1',
        Code: 'EUR',
        Rate: '24.456',
      },
    ]);
  });

  it('handles missing values gracefully', () => {
    const data = [
      'Country|Currency|Amount|Code|Rate',
      'USA|Dollar|1|USD', // missing Rate
    ].join('\n');
    const result = parseRates(data);
    expect(result[0].Rate).toBeUndefined();
  });
});
