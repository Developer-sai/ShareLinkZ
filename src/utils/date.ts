export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getTimeRemaining(expiryDate: string): string {
  const remaining = new Date(expiryDate).getTime() - Date.now();
  const hours = Math.max(0, Math.floor(remaining / (1000 * 60 * 60)));
  return `${hours} hours`;
}