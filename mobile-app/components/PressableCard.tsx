import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View, Animated } from 'react-native';

type PressableCardProps = {
  children: React.ReactElement;
  onPress: () => void;
};

// PressableCard Component
export default function PressableCard({ children, onPress }: PressableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { elevation: pressed ? 2 : 8 }, // Change elevation when pressed
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // Android shadow
    elevation: 8,
  },
});
