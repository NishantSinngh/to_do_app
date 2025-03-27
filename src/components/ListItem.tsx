import { View, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import React from 'react';
import colors from '../constants/colors';
import imagePath from '../assets/imagePath';

const { width } = Dimensions.get('window');

const ListItem = React.memo(({ item }: { item: string }) => {
    return (
        <View style={styles.container}>
            <Pressable
                android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
                style={({ pressed }) => [
                    styles.button,
                    //   pressed && styles.buttonPressed,
                ]}
            >
                <View  style={styles.checkBox} />
                <Image source={imagePath.checkBox} style={styles.checkBoxImage} />
                <Text style={styles.textStyle}>{item}</Text>
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 8,
        width: width - 30,
        marginHorizontal: 20,
        borderRadius: 5,
        overflow: 'hidden',
        zIndex: 1,
        elevation: 6,
    },
    textStyle: {
        color: colors.white,
    },
    completedTextStyle: {
        textDecorationLine:'line-through',
    },
    button: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: colors.darkBluish,
        padding: 15,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    checkBoxImage: {
        width: 24,
        height: 24,
        marginRight:10,
    },
    checkBox: {
        width: 24,
        height: 24,
        marginRight:10,
        borderWidth:1,
        borderRadius:12,
        borderColor:colors.blue,
    },

});

export default ListItem;
