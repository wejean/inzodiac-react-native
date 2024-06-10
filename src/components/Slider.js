import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Text, View } from 'react-native';

const primary_color = 'rgb(30, 20, 96)';
const blue = 'rgb(37,62,111)'
const textColor = 'rgb(27,26,31)'
const Slider = ({ from_age = 0, to_age = 0, setRange = () => { } }) => {
  // const [range, setRange] = useState([18, 35])
  // const [start, end] = range
  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 5 }}>
        <Text style={{ color: textColor, fontSize: 15 }}>Age</Text>
        <Text style={{ color: "gray", fontSize: 15 }}>{`${from_age} to ${to_age}`}</Text>
      </View>
      <MultiSlider
        values={[from_age, to_age]}
        min={0}
        max={100}
        onValuesChangeStart={() => { console.log("value change has started") }}
        onValuesChangeFinish={() => { console.log("value change has stopped") }}
        onValuesChange={(value) => { setRange(value) }}
        isMarkersSeparated={true}
        selectedStyle={{ backgroundColor: "lightgray" }}
        trackStyle={{ backgroundColor: "lightgray", height: 2 }}
        markerStyle={{  backgroundColor: primary_color, height: 16, width: 16, borderRadius: 8 }}
        pressedMarkerStyle={{   backgroundColor: primary_color, height: 16, width: 16, borderRadius: 8 }}
      />
    </View>
  )
}

export default Slider