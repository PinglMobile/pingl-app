import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { ScrollView } from "tamagui";

export default function PhotoUploadPage() {
  const [photos, setPhotos] = useState([null, null, null, null, null, null]);

  const pickImage = async (index) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // alert("Sorry, we need camera roll permissions to make this work!");
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
      //alert("Please upload at least the first four photos.");
    } else {
      console.log("Uploaded Photos:", photos);
      // Handle submission logic here
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Add Your Best Photos</Text>
          <Text style={styles.subText}>
            Upload six photos to complete your profile. The first four are
            required.
          </Text>

          <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.photoSlot, index === 0 && styles.mainPhotoSlot]}
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
                    <Icon name="add-circle" size={50} color="#FF5A5F" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Link href="./customize-feed" asChild>
          <Pressable style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // Dark background color
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
    color: "#FFFFFF", // Light text color for dark theme
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  subText: {
    fontSize: 14,
    color: "#BDBDBD", // Light gray for subtext
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Poppins-Regular",
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
    backgroundColor: "#424242", // Darker background for photo slots
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,

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
    backgroundColor: "#FF5A5F", // Accent color for button
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
    fontFamily: "Poppins-Bold",
  },
});
