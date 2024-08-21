import React, { useState } from "react";
import { Button } from "react-native";
import { MapView, StyleImport, Camera } from "@rnmapbox/maps";

const StyleImportConfig = () => {
  const [lightPreset, setLightPreset] = useState("night");
  const nextLightPreset = lightPreset === "night" ? "day" : "night";
  return (
    <>
      <MapView
        style={styles.mapView}
        styleURL={"mapbox://styles/mapbox/standard"}
      >
        <Camera
          defaultSettings={{ centerCoordinate: [-82.452606, 27.964157] }}
          animationDuration={0}
          zoomLevel={15.5}
          pitch={50}
          heading={360}
          centerCoordinate={[-82.452606, 27.964157]}
          animationMode="none"
        />
        <StyleImport
          id="basemap"
          existing
          config={{
            lightPreset: "dusk",
          }}
        />
      </MapView>
    </>
  );
};

const styles = {
  mapView: { flex: 1 },
};

/* end-example-doc */

StyleImportConfig.title = "Style Import Config";
StyleImportConfig.tags = ["StyleImport", "v11"];
StyleImportConfig.docs = `
# Style Import Config

This example shows how to change style import configs - v11 only.
`;

export default StyleImportConfig;
