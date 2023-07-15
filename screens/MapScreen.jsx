import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// import { PROVIDER_GOOGLE } from "react-native-maps";

export const MapScreen = ({route}) => {
  const { coords } = route.params;
  console.log(coords);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        // minZoomLevel={10}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        {coords && (
          <Marker title="I am here" coordinate={coords} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
