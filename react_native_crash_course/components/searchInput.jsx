import { useState } from "react";
import { View,TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery||'')

  return (
      <View className="space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex-row items-center">
        <TextInput
          className=" mt-0.5 text-white font-pregular flex-1 text-base"
          value={query}
          placeholder='search for video topic'
          placeholderTextColor="#cdcde0"
          onChangeText={(e)=>setQuery(e)}
        />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Error', 'Please search for something else')
          }
          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
      }}
      >
        <Image
        source={icons.search}
        className='w-5 h-5'
        resizeMode="contain"
        />
       </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
