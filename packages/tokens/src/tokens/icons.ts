/**
 * MSQDX Icon Tokens
 *
 * Basis: Material Symbols (Variable Font, Outlined) via react-material-symbols.
 * Unterstützt variable Weights (100–700), Fill, Grade und optische Größe.
 *
 * Standard-Weight: thin (100), für einheitlich leichte Icons.
 */

// Commonly used Material Icons (Outlined variant)
// These are the icons most frequently used in the design system
export const MSQDX_ICON_NAMES = {
  // Actions
  add: 'AddOutlined',
  delete: 'DeleteOutlined',
  edit: 'EditOutlined',
  save: 'SaveOutlined',
  cancel: 'CancelOutlined',
  close: 'CloseOutlined',
  check: 'CheckOutlined',
  checkCircle: 'CheckCircleOutlined',
  remove: 'RemoveOutlined',
  clear: 'ClearOutlined',
  
  // Navigation
  arrowBack: 'ArrowBackOutlined',
  arrowForward: 'ArrowForwardOutlined',
  arrowUp: 'ArrowUpwardOutlined',
  arrowDown: 'ArrowDownwardOutlined',
  menu: 'MenuOutlined',
  home: 'HomeOutlined',
  settings: 'SettingsOutlined',
  dashboard: 'DashboardOutlined',
  
  // Files & Media
  download: 'DownloadOutlined',
  upload: 'UploadOutlined',
  file: 'FilePresentOutlined',
  folder: 'FolderOutlined',
  image: 'ImageOutlined',
  
  // Communication
  email: 'EmailOutlined',
  send: 'SendOutlined',
  message: 'MessageOutlined',
  notification: 'NotificationsOutlined',
  
  // User & Account
  person: 'PersonOutlined',
  account: 'AccountCircleOutlined',
  login: 'LoginOutlined',
  logout: 'LogoutOutlined',
  
  // Status
  info: 'InfoOutlined',
  warning: 'WarningOutlined',
  error: 'ErrorOutlined',
  success: 'CheckCircleOutlined',
  
  // Shopping & Commerce
  shoppingCart: 'ShoppingCartOutlined',
  payment: 'PaymentOutlined',
  creditCard: 'CreditCardOutlined',
  
  // Search & Filter
  search: 'SearchOutlined',
  filter: 'FilterListOutlined',
  sort: 'SortOutlined',
  
  // Other
  lock: 'LockOutlined',
  visibility: 'VisibilityOutlined',
  visibilityOff: 'VisibilityOffOutlined',
  refresh: 'RefreshOutlined',
  more: 'MoreVertOutlined',
  share: 'ShareOutlined',
} as const;

export const MSQDX_ICONS = {
  // Icon sizes (matching button icon sizes)
  sizes: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Material Symbols variable font weight (100–700)
  // Maps token names to font-weight axis
  weight: {
    thin: 100,
    light: 200,
    regular: 300,
    medium: 400,
    bold: 500,
  },

  // Legacy: stroke width (kept for compatibility; prefer weight for Material Symbols)
  strokeWidth: {
    thin: 1,
    light: 1.5,
    regular: 2,
    medium: 2.5,
    bold: 3,
  },

  // Default weight (thin for light appearance)
  defaultWeight: 'thin' as const,
  
  // Default size for buttons
  button: {
    small: 14,  // Matches button small icon size
    medium: 18, // Matches button medium icon size
    large: 22,  // Matches button large icon size
  },
} as const;

