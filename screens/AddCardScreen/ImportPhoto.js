import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';


async function removePhotoUUID(uuid) {
  const photoDirectory = `${FileSystem.documentDirectory}weshowlight/`;
  const photoName = `${uuid}.jpg`;
  const photoPath = `${photoDirectory}${photoName}`;

  // Check if the file already exists
  const fileInfo = await FileSystem.getInfoAsync(photoPath);
  console.log(`fileinfo: ${fileInfo.exists}`)

  if (fileInfo.exists) {
    // Delete the existing file
    await FileSystem.deleteAsync(photoPath, { idempotent: true });
  }
}

export default async function pickImageAndSave(oldpicturepath) {
  // Ask user for permission to access camera roll
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission denied');
    return;
  }

  // Launch the image picker and get the selected image as a file URI
  const result = await ImagePicker.launchImageLibraryAsync();
  if (!result.cancelled) {
    // Save the image to a file
    const photoDirectory = `${FileSystem.documentDirectory}weshowlight/`;
    let photoName = `${uuid.v4()}.jpg`;
    let photoPath = `${photoDirectory}${photoName}`;
    while ((await FileSystem.getInfoAsync(photoPath)).exists) {
      photoName = `${uuid.v4()}.jpg`;
      photoPath = `${photoDirectory}${photoName}`;
    }
    
    // Check if the file already exists
    removePhotoUUID(oldpicturepath)

    await FileSystem.makeDirectoryAsync(photoDirectory, { intermediates: true });
    await FileSystem.copyAsync({ from: result.uri, to: photoPath });

    // Store the photo path in AsyncStorage
    return photoPath;
  }
}