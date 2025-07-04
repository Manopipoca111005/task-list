import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { BorderRadius, FontSizes, Spacing, Typography } from '../../constants/Theme';

type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  maxLength?: number;
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  multiline = false,
  numberOfLines = 1,
  autoCapitalize = 'none',
  keyboardType = 'default',
  style,
  inputStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  maxLength,
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: ViewStyle = {
    borderColor: error
      ? colors.error
      : isFocused
      ? colors.primary
      : colors.border,
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}

      <View style={[styles.inputContainer, containerStyle]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              height: multiline ? undefined : 48,
              textAlignVertical: multiline ? 'top' : 'center',
              paddingLeft: leftIcon ? Spacing.xs : Spacing.md,
              paddingRight: rightIcon ? 40 : Spacing.md,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    ...Typography.styles.label,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.md,
    fontFamily: Typography.fontFamily.regular,
  },
  leftIconContainer: {
    paddingLeft: Spacing.sm,
  },
  rightIconContainer: {
    position: 'absolute',
    right: Spacing.sm,
    height: '100%',
    justifyContent: 'center',
  },
  error: {
    ...Typography.styles.bodySmall,
    marginTop: Spacing.xs,
  },
});
