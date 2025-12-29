/**
 * Validation patterns and helper functions
 */

// Email regex: Standard format (user@domain.com)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
// Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:,.<>?]{8,}$/;

/**
 * Validates email format
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

/**
 * Validates password complexity
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
};

/**
 * Returns password policy description
 * @returns {string}
 */
export const getPasswordPolicyMessage = () => {
    return "Şifre en az 8 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter (!@#$%^&*) içermelidir.";
};
