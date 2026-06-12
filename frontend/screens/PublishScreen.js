import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch
} from 'react-native';

const PublishScreen = ({ route, navigation }) => {
  const { projectId } = route.params || {};
  const [platform, setPlatform] = useState('web');
  const [options, setOptions] = useState({
    watermark: true,
    analytics: true,
    comments: false,
    scheduling: false
  });

  const platforms = ['web', 'instagram', 'tiktok', 'linkedin', 'youtube'];

  const handlePublish = () => {
    Alert.alert('Success', `Project published to ${platform}!`);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Publish Project</Text>
        <Text style={styles.subtitle}>Choose platform and settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Platform</Text>
        <View style={styles.platformGrid}>
          {platforms.map(p => (
            <TouchableOpacity
              key={p}
              style={[
                styles.platformOption,
                platform === p && styles.platformOptionActive
              ]}
              onPress={() => setPlatform(p)}
            >
              <Text
                style={[
                  styles.platformText,
                  platform === p && styles.platformTextActive
                ]}
              >
                {p === 'instagram' ? '📷' : p === 'tiktok' ? '🎵' : p === 'linkedin' ? '💼' : p === 'youtube' ? '▶️' : '🌐'}
              </Text>
              <Text
                style={[
                  styles.platformLabel,
                  platform === p && styles.platformLabelActive
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Publishing Options</Text>
        {[
          { key: 'watermark', label: 'Add Watermark' },
          { key: 'analytics', label: 'Enable Analytics' },
          { key: 'comments', label: 'Allow Comments' },
          { key: 'scheduling', label: 'Schedule Later' }
        ].map(option => (
          <View key={option.key} style={styles.optionRow}>
            <Text style={styles.optionLabel}>{option.label}</Text>
            <Switch
              value={options[option.key]}
              onValueChange={value =>
                setOptions({ ...options, [option.key]: value })
              }
              trackColor={{ false: '#E8E8E8', true: '#3498DB' }}
              thumbColor={options[option.key] ? '#fff' : '#fff'}
            />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preview</Text>
        <View style={styles.previewBox}>
          <Text style={styles.previewText}>Your content will be formatted for {platform}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>📤 Publish Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  platformOption: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  platformOptionActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#3498DB'
  },
  platformText: {
    fontSize: 24,
    marginBottom: 8
  },
  platformLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  platformLabelActive: {
    color: '#3498DB'
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  optionLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500'
  },
  previewBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center'
  },
  previewText: {
    fontSize: 13,
    color: '#7F8C8D'
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    marginBottom: 20
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  publishButton: {
    flex: 1,
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  publishButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  }
});

export default PublishScreen;
