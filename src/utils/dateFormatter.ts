export function formatDate(dateString: string) {
  const [month, day, year] = dateString.split('/').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
