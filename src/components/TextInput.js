import React, { Fragment } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import styles from '../../style';

export default (CustomTextInput = (props) => {
	let {
		label,
		placeholder,
		value,
		onChangeText = () => { },
		errorField,
		sub_placeholder,
		labelColor = 'black',
		capitalize = 'sentences',
		secureText = false,
		errorContainerStyle = {},
		editable = true,
		maxLength = 500,
		multiline = false,
		customContainerTextInput,
		TextInputStyle,
		icon,
		icon2,
		inputContainer,
		rightTitle,
		titleStyle,
		onFocus
	} = props;
	return (
		<React.Fragment>
			<View
				style={[
					{
						width: '93%',
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						flexDirection: 'column',

						marginBottom: errorField ? 0 : 30,
						color: 'black'
					},
					customContainerTextInput
				]}
			>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					{placeholder && (
						<Text style={[{ color: '#dddddd' }, localStyles.textinputFont, titleStyle]}>{placeholder}</Text>
					)}
					{rightTitle ? (
						<Text
							style={[{ color: 'white' }, localStyles.textinputFont, titleStyle]}
							onPress={props.onClickRightTitle}
						>
							{rightTitle}
						</Text>
					) : null}
				</View>
				{icon ? icon : null}
				<View style={[localStyles.flexRowStartCenter, { width: '100%', alignItems: multiline?'flex-start':'center' }, inputContainer]}>
					<TextInput
						multiline={multiline}
						blurOnSubmit={false}
						onSubmitEditing={()=> Keyboard.dismiss()}
						autoFocus={multiline}
						editable={editable}
						value={value}
						maxLength={maxLength}
						style={[
							styles.formInputText,
							localStyles.textInput,
							localStyles.textinputFont,
							TextInputStyle
						]}
						placeholder={sub_placeholder? sub_placeholder: ""}
						placeholderTextColor="lightgray"
						underlineColorAndroid={'transparent'}
						onChangeText={onChangeText}
						autoCapitalize={capitalize}
						secureTextEntry={secureText}
						onFocus={onFocus}
					/>
					{icon2 ? icon2 : null}
				</View>
			</View>
			{errorField ? (
				<View style={[styles.errorMessageContainerStyle, errorContainerStyle]}>
					<Text style={styles.errorMessageTextStyle}>{errorField}</Text>
				</View>
			) : null}
		</React.Fragment>
	);
});
const localStyles = StyleSheet.create({
	flexRowStartCenter: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	textinputFont: {
		marginLeft: 3,
		fontSize: 14,
		marginBottom: 7,
		fontFamily: 'SFUIDisplay-Bold'
	},
	textInput: {
		width: '91%',
		height: 'auto'
	}
});
