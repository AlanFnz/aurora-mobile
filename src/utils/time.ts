function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', // "Jan"
    day: 'numeric', // "6"
    year: 'numeric', // "2023"
  }).format(date)
}

function formatTimestampToDateTime(timestamp: number): string {
  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', // "Jan"
    day: 'numeric', // "6"
    year: 'numeric', // "2023"
  }).format(date)

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', // "6"
    minute: 'numeric', // "49"
    hour12: true, // "AM/PM"
  }).format(date)

  return `${formattedDate} at ${formattedTime}`
}

export { formatTimestampToDate, formatTimestampToDateTime }
