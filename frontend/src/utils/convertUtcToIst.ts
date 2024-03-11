function convertUtcToIst(dateString: string): string {
  const utcDate = new Date(dateString);
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset is 5 hours and 30 minutes

  const istDate = new Date(utcDate.getTime() + istOffset);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  return istDate.toLocaleString('en-IN', options);
}

export default convertUtcToIst;
