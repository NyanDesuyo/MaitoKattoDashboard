export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false
  }
  return date.toLocaleString('id-ID', options).replace(/\./g, ':').replace(/, /g, ' ')
}
