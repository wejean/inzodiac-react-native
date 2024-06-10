import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Menu, { MenuDivider, MenuItem, Position } from "react-native-enhanced-popup-menu";
import Icon from 'react-native-vector-icons/AntDesign';


const DropDown = ({ options = [], value = '', setValue = () => { }, defaultValue = 'select', boolean = false }) => {
  // const [value, setValue] = useState(options && options[0] ? options[0] : 'Select')
  let textRef = React.createRef();
  let menuRef = null;
  const setMenuRef = ref => menuRef = ref;
  const hideMenu = (value) => {
    setValue(value)
    menuRef.hide();
  }
  const showMenu = () => menuRef.show(textRef.current, stickTo = Position.BOTTOM_CENTER);

  const onPress = () => showMenu();
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={onPress} ref={textRef} style={{ borderWidth: value?0:1, backgroundColor: value? primary_color:"transparent", borderColor: "lightgray", borderRadius: 5, width: '100%', paddingVertical: 15, paddingHorizontal: "5%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: 'row', height: '100%', width: '80%', justifyContent: 'space-between' }}>
          <Text style={{ color: value?"white":"gray", fontSize: 15 }}>{((value || value === 0) && (boolean ? value === 1 ? "Male" : "Female" : (<Text style={{ color: '#FFF' }}>{defaultValue}</Text>))) || defaultValue}</Text>
          <Text style={{ color: value? "white" : "red", fontSize: 15, fontWeight: 'bold' }}>{(value || value === 0) && (boolean ? value === 1 ? "Male" : "Female" : value)} </Text>
        </View>
        <Icon name="caretdown" color={value ? "white" : primary_color} />
      </TouchableOpacity>
      <Menu
        ref={setMenuRef}
        style={{ width: '80%' }}
      >

        <FlatList style={{ maxHeight: 200, width: '100%' }}
          data={options}
          renderItem={({ item: option, index }) => (
            <View key={index} style={{ width: '100%' }}>
              <MenuItem onPress={() => { hideMenu(option) }} key={`options_${index}`} textStyle={{ color: "gray" }}>{boolean ? option === 1 ? "Male" : "Female" : option}</MenuItem>
              {index < options.length - 1 ? < MenuDivider key={`divider_${index}`} /> : null}
            </View>
          )}
          keyExtractor={(item, index) => `${item}_${index}`}
        />
      </Menu>
    </View>
  )
}

const primary_color = 'rgb(62, 45, 161)';


const Local_styles = StyleSheet.create({
  container: {}
});

export default DropDown;
