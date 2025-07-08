export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

export function formatTanggal(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

export function getStatusColor(status) {
  const colors = {
    'diproses': '#FFA500',
    'dikirim': '#0000FF',
    'selesai': '#008000',
    'dibatalkan': '#FF0000'
  }
  return colors[status] || '#000000'
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone) {
  const re = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
  return re.test(phone)
}