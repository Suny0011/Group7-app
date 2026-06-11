// Dashboard Screen - Show user's projects and recent activity
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setLoading(false);
    }
  };

  const renderProjectCard = ({ item }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.projectDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.mediaTypes}>
          {item.mediaType.map(type => (
            <View key={type} style={styles.mediaTag}>
              <Text style={styles.mediaTagText}>{type}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.deadline}>
          Due: {new Date(item.deadline).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progress,
            { width: getProgressPercentage(item) + '%' }
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.subtitle}>Sarah Chen</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Active Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Assets Created</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Published</Text>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Projects</Text>
        <FlatList
          scrollEnabled={false}
          data={projects}
          renderItem={renderProjectCard}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Call to Action */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => navigation.navigate('Create')}
      >
        <Text style={styles.ctaButtonText}>+ Create New Project</Text>
      </TouchableOpacity>
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

const getProgressPercentage = (project) => {
  const completed = project.assets.filter(a => a.status === 'approved').length;
  return project.assets.length > 0 ? (completed / project.assets.length) * 100 : 0;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50'
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498DB'
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize'
  },
  projectDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 12,
    lineHeight: 18
  },
  cardFooter: {
    marginBottom: 10
  },
  mediaTypes: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8
  },
  mediaTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  mediaTagText: {
    fontSize: 11,
    color: '#3498DB',
    fontWeight: '500'
  },
  deadline: {
    fontSize: 12,
    color: '#95A5A6'
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    overflow: 'hidden'
  },
  progress: {
    height: '100%',
    backgroundColor: '#2ECC71',
    borderRadius: 3
  },
  ctaButton: {
    backgroundColor: '#3498DB',
    marginHorizontal: 15,
    marginVertical: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});

export default DashboardScreen;
