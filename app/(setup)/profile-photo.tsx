import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Link, useRouter } from "expo-router";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function PhotoUploadPage() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const pickImage = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: index === 0 ? [4, 5] : [1, 1], // Taller aspect ratio for main photo
      quality: 1,
    });

    if (!result.canceled) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const handleContinue = () => {
    const requiredPhotos = photos.slice(0, 4);
    if (requiredPhotos.some((photo) => photo === null)) {
      alert("Please upload at least the first four photos.");
    } else {
      console.log("Uploaded Photos:", photos);
      // Handle submission logic here
    }
  };

  return (
    <ScrollView>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.headerText,
              {
                color: theme.colors.text,
                fontFamily: theme.fonts.poppins.bold,
              },
            ]}
          >
            Add Your Best Photos
          </Text>
          <Text
            style={[
              styles.subText,
              {
                color: theme.colors.subText,
                fontFamily: theme.fonts.poppins.regular,
              },
            ]}
          >
            Upload six photos to complete your profile. The first four are
            required.
          </Text>

          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.photoSlot,
                  index === 0 && styles.mainPhotoSlot,
                  { backgroundColor: theme.colors.card },
                ]}
                onPress={() => pickImage(index)}
              >
                {photo ? (
                  <View style={styles.photoWrapper}>
                    <Image source={{ uri: photo }} style={styles.image} />
                    <Icon
                      name="camera-alt"
                      size={24}
                      color="#FFFFFF"
                      style={styles.cameraIcon}
                    />
                  </View>
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <Icon
                      name="add-circle"
                      size={50}
                      color={theme.colors.primary}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Pressable
          style={[
            styles.continueButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => router.push("/customize-feed")}
        >
          <Text
            style={[
              styles.continueButtonText,
              { fontFamily: theme.fonts.poppins.bold },
            ]}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contentContainer: {
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  photoSlot: {
    width: "48%",
    aspectRatio: 1, // Square frame for regular photos
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  mainPhotoSlot: {
    width: "100%", // Full width for the main photo
    aspectRatio: 4 / 5, // Taller rectangular frame for main photo
  },
  photoWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 20,
  },
  photoPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
