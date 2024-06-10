import React from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Header(subview, icon, props, returnFunction) {
    return (
        <ImageBackground resizeMode={'stretch'} source={require('../../assets/shape.png')} style={Local_styles.header}>
            <StatusBar backgroundColor={'rgb(245,245,245)'} barStyle="dark-content" hidden />
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: icon ? 'space-between' : 'center' }}>
                {icon ?
                    <Icon
                        name="left"
                        color={'white'}
                        size={20}
                        onPress={() => {
                            props ?
                                props.navigation.goBack() :
                                returnFunction()
                        }}
                    />
                    :
                    null
                }

                <Image source={require('../../assets/loading_icon.png')} resizeMode="contain" style={{ height: width * 0.15, width: 75, alignSelf: 'center' }} />
                {icon ?
                    <Icon
                        name="arrowleft"
                        color={'transparent'}
                        size={20}
                    />
                    :
                    null
                }
            </View>
            {subview ? subview : null}
        </ImageBackground>

    );
}

const { height, width } = Dimensions.get('window');

const Local_styles = StyleSheet.create({
    header: {
        padding: '4%',
        height: width * 0.5,
        width: width,
        justifyContent: 'flex-start'
    },
    title: {
        // marginTop: 30,
        // marginLeft: 10,
        marginLeft: '1%',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'AirbnbCerealApp-Bold'
    },
});
