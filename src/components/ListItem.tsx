import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

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
    button: {
        flex: 1,
        backgroundColor: colors.darkBluish,
        padding: 15,
    },
    buttonPressed: {
        opacity: 0.5,
    },
});

export default ListItem;
