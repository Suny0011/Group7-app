import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  TextInput,
  FlatList
} from 'react-native';

const ProjectDetailScreen = ({ route, navigation }) => {
  const { projectId } = route.params || {};
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchProjectDetail();
  }, [projectId]);

  const fetchProjectDetail = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
      const data = await response.json();
      if (data.id) {
        setProject(data);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim() || !selectedAsset) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${projectId}/assets/${selectedAsset.id}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: comment, author: 'Current User' })
        }
      );
      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Comment added!');
        setComment('');
        fetchProjectDetail();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498DB" />
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.centerContainer}>
        <Text>Project not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Project Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{project.title}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
          <Text style={styles.deadline}>
            Due: {new Date(project.deadline).toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{project.description}</Text>
      </View>

      {/* AI Suggestions */}
      {project.aiSuggestions && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Suggestions</Text>
          <View style={styles.suggestionBox}>
            <Text style={styles.suggestionLabel}>Style:</Text>
            <Text style={styles.suggestionText}>{project.aiSuggestions.style}</Text>
            <Text style={styles.suggestionLabel}>Tone:</Text>
            <Text style={styles.suggestionText}>{project.aiSuggestions.tone}</Text>
            <Text style={styles.suggestionLabel}>Colors:</Text>
            <View style={styles.colorPalette}>
              {project.aiSuggestions.colors?.map((color, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.colorBox,
                    { backgroundColor: color }
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Assets */}
      {project.assets && project.assets.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assets ({project.assets.length})</Text>
          {project.assets.map(asset => (
            <TouchableOpacity
              key={asset.id}
              style={styles.assetCard}
              onPress={() => setSelectedAsset(asset)}
            >
              {asset.type === 'image' && (
                <Image source={{ uri: asset.url }} style={styles.assetImage} />
              )}
              <View style={styles.assetInfo}>
                <Text style={styles.assetTitle}>{asset.title}</Text>
                <View style={[styles.assetStatus, { backgroundColor: asset.status === 'approved' ? '#2ECC71' : '#F39C12' }]}>
                  <Text style={styles.assetStatusText}>{asset.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Comments Section */}
      {selectedAsset && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments on {selectedAsset.title}</Text>
          {selectedAsset.comments?.length > 0 ? (
            selectedAsset.comments.map((c, idx) => (
              <View key={idx} style={styles.commentBox}>
                <Text style={styles.commentAuthor}>{c.author}</Text>
                <Text style={styles.commentText}>{c.text}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>No comments yet</Text>
          )}
          <View style={styles.commentInput}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAddComment}>
              <Text style={styles.submitButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AICoCreation', { projectId })}
        >
          <Text style={styles.buttonText}>✏️ Edit with AI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.buttonText}>📤 Publish</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStatusColor = (status) => {
  const colors = {
    draft: '#95A5A6',
    'in-progress': '#F39C12',
    'in-review': '#3498DB',
    approved: '#2ECC71',
    published: '#27AE60'
  };
  return colors[status] || '#95A5A6';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize'
  },
  deadline: {
    fontSize: 12,
    color: '#7F8C8D'
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20
  },
  suggestionBox: {
    backgroundColor: '#F0F4F8',
    padding: 12,
    borderRadius: 8
  },
  suggestionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 8
  },
  suggestionText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4
  },
  colorPalette: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E8E8E8'
  },
  assetCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB'
  },
  assetImage: {
    width: '100%',
    height: 150
  },
  assetInfo: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  assetTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1
  },
  assetStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  assetStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff'
  },
  commentBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8
  },
  commentAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50'
  },
  commentText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4
  },
  noComments: {
    fontSize: 12,
    color: '#BDC3C7',
    fontStyle: 'italic'
  },
  commentInput: {
    marginTop: 12
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    marginBottom: 8,
    textAlignVertical: 'top'
  },
  submitButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  submitButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    padding: 15,
    marginBottom: 20
  },
  editButton: {
    flex: 1,
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  publishButton: {
    flex: 1,
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  }
});

export default ProjectDetailScreen;
