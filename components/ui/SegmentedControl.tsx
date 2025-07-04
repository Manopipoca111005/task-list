import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Spacing, Typography } from '../../constants/Theme';

interface SegmentOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
}

export const SegmentedControl = ({
  options,
  selectedValue,
  onChange,
  style,
}: SegmentedControlProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.border },
        style,
      ]}
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && [
                styles.selectedOption,
                { backgroundColor: colors.card },
              ],
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                { color: colors.textSecondary },
                isSelected && [
                  styles.selectedOptionText,
                  { color: colors.text },
                ],
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
  },
  option: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  selectedOption: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  optionText: {
    ...Typography.styles.body,
    fontSize: 14,
  },
  selectedOptionText: {
    fontFamily: Typography.fontFamily.medium,
  },
});
