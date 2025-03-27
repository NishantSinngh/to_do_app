import { View, Text, StyleSheet, Dimensions, Pressable, Image, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import colors from '../constants/colors';
import imagePath from '../assets/imagePath';

const { width } = Dimensions.get('window');

const ListItem = React.memo(({
    item,
    index,
    completed,
    setCompleted

}: {
    item: { id: number; task: string },
    index: number,
    completed: { id: number; task: string }[],
    setCompleted: (item: any) => void
}) => {

    const isCompleted = completed.find(completedItem => completedItem.id === item.id);

    const scaleAnim = useRef(new Animated.Value(0.1)).current;
    const viewTranslate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isCompleted) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(viewTranslate, {
                        toValue: -10,
                        duration: 50,
                        useNativeDriver: true
                    }),
                    Animated.timing(viewTranslate, {
                        toValue: 10,
                        duration: 50,
                        useNativeDriver: true
                    }),
                    Animated.timing(viewTranslate, {
                        toValue: 0,
                        duration: 50,
                        useNativeDriver: true
                    })
                ])
            ]).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [isCompleted]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: viewTranslate }] }]}>
            <Pressable
                android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
                style={styles.button}
                onPress={() => setTimeout(() => {
                    (setCompleted(item))
                }, 150)}
            >
                {!isCompleted ? (
                    <View style={styles.checkBox} />
                ) : (
                    <Animated.Image
                        source={imagePath.checkBox}
                        style={[styles.checkBoxImage, { transform: [{ scale: scaleAnim }] }]}
                    />
                )}
                <Text
                    style={[styles.textStyle, isCompleted && styles.completedTextStyle]}
                >
                    {item.task}
                </Text>
            </Pressable>
        </Animated.View>
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
        textDecorationLine: 'line-through',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.darkBluish,
        padding: 15,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    checkBoxImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    checkBox: {
        width: 24,
        height: 24,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.blue,
    },
});

export default ListItem;
