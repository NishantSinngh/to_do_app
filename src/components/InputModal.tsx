import { Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import imagePath from '../assets/imagePath'

const { width } = Dimensions.get('window')

const InoputModal = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.appContainer}>
        <Pressable
          style={styles.crossImageContainer}>
          <Image source={imagePath.cross} />
        </Pressable>
        <Text style={styles.headerText}>Enter New Task</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            multiline
            placeholder='Enter'
            placeholderTextColor={colors.darkBluish}
            style={styles.inputStyle}

          />
        </View>
        <View style={styles.addButtonContainer}>
          <Pressable
            android_ripple={{ color: colors.ripple }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default InoputModal

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.darkBluish,
  },
  headerText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 150,
    marginBottom: 50,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.blue,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 6,
  },
  inputStyle: {
    flex: 1,
    minHeight: 60,
    maxHeight: 120,
    marginLeft: 20,
    color: colors.darkBluish,
    fontSize: 15
  },
  crossImageContainer: {
    alignSelf: 'flex-end',
    overflow: 'hidden'
  },
  addButtonContainer: {
    backgroundColor: colors.blue,
    marginTop: 200,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 4,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 153,
    height: 63,
  },
  addButtonText: {
    fontSize: 16,
    color: colors.white
  }

})