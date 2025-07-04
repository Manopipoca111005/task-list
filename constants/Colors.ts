/**
 * Cores usadas no aplicativo de Lista de Tarefas com Perfil de Usuário.
 * Definidas para os modos claro e escuro.
 */

const primaryLight = '#6366f1'; // Indigo-500
const primaryDark = '#818cf8'; // Indigo-400

export const Colors = {
  light: {
    primary: primaryLight,
    primaryDark: '#4f46e5', // Indigo-600
    primaryLight: '#a5b4fc', // Indigo-300
    secondary: '#f97316', // Orange-500
    background: '#ffffff',
    card: '#f9fafb', // Gray-50
    text: '#1f2937', // Gray-800
    textSecondary: '#6b7280', // Gray-500
    border: '#e5e7eb', // Gray-200
    notification: '#ef4444', // Red-500
    success: '#10b981', // Emerald-500
    error: '#ef4444', // Red-500
    warning: '#f59e0b', // Amber-500
    info: '#3b82f6', // Blue-500
    tabIconDefault: '#9ca3af', // Gray-400
    tabIconSelected: primaryLight,
    inputBackground: '#f3f4f6', // Gray-100
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    skeleton: '#e5e7eb', // Gray-200
  },
  dark: {
    primary: primaryDark,
    primaryDark: '#6366f1', // Indigo-500
    primaryLight: '#c7d2fe', // Indigo-200
    secondary: '#fb923c', // Orange-400
    background: '#111827', // Gray-900
    card: '#1f2937', // Gray-800
    text: '#f9fafb', // Gray-50
    textSecondary: '#9ca3af', // Gray-400
    border: '#374151', // Gray-700
    notification: '#f87171', // Red-400
    success: '#34d399', // Emerald-400
    error: '#f87171', // Red-400
    warning: '#fbbf24', // Amber-400
    info: '#60a5fa', // Blue-400
    tabIconDefault: '#6b7280', // Gray-500
    tabIconSelected: primaryDark,
    inputBackground: '#374151', // Gray-700
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    skeleton: '#374151', // Gray-700
  },
};
