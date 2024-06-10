// import { Button } from "react-native-elements";
import styles from '../../style';
import React, { Fragment } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
// import Loading from "./loading";
import Icon from 'react-native-vector-icons/FontAwesome';

export default (MyButton = (props) => {
	const { onPress = () => { }, title = 'title', disabled = false, style = {}, styleTitle = {}, icon, image } = props;
	return (
		<Fragment>
			<TouchableOpacity
				disabled={disabled}
				style={[styles.buttonStyle, style]}
				onPress={disabled ? () => { } : onPress}
				activeOpacity={0.5}
			>
				{icon ? <Icon.Button name="facebook" backgroundColor="#3b5998" /> : null}
				{image ? <Image source={{ uri: image }} style={{ height: 15, width: 15, marginRight: "auto" }} resizeMode="contain" /> : null}
				<Text style={[styles.SFUIDisplay14, styleTitle]}>{title}</Text>
			</TouchableOpacity>
		</Fragment>
	);
});
