export function parseRates(data: string) {
  // The rates are in a text format, skip header lines and parse the table
  const lines = data.split('\n').filter(Boolean);
  const startIdx = lines.findIndex((line) => line.startsWith('Country|'));
  if (startIdx === -1) {
    return [];
  }

  const headers = lines[startIdx].split('|');

  return lines.slice(startIdx + 1).map((line) => {
    const values = line.split('|');
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i]));
    return obj;
  });
}
