import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button } from 'react-native';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{ name: string, email: string, imageUrl: string } | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setProfileData({
        name: 'John Doe',
        email: 'john.doe@example.com',
        imageUrl: 'https://example.com/your-profile-image.jpg',
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile data. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchProfileData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profileData && (
        <>
          <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProfileScreen;
