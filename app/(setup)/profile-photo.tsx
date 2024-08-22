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
import Icon from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

export default function PhotoUploadPage() {
  const [photos, setPhotos] = useState([null, null, null, null]);

  const pickImage = async (index) => {
    // Request permission to access the gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      setPhotos(newPhotos);
    }
  };

  const handleContinue = () => {
    if (photos.some((photo) => photo === null)) {
      alert("Please upload all four photos.");
    } else {
      console.log("Uploaded Photos:", photos);
      // Handle submission logic here
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="camera" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>Upload your photos</Text>
        <Text style={styles.subText}>
          Upload four photos to complete your profile.
        </Text>

        <View style={styles.photosContainer}>
          {photos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={styles.photoSlot}
              onPress={() => pickImage(index)}
            >
              {photo ? (
                <Image source={{ uri: photo }} style={styles.image} />
              ) : (
                <Text style={styles.photoSlotText}>Select Image</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Link href="./hobbies" asChild>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contentContainer: {
    alignItems: "center",
    padding: 10,
  },
  icon: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  subText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Poppins-Regular",
  },
  photosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  photoSlot: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FF7366",
  },
  photoSlotText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  continueButton: {
    backgroundColor: "#FF7366",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
