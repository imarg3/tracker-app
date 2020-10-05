import React, { useContext } from "react";
import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  React.useEffect(() => {
    const listener = navigation.addListener("focus", () => {
      fetchTracks();
    });

    return listener;
  }, [navigation]);

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", {
                  _id: item._id,
                })
              }
            >
              <ListItem>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
