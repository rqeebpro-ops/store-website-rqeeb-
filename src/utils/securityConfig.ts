/**
 * Raqeeb Security & App Activation Configuration
 * 
 * Master Owner Secret PIN:
 * - 2029 (Primary Secret PIN known only to the Owner)
 * - 7855 (Secondary Backup PIN matching owner phone prefix)
 */

export const MASTER_OWNER_PIN = '2029';
export const BACKUP_OWNER_PIN = '7855';

export const VALID_ACTIVATION_PINS: string[] = [
  MASTER_OWNER_PIN,
  BACKUP_OWNER_PIN
];

const LOCAL_STORAGE_KEY = 'raqeeb_app_activated_v2';

export const checkIsAppUnlocked = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setAppUnlockedStatus = (unlocked: boolean): void => {
  if (typeof window === 'undefined') return;
  try {
    if (unlocked) {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
};

export const verifyPinCode = (enteredPin: string): boolean => {
  const clean = enteredPin.trim();
  return VALID_ACTIVATION_PINS.includes(clean);
};
