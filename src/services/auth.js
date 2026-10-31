/**
 * Servicio de Autenticación y Blindaje Soberano
 * Protege el acceso al Dashboard de Analítica Práxica y al Módulo de Configuración
 * Investigación: Ing. Edery Javier Rodríguez Alvarado (UBV)
 */

const AUTH_STORAGE_KEY = 'praxis_auth_unlocked';

/**
 * Obtiene la contraseña configurada en la variable de entorno
 * Por defecto: 'Praxis_Marx_2026'
 */
export const getExpectedPassword = () => {
  return (import.meta.env.VITE_DASHBOARD_PASSWORD || 'Praxis_Marx_2026').trim();
};

/**
 * Comprueba si la sesión actual se encuentra desbloqueada
 */
export const isUnlocked = () => {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
};

/**
 * Valida la contraseña ingresada contra la variable de entorno
 */
export const verifyPassword = (password) => {
  if (!password) return false;
  const expected = getExpectedPassword();
  return password.trim() === expected;
};

/**
 * Intenta desbloquear la sesión con la contraseña provista
 * @returns {boolean} true si fue exitoso, false en caso contrario
 */
export const unlockSession = (password) => {
  if (verifyPassword(password)) {
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('No se pudo guardar estado en sessionStorage:', e);
    }
    return true;
  }
  return false;
};

/**
 * Bloquea la sesión eliminando el token de desbloqueo
 */
export const lockSession = () => {
  try {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.warn('Error al bloquear sesión:', e);
  }
};
