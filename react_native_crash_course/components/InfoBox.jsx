import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subTitle, containerStyle, titleStyle }) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white font-psemibold text-center ${titleStyle}`}>{title}</Text>
      <Text className={`text-gray-100 text-center font-pregular text-sm ${titleStyle}`}>{subTitle}</Text>
    </View>
  );
};

export default InfoBox