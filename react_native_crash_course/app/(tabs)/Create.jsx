import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from './../../components/FormField';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from './../../components/CustomButton';
import * as ImagePicker from'expo-image-picker'
import { router } from 'expo-router';
import { postVideo } from '../../lib/appwrite';
import { useGlobalContext } from './../../context/GlobalProvider';

const Create = () => {
  const{user}=useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt:"",
  })

  const picker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType == 'image') {
        setForm({...form,thumbnail:result.assets[0]})
      }
      if (selectType == 'video') {
        setForm({...form,video:result.assets[0]})
      }
    } 
  }

  const submit = async () => {
    if (!form.prompt || !form.thumbnail | !form.title || !form.video) {
      return Alert.alert('please fill all fields')
    }
    setUploading(true)

    try {
      await postVideo({
        ...form,userId:user.$id
      })

      Alert.alert('Success', 'Post Uploaded Successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally {
      setForm({title: "",
      video: null,
      thumbnail: null,
        prompt: "",
      })
      setUploading(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video title"
          value={form.title}
          placeholder="Give your Video a cool title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=>picker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
            ) : (
                <View className="w-full rounded-2xl bg-black-100 justify-center items-center h-40 px-4">
                  <View className='h-14 w-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2'
                    />
                  </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
        <Text className="text-base text-gray-100 font-pmedium">
            Choose your Thumbnail
          </Text>
          <TouchableOpacity onPress={()=>picker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
                <View className="w-full rounded-2xl bg-black-100 justify-center items-center h-16 px-4 border-2 border-black-200 flex-row space-x-2">
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-5 h-5'
                  />
                  <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
                  </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you use to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-5"
        />
        <CustomButton
          title='Publish'
          handlePress={submit}
          containerStyle='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Create