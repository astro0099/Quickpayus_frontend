export const formatDate = (date: Date): string => {
  const options : Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};
