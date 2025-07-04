import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface AvatarProps {
  source?: string;
  size?: number;
  onPress?: () => void;
  showBadge?: boolean;
  editable?: boolean;
}

export const Avatar = ({
  source,
  size = 64,
  onPress,
  showBadge = false,
  editable = false,
}: AvatarProps) => {
  const { colors } = useTheme();
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component onPress={onPress} style={{ position: 'relative' }}>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.border,
          },
        ]}
      >
        {source ? (
          <Image
            source={{ uri: source }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
          />
        ) : (
          <Feather name="user" size={size / 2} color={colors.text} />
        )}
      </View>

      {showBadge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.success,
              right: 0,
            },
          ]}
        />
      )}

      {editable && (
        <View
          style={[
            styles.editButton,
            {
              backgroundColor: colors.primary,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <Feather name="edit-2" size={size / 8} color="white" />
        </View>
      )}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  editButton: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});
