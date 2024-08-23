import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HobbiesInterestsPage() {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  // Maximum number of hobbies to show initially
  const initialDisplayLimit = 6;

  const hobbiesCategories = {
    Entertainment: [
      "🎬 Movies",
      "🎵 Music",
      "🎭 Theater",
      "🎮 Video Games",
      "🎙️ Podcasts",
      "🎤 Karaoke",
      "🃏 Board Games",
      "🎧 Concerts",
      "🧩 Trivia Nights",
      "📺 Streaming",
      "🎲 Role-playing Games",
      "🎳 Bowling",
    ],
    Sports: [
      "⚽ Football",
      "🏀 Basketball",
      "🏃‍♂️ Running",
      "🏊‍♂️ Swimming",
      "🧘‍♂️ Yoga",
      "🎾 Tennis",
      "🚴‍♂️ Cycling",
      "🏄‍♂️ Surfing",
      "⛷️ Skiing",
      "🛹 Skateboarding",
      "🏋️‍♂️ Weightlifting",
      "🥋 Judo",
    ],
    Food: [
      "🍳 Cooking",
      "🍰 Baking",
      "🍷 Wine Tasting",
      "🍲 Dining Out",
      "🌱 Vegetarian",
      "🥗 Vegan",
      "🍔 BBQ",
      "🍜 Street Food",
      "🍱 Organic Food",
      "🍣 Sushi",
      "🍫 Chocolate Making",
      "🧀 Cheese Tasting",
    ],
    Outdoors: [
      "🥾 Hiking",
      "🏕️ Camping",
      "🎣 Fishing",
      "🚵‍♂️ Cycling",
      "🌱 Gardening",
      "🧗‍♂️ Rock Climbing",
      "🦜 Bird Watching",
      "🏖️ Beach",
      "🍂 Nature Walks",
      "🏞️ National Parks",
      "🛶 Canoeing",
      "🐟 Fly Fishing",
    ],
    Arts: [
      "🎨 Painting",
      "✍️ Drawing",
      "📷 Photography",
      "📝 Writing",
      "🧶 Crafting",
      "🕺 Dance",
      "🎭 Acting",
      "🎤 Singing",
      "🎥 Film Making",
      "🎭 Improv",
      "🎨 Sculpting",
      "📚 Literary Analysis",
    ],
    Travel: [
      "🚗 Road Trips",
      "🎒 Backpacking",
      "🛳️ Cruises",
      "🏖️ Beach Vacations",
      "🏙️ City Tours",
      "⛰️ Hiking Trails",
      "🏰 Historical Sites",
      "🐘 Wildlife Safaris",
      "🛶 River Rafting",
      "🚡 Cable Car Rides",
      "✈️ Airplane Spotting",
      "🌍 World Travel",
    ],
    Technology: [
      "💻 Programming",
      "🎮 Gaming",
      "🤖 AI",
      "🚀 Robotics",
      "📱 Gadgets",
      "🔒 Cybersecurity",
      "🎧 Virtual Reality",
      "🛠️ 3D Printing",
      "🌐 Web Development",
      "🔋 Battery Tech",
      "📱 App Development",
      "🌐 Blockchain",
    ],
    Literature: [
      "📚 Reading",
      "✒️ Poetry",
      "📖 Creative Writing",
      "📚 Book Clubs",
      "📕 Fiction",
      "📘 Non-fiction",
      "📜 Science Fiction",
      "📗 Fantasy",
      "📰 Journalism",
      "🖋️ Calligraphy",
      "📜 Philosophy",
      "📖 Short Stories",
    ],
    Fashion: [
      "👗 Fashion Design",
      "🛍️ Shopping",
      "💍 Jewelry Making",
      "👠 Modeling",
      "👜 Vintage Fashion",
      "♻️ Sustainable Fashion",
      "📸 Fashion Photography",
      "🧥 Styling",
      "👢 Boot Design",
      "🧣 Scarf Knitting",
      "👜 Handbag Design",
      "🧵 Sewing",
    ],
    Music: [
      "🎸 Playing Guitar",
      "🎹 Piano",
      "🎤 Singing",
      "🎧 DJing",
      "🎼 Composing",
      "🎵 Music Production",
      "🥁 Playing Drums",
      "🎻 Violin",
      "🎺 Trumpet",
      "🎷 Saxophone",
      "🎸 Bass Guitar",
      "🎤 Karaoke",
    ],
    Health: [
      "🏋️‍♂️ Fitness",
      "🧘‍♂️ Meditation",
      "🍏 Nutrition",
      "🥋 Martial Arts",
      "🏃‍♂️ Running",
      "💪 Bodybuilding",
      "🧠 Mindfulness",
      "🚴‍♂️ Spinning",
      "🥊 Boxing",
      "🛌 Sleep Hygiene",
      "🧠 Mental Health",
      "🥗 Diet Planning",
    ],
  };

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
    } else if (selectedHobbies.length < 5) {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const toggleSection = (category) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleContinue = () => {
    if (selectedHobbies.length < 5) {
      alert("Please select exactly 5 hobbies or interests.");
    } else {
      console.log("Selected Hobbies:", selectedHobbies);
      // Handle submission logic here
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <FontAwesome
          name="star"
          size={60}
          color="#FF7366"
          style={styles.icon}
        />
        <Text style={styles.headerText}>Choose your hobbies and interests</Text>
        <Text style={styles.subText}>
          Select up to 5 hobbies that you’re passionate about to help us suggest
          better matches for you.
        </Text>
        <Text style={styles.selectionText}>
          Selected: {selectedHobbies.length} / 5
        </Text>

        {Object.entries(hobbiesCategories).map(([category, hobbies], index) => {
          const displayedHobbies = expandedSections[category]
            ? hobbies
            : hobbies.slice(0, initialDisplayLimit);

          return (
            <View key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.divider} />
              <View style={styles.hobbiesContainer}>
                {displayedHobbies.map((hobby, hobbyIndex) => (
                  <TouchableOpacity
                    key={hobbyIndex}
                    style={[
                      styles.hobbyOption,
                      selectedHobbies.includes(hobby) && styles.selectedOption,
                      selectedHobbies.length >= 5 &&
                        !selectedHobbies.includes(hobby) &&
                        styles.disabledOption,
                    ]}
                    onPress={() => toggleHobby(hobby)}
                    disabled={
                      selectedHobbies.length >= 5 &&
                      !selectedHobbies.includes(hobby)
                    }
                  >
                    <Text
                      style={[
                        styles.hobbyText,
                        selectedHobbies.includes(hobby) &&
                          styles.selectedHobbyText,
                      ]}
                    >
                      {hobby}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {hobbies.length > initialDisplayLimit && (
                <TouchableOpacity
                  onPress={() => toggleSection(category)}
                  style={styles.showMoreButton}
                >
                  <Text style={styles.showMoreText}>
                    {expandedSections[category] ? "Show Less" : "Show More"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      <Link href="./customize-feed" asChild>
        <Text style={styles.continueButtonText}>Continue</Text>
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
    paddingVertical: 20,
    marginTop: -20,
  },
  contentContainer: {
    alignItems: "center",
  },
  icon: {
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",

    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  subText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  selectionText: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
  },
  categoryContainer: {
    width: "100%",
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    marginTop: 5,
    marginBottom: 10,
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8,
  },
  hobbyOption: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    margin: 5,
    alignItems: "center",
  },
  hobbyText: {
    fontSize: 12,
    color: "#333333",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  selectedOption: {
    backgroundColor: "#FF7366",
  },
  selectedHobbyText: {
    color: "white",
  },
  disabledOption: {
    opacity: 0.5,
  },
  showMoreButton: {
    marginTop: 15,
    alignSelf: "center",
  },
  showMoreText: {
    color: "#FF7366",
    fontFamily: "Poppins-SemiBold",
  },
  continueButton: {
    backgroundColor: "#FF7366",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: "#FFB8A4",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
