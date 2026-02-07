"use client";

import { Box, Select, MenuItem, Typography, styled, alpha, InputLabel, FormControl, FormHelperText } from "@mui/material";
import type { SelectProps } from "@mui/material";
import { MSQDX_COLORS, MSQDX_SPACING, MSQDX_TYPOGRAPHY, MSQDX_INPUT, MSQDX_EFFECTS, MSQDX_SCROLLBAR, getScrollbarColor } from "@msqdx/tokens";
import { MsqdxIcon } from "../../atoms/Icon/MsqdxIcon";

export type BrandColor = 'purple' | 'yellow' | 'pink' | 'orange' | 'green' | 'black';
export type SelectSize = 'small' | 'medium' | 'large';

export interface MsqdxSelectProps extends Omit<SelectProps, 'children'> {
  label: string;
  options: {
    value: string | number;
    label: string;
  }[];
  /** Visual size (padding, font). @default 'small' */
  size?: SelectSize;
  helperText?: string;
  errorText?: string;
  success?: boolean;
  required?: boolean;
  labelColor?: BrandColor;
  borderColor?: BrandColor;
}

const StyledFormControl = styled(FormControl)(() => ({
  gap: MSQDX_INPUT.label.gap,
  minWidth: 120,
}));

const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'success' && prop !== 'borderColor' && prop !== 'selectSize',
})<{ error?: boolean; success?: boolean; disabled?: boolean; borderColor?: BrandColor; selectSize?: SelectSize }>(({ error, success, disabled, borderColor, selectSize = 'small' }) => {
  const sizeConfig = MSQDX_INPUT.size[selectSize];
  const getBrandColor = (color?: BrandColor) => {
    if (!color) return undefined;
    if (color === 'black') return MSQDX_COLORS.brand.black;
    return MSQDX_COLORS.brand[color];
  };

  const getBorderColor = () => {
    if (disabled) return MSQDX_INPUT.border.disabled;
    if (error) return MSQDX_INPUT.border.error;
    if (success) return MSQDX_INPUT.border.success;
    if (borderColor) {
      const brandColor = getBrandColor(borderColor);
      if (brandColor) return brandColor;
    }
    return MSQDX_INPUT.border.default;
  };

  const defaultBorderColor = getBorderColor();

  const paddingH = typeof sizeConfig.padding.horizontal === 'number' ? sizeConfig.padding.horizontal : 12;
  const paddingV = typeof sizeConfig.padding.vertical === 'number' ? sizeConfig.padding.vertical : 8;

  return {
    borderRadius: MSQDX_INPUT.borderRadius,
    height: sizeConfig.height,
    minHeight: sizeConfig.height,
    maxHeight: sizeConfig.height,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: disabled ? MSQDX_INPUT.background.disabled : MSQDX_INPUT.background.default,
    backdropFilter: MSQDX_INPUT.backdropFilter,
    WebkitBackdropFilter: MSQDX_INPUT.backdropFilter,
    transition: `border-color ${MSQDX_INPUT.transition}, background-color ${MSQDX_INPUT.transition}, box-shadow ${MSQDX_INPUT.transition}`,
    border: `${MSQDX_EFFECTS.borderWidth.thin}px solid ${defaultBorderColor}`,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-select': {
      padding: `${paddingV}px ${paddingH}px`,
      fontSize: sizeConfig.fontSize,
      fontFamily: MSQDX_INPUT.fontFamily,
      fontWeight: MSQDX_INPUT.fontWeight.input,
      height: sizeConfig.height,
      minHeight: sizeConfig.height,
      boxSizing: 'border-box',
    },
    '&:hover': {
      backgroundColor: disabled ? MSQDX_INPUT.background.disabled : MSQDX_INPUT.background.hover,
      borderColor: disabled ? MSQDX_INPUT.border.disabled : (borderColor ? getBrandColor(borderColor) : MSQDX_INPUT.border.hover),
    },
    '&.Mui-focused': {
      backgroundColor: MSQDX_INPUT.background.focused,
      borderColor: getBorderColor(),
      borderBottomColor: 'transparent',
      boxShadow: error ? MSQDX_INPUT.focusRing.error : success ? MSQDX_INPUT.focusRing.success : MSQDX_INPUT.focusRing.default,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    ...(error && {
      borderColor: MSQDX_INPUT.border.error,
      '&.Mui-focused': {
        boxShadow: MSQDX_INPUT.focusRing.error,
      },
    }),
    ...(success && {
      borderColor: MSQDX_INPUT.border.success,
      '&.Mui-focused': {
        boxShadow: MSQDX_INPUT.focusRing.success,
      },
    }),
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
    '& .MuiSelect-icon': {
      display: 'none',
    },
  };
});

/**
 * MsqdxSelect
 *
 * Styled select component matching the glassmorphism design system.
 */
export const MsqdxSelect = ({
  label,
  options,
  helperText,
  errorText,
  success,
  required,
  id,
  fullWidth,
  size = 'small',
  error,
  labelColor,
  borderColor,
  ...props
}: MsqdxSelectProps) => {
  const labelId = id ? `${id}-label` : 'msqdx-select-label';
  const hasError = error || !!errorText;
  const sizeConfig = MSQDX_INPUT.size[size];

  const getBrandColor = (color?: BrandColor) => {
    if (!color) return undefined;
    if (color === 'black') return MSQDX_COLORS.brand.black;
    return MSQDX_COLORS.brand[color];
  };

  const getLabelColor = () => {
    if (labelColor) {
      const brandColor = getBrandColor(labelColor);
      if (brandColor) return brandColor;
    }
    return alpha(MSQDX_COLORS.brand.green, 0.8);
  };

  const iconColor = labelColor ? getBrandColor(labelColor) : MSQDX_COLORS.brand.green;

  const getMenuBorderColor = () => {
    if (hasError) return MSQDX_INPUT.border.error;
    if (success) return MSQDX_INPUT.border.success;
    if (borderColor) {
      const brandColor = getBrandColor(borderColor);
      if (brandColor) return brandColor;
    }
    return MSQDX_COLORS.brand.green;
  };

  const menuBorderColor = getMenuBorderColor();

  const menuProps = {
    PaperProps: {
      sx: (theme: any) => {
        const scrollbarColor = getScrollbarColor(
          borderColor === 'purple' ? 'purple' :
          borderColor === 'yellow' ? 'yellow' :
          borderColor === 'pink' ? 'pink' :
          borderColor === 'orange' ? 'orange' :
          borderColor === 'green' ? 'green' :
          borderColor === 'black' ? 'black' : 'default'
        );
        const scrollbarSize = MSQDX_SCROLLBAR.size.thin;
        const scrollbarBorderRadius = MSQDX_SCROLLBAR.borderRadius.thin;

        return {
          marginTop: '-1px', // Overlap with select field border
          borderRadius: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: `${MSQDX_SPACING.borderRadius.lg}px`,
          borderBottomRightRadius: `${MSQDX_SPACING.borderRadius.lg}px`,
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: "blur(8px)",
          border: `1px solid ${menuBorderColor}`,
          borderTop: 'none',
          boxShadow: 'none',
          maxHeight: 300,
          paddingBottom: `${MSQDX_SPACING.borderRadius.lg}px`, // Padding for border radius
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: scrollbarSize.width,
          },
          '&::-webkit-scrollbar-track': {
            background: scrollbarColor.track,
            borderRadius: scrollbarBorderRadius,
            margin: '2px',
            marginBottom: `${MSQDX_SPACING.borderRadius.lg + 4}px`,
          },
          '&::-webkit-scrollbar-thumb': {
            background: scrollbarColor.thumb,
            borderRadius: scrollbarBorderRadius,
            transition: MSQDX_SCROLLBAR.transition,
            '&:hover': {
              background: scrollbarColor.thumbHover,
            },
            '&:active': {
              background: scrollbarColor.thumbActive,
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: `${scrollbarColor.thumb} ${scrollbarColor.track}`,
          '& .MuiMenuItem-root': {
            padding: `${sizeConfig.padding.vertical}px ${sizeConfig.padding.horizontal}px`,
            fontSize: sizeConfig.fontSize,
            fontFamily: MSQDX_INPUT.fontFamily,
            '&:hover': {
              backgroundColor: alpha(menuBorderColor || MSQDX_COLORS.brand.green, 0.1),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(menuBorderColor || MSQDX_COLORS.brand.green, 0.15),
              '&:hover': {
                backgroundColor: alpha(menuBorderColor || MSQDX_COLORS.brand.green, 0.2),
              },
            },
          },
        };
      },
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  };

  return (
    <StyledFormControl fullWidth={fullWidth} size={size} error={hasError}>
      <InputLabel
        id={labelId}
        sx={{
          position: 'static',
          transform: 'none',
          fontSize: MSQDX_INPUT.label.fontSize,
          fontFamily: MSQDX_INPUT.label.fontFamily,
          fontWeight: MSQDX_INPUT.fontWeight.label,
          textTransform: MSQDX_INPUT.label.textTransform,
          letterSpacing: MSQDX_INPUT.label.letterSpacing,
          color: getLabelColor(),
          mb: 0.5,
          ml: 0.5,
        }}
      >
        {label} {required && '*'}
      </InputLabel>
      
      <Box
        sx={{
          position: 'relative',
          '&:hover .msqdx-select-icon': {
            color: iconColor ? alpha(iconColor, 0.8) : alpha(MSQDX_COLORS.brand.green, 0.8),
          },
          '&:has(.Mui-focused) .msqdx-select-icon': {
            color: iconColor || MSQDX_COLORS.brand.green,
          },
        }}
      >
        <StyledSelect
          labelId={labelId}
          id={id}
          fullWidth={fullWidth}
          selectSize={size}
          error={hasError}
          success={success}
          borderColor={borderColor}
          MenuProps={menuProps}
          IconComponent={() => null}
          {...props}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: sizeConfig.fontSize }}>
              {opt.label}
            </MenuItem>
          ))}
        </StyledSelect>
        
        <Box
          className="msqdx-select-icon"
          sx={{
            position: 'absolute',
            right: `${sizeConfig.padding.horizontal}px`,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            color: iconColor ? alpha(iconColor, 0.6) : alpha(MSQDX_COLORS.brand.green, 0.6),
            transition: 'color 0.2s ease-in-out',
          }}
        >
          <MsqdxIcon name="ArrowDropDown" customSize={sizeConfig.iconSize} />
        </Box>
      </Box>
      
      {errorText && (
        <FormHelperText
          error
          sx={{
            fontSize: MSQDX_INPUT.helper.fontSize,
            fontFamily: MSQDX_INPUT.fontFamily,
            fontWeight: MSQDX_INPUT.fontWeight.helper,
            marginTop: MSQDX_INPUT.helper.marginTop,
            ml: 0.5,
          }}
        >
          {errorText}
        </FormHelperText>
      )}
      
      {helperText && !errorText && (
        <Typography
          component="span"
          sx={{
            fontSize: MSQDX_INPUT.helper.fontSize,
            fontFamily: MSQDX_INPUT.fontFamily,
            fontWeight: MSQDX_INPUT.fontWeight.helper,
            marginTop: MSQDX_INPUT.helper.marginTop,
            ml: 0.5,
            opacity: 0.7,
          }}
        >
          {helperText}
        </Typography>
      )}
    </StyledFormControl>
  );
};
