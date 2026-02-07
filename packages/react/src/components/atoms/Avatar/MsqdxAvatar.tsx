"use client";

import { Avatar, styled } from '@mui/material';
import type { AvatarProps } from '@mui/material';
import { MSQDX_AVATAR, MSQDX_EFFECTS, getAvatarSize } from '@msqdx/tokens';
import { reducedMotionStyles } from '../../../utils/atomA11y';
import { MsqdxIcon } from '../Icon/MsqdxIcon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green';

export interface MsqdxAvatarProps extends Omit<AvatarProps, 'variant' | 'sizes'> {
  /**
   * Avatar size
   * @default 'md'
   */
  size?: AvatarSize;
  
  /**
   * Avatar shape variant
   * @default 'circle'
   */
  variant?: AvatarVariant;
  
  /**
   * Image source URL
   */
  src?: string;
  
  /**
   * Alt text for image
   */
  alt?: string;
  
  /**
   * Fallback text (initials or name)
   * If provided, will be displayed when image fails to load
   */
  fallback?: string;
  
  /**
   * Fallback icon name (Material Icon)
   * If provided, will be displayed when image fails to load and no fallback text
   */
  fallbackIcon?: string;
  
  /**
   * Brand color for fallback background
   * Used when no image is provided
   */
  brandColor?: BrandColor;
  
  /**
   * Show border
   * @default false
   */
  bordered?: boolean;
  
  /**
   * Shadow variant
   * @default 'none'
   */
  shadow?: 'none' | 'sm' | 'md';
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => 
    prop !== 'avatarSize' &&
    prop !== 'avatarVariant' &&
    prop !== 'bordered' &&
    prop !== 'avatarShadow' &&
    prop !== 'brandColor',
})<{
  avatarSize: ReturnType<typeof getAvatarSize>;
  avatarVariant: AvatarVariant;
  bordered: boolean;
  avatarShadow: 'none' | 'sm' | 'md';
  brandColor?: BrandColor;
}>(({ theme, avatarSize, avatarVariant, bordered, avatarShadow, brandColor }) => {
  const borderRadius = avatarVariant === 'circle'
    ? MSQDX_AVATAR.borderRadius.circle
    : avatarVariant === 'rounded'
      ? MSQDX_AVATAR.borderRadius.rounded
      : MSQDX_AVATAR.borderRadius.square;
  
  const fallbackBg = brandColor
    ? MSQDX_AVATAR.fallbackBackground[brandColor]
    : MSQDX_AVATAR.fallbackBackground.default;

  return {
    width: avatarSize.width,
    height: avatarSize.height,
    borderRadius,
    fontSize: avatarSize.fontSize,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: fallbackBg,
    color: theme.palette.text.primary,
    border: bordered
      ? `${MSQDX_AVATAR.border.width}px ${MSQDX_AVATAR.border.style} ${MSQDX_AVATAR.border.color}`
      : 'none',
    boxShadow: MSQDX_AVATAR.shadow[avatarShadow],
    transition: MSQDX_AVATAR.transition,
    ...reducedMotionStyles,
    '& .MuiAvatar-img': {
      borderRadius,
    },
    '&:hover': {
      boxShadow: avatarShadow !== 'none' ? MSQDX_EFFECTS.shadows.md : 'none',
    },
  };
});

/**
 * MsqdxAvatar
 *
 * Avatar component for user profiles, with support for images, initials, and icons.
 *
 * Features:
 * - Multiple sizes: xs, sm, md, lg, xl, xxl
 * - Shape variants: circle, rounded, square
 * - Fallback support: initials or icon
 * - Brand color backgrounds
 * - Border and shadow options
 *
 * @example
 * ```tsx
 * // With image
 * <MsqdxAvatar src="/user.jpg" alt="User" size="md" />
 *
 * // With initials
 * <MsqdxAvatar fallback="JD" size="lg" brandColor="purple" />
 *
 * // With icon
 * <MsqdxAvatar fallbackIcon="Account" size="md" variant="rounded" />
 * ```
 */
export const MsqdxAvatar = ({
  size = 'md',
  variant = 'circle',
  src,
  alt,
  fallback,
  fallbackIcon,
  brandColor,
  bordered = false,
  shadow = 'none',
  sx,
  ...props
}: MsqdxAvatarProps) => {
  const avatarSize = getAvatarSize(size);
  
  // Determine what to show
  let children: React.ReactNode = null;
  if (fallback) {
    // Show initials (first 2 characters, uppercase)
    const initials = fallback
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    children = initials;
  } else if (fallbackIcon) {
    // Show icon
    children = <MsqdxIcon name={fallbackIcon} customSize={avatarSize.iconSize} weight="regular" />;
  }

  return (
    <StyledAvatar
      avatarSize={avatarSize}
      avatarVariant={variant}
      bordered={bordered}
      avatarShadow={shadow}
      brandColor={brandColor}
      src={src}
      alt={alt}
      sx={sx}
      {...props}
    >
      {children}
    </StyledAvatar>
  );
};
