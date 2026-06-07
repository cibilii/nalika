/**
 * تولید شماره پیگیری یکتا
 * فرمت: LX-YYYYMMDD-XXX
 */
export function generateTrackingNumber() {
  const prefix = "LX";
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${datePart}-${random}`;
}