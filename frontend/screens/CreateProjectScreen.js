import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

const CreateProjectScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('images');
  const [loading, setLoading] = useState(false);

  const mediaTypes = ['images', 'videos', 'copy', 'mixed'];

  const handleCreateProject = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          mediaType: [mediaType],
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
        })
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Project created!');
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create New Project</Text>
        <Text style={styles.subtitle}>Start your AI-powered creative journey</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Project Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="E.g., Summer Campaign 2024"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What do you want to create?"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Primary Media Type</Text>
          <View style={styles.mediaTypeGrid}>
            {mediaTypes.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.mediaTypeOption,
                  mediaType === type && styles.mediaTypeOptionActive
                ]}
                onPress={() => setMediaType(type)}
              >
                <Text
                  style={[
                    styles.mediaTypeText,
                    mediaType === type && styles.mediaTypeTextActive
                  ]}
                >
                  {type === 'images' ? '🖼️' : type === 'videos' ? '🎬' : type === 'copy' ? '✍️' : '🎨'} {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateProject}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Project</Text>
          )}
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
  form: {
    padding: 20
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#2C3E50'
  },
  textArea: {
    textAlignVertical: 'top',
    height: 120
  },
  mediaTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  mediaTypeOption: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  mediaTypeOptionActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#3498DB'
  },
  mediaTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F8C8D',
    textAlign: 'center'
  },
  mediaTypeTextActive: {
    color: '#3498DB'
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});

export default CreateProjectScreen;
