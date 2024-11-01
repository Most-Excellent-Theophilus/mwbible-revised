import React, { useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type DropdownProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
};

 const Dropdown: React.FC<DropdownProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={onToggle} style={styles.dropdownHeader}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.dropdownContent}>{children}</View>}
    </View>
  );
};

export default Dropdown


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownHeader: {
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContent: {
    padding: 15,
    backgroundColor: '#e8e8e8',
  },
  dropdownText: {
    fontSize: 14,
  },
});
