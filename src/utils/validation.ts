export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateBoardName(name: string): string | null {
  if (!name.trim()) {
    return 'Board name is required';
  }
  if (name.length > 100) {
    return 'Board name must be less than 100 characters';
  }
  return null;
}