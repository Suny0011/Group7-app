// AI Co-Creation Screen - Generate and edit media with AI
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';

const AICoCreationScreen = ({ route, navigation }) => {
  const { projectId } = route.params || {};
  const [mediaType, setMediaType] = useState('image');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [generatedAssets, setGeneratedAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const styles_list = ['modern', 'vintage', 'minimalist', 'vibrant', 'professional'];
  const mediaTypes = ['image', 'video', 'copy'];

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style })
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedAssets([...generatedAssets, data.image]);
        setSelectedAsset(data.image);
        setPrompt('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a script');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/ai/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: prompt, style, duration: 30 })
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedAssets([...generatedAssets, data.video]);
        setSelectedAsset(data.video);
        setPrompt('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate video');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCopy = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a brief');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: prompt, tone: style, maxLength: 280 })
      });
      const data = await response.json();
      if (data.success) {
        const copyAsset = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'copy',
          text: data.copy,
          brief: prompt,
          tone: style,
          timestamp: new Date()
        };
        setGeneratedAssets([...generatedAssets, copyAsset]);
        setSelectedAsset(copyAsset);
        setPrompt('');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate copy');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAsset = () => {
    if (selectedAsset) {
      Alert.alert('Success', 'Asset approved and added to project!');
      setGeneratedAssets(generatedAssets.filter(a => a.id !== selectedAsset.id));
      setSelectedAsset(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Media Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What would you like to create?</Text>
        <View style={styles.mediaTypeContainer}>
          {mediaTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.mediaTypeButton,
                mediaType === type && styles.mediaTypeButtonActive
              ]}
              onPress={() => setMediaType(type)}
            >
              <Text
                style={[
                  styles.mediaTypeText,
                  mediaType === type && styles.mediaTypeTextActive
                ]}
              >
                {type === 'image' ? '🖼️' : type === 'video' ? '🎬' : '✍️'} {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Brief Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Describe what you want</Text>
        <TextInput
          style={styles.input}
          placeholder={
            mediaType === 'image'
              ? 'E.g., A summer sunset beach scene with vibrant colors...'
              : mediaType === 'video'
              ? 'E.g., A software product demo showing key features...'
              : 'E.g., Write compelling copy for a product launch...'
          }
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={5}
          placeholderTextColor="#BDC3C7"
        />
      </View>

      {/* Style Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose a style</Text>
        <View style={styles.styleGrid}>
          {styles_list.map(s => (
            <TouchableOpacity
              key={s}
              style={[
                styles.styleButton,
                style === s && styles.styleButtonActive
              ]}
              onPress={() => setStyle(s)}
            >
              <Text
                style={[
                  styles.styleButtonText,
                  style === s && styles.styleButtonTextActive
                ]}
              >
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[styles.generateButton, loading && styles.generateButtonDisabled]}
        onPress={() => {
          if (mediaType === 'image') handleGenerateImage();
          else if (mediaType === 'video') handleGenerateVideo();
          else handleGenerateCopy();
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.generateButtonText}>✨ Generate with AI</Text>
        )}
      </TouchableOpacity>

      {/* Generated Assets Preview */}
      {selectedAsset && (
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Preview</Text>

          {selectedAsset.type === 'image' && (
            <Image source={{ uri: selectedAsset.url }} style={styles.previewImage} />
          )}

          {selectedAsset.type === 'video' && (
            <View style={styles.videoPreview}>
              <Image
                source={{ uri: selectedAsset.thumbnail }}
                style={styles.videoThumbnail}
              />
              <Text style={styles.videoLabel}>Video Preview</Text>
              <Text style={styles.videoStatus}>Status: {selectedAsset.status}</Text>
            </View>
          )}

          {selectedAsset.type === 'copy' && (
            <View style={styles.copyPreview}>
              <Text style={styles.copyText}>{selectedAsset.text}</Text>
              <Text style={styles.copyMeta}>Tone: {selectedAsset.tone}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.regenerateButton}
              onPress={() => {
                if (mediaType === 'image') handleGenerateImage();
                else if (mediaType === 'video') handleGenerateVideo();
                else handleGenerateCopy();
              }}
            >
              <Text style={styles.regenerateButtonText}>🔄 Regenerate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.approveButton}
              onPress={handleApproveAsset}
            >
              <Text style={styles.approveButtonText}>✓ Approve & Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Generated Assets List */}
      {generatedAssets.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generated Assets ({generatedAssets.length})</Text>
          {generatedAssets.map(asset => (
            <TouchableOpacity
              key={asset.id}
              style={styles.assetItem}
              onPress={() => setSelectedAsset(asset)}
            >
              <Text style={styles.assetItemText}>{asset.type.toUpperCase()}</Text>
              <Text style={styles.assetItemTimestamp}>
                {new Date(asset.timestamp).toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 15
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12
  },
  mediaTypeContainer: {
    flexDirection: 'row',
    gap: 10
  },
  mediaTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    alignItems: 'center'
  },
  mediaTypeButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#3498DB'
  },
  mediaTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D'
  },
  mediaTypeTextActive: {
    color: '#3498DB'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
    textAlignVertical: 'top'
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  styleButton: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center'
  },
  styleButtonActive: {
    backgroundColor: '#2ECC71',
    borderColor: '#2ECC71'
  },
  styleButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#7F8C8D',
    textTransform: 'capitalize'
  },
  styleButtonTextActive: {
    color: '#fff'
  },
  generateButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  generateButtonDisabled: {
    opacity: 0.6
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  previewSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 15
  },
  videoPreview: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15
  },
  videoThumbnail: {
    width: 100,
    height: 60,
    borderRadius: 6,
    marginBottom: 10
  },
  videoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  videoStatus: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5
  },
  copyPreview: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15
  },
  copyText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 10
  },
  copyMeta: {
    fontSize: 12,
    color: '#95A5A6'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10
  },
  regenerateButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ECF0F1',
    alignItems: 'center'
  },
  regenerateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  approveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2ECC71',
    alignItems: 'center'
  },
  approveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  },
  assetItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB'
  },
  assetItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50'
  },
  assetItemTimestamp: {
    fontSize: 12,
    color: '#95A5A6'
  }
});

export default AICoCreationScreen;
