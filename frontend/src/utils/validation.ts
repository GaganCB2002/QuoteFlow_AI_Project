export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
}

export function isValidGst(gst: string): boolean {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);
}

export function isValidPinCode(pin: string): boolean {
  return /^\d{6}$/.test(pin);
}

export function isValidIfsc(ifsc: string): boolean {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.toUpperCase());
}

export function isStrongPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) return { valid: false, message: 'Minimum 8 characters required' };
  if (!/[A-Z]/.test(password)) return { valid: false, message: 'Must contain an uppercase letter' };
  if (!/[a-z]/.test(password)) return { valid: false, message: 'Must contain a lowercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, message: 'Must contain a number' };
  return { valid: true, message: '' };
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === 'number' && isFinite(value) && value >= 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
