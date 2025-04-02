import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import colors from '../constants/colors'

const Overlay = ({
    onPress,
    isVisible
}: {
    onPress: () => void
    isVisible: boolean
}) => {

    const backgroundColor = useSharedValue(colors.opacity0);
    useEffect(() => {
        if (isVisible) {
            backgroundColor.value = withTiming(colors.overlay, { duration: 500 })
        }
    }, [isVisible]);
    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: backgroundColor.value
    }));

    function ClosingOverlay() {

        setTimeout(() => {
            onPress()
        }, 0);
        
        backgroundColor.value = withTiming(colors.opacity0, { duration: 200 })

    }

    return (
        <TouchableWithoutFeedback onPress={ClosingOverlay} >
            <Animated.View style={[styles.overlay, animatedStyle]} />
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
})

export default Overlay