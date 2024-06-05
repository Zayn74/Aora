import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwrite = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.zayn.aora',
    projectId: '6657908c0015e2d189da',
    databaseId: '6657924a0027dd8edd3a',
    userCollectioId: '6657927d001f6463020d',
    videoCollectionId: '665794120011624b244a',
    storageId:'665796160025d0eff460',
}

const client = new Client();

client
    .setEndpoint(appwrite.endpoint) 
    .setProject(appwrite.projectId) 
    .setPlatform(appwrite.platform) 

const account = new Account(client);
const avatars = new Avatars(client)
const databases= new Databases(client)
const storage= new Storage(client)

export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwrite.databaseId,
        appwrite.userCollectioId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

export const signIn= async (email, password)=> {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error
        
        const currentUser = await databases.listDocuments(
            appwrite.databaseId,
            appwrite.userCollectioId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        if (!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId
      
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)
  }
}
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)
  }
}
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      [Query.search('title', query)]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)
  }
}
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      [Query.equal('creator', userId)]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)
  }
}
export const signOut =async () => {
  try {
    const session = await account.deleteSession('current')
    return session
  } catch (error) {
    throw new Error(error)
  }
}
export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === 'image') {
      fileUrl=storage.getFileView(appwrite.storageId,fileId)
    } else if (type === 'video') {
      fileUrl=storage.getFilePreview(appwrite.storageId,fileId,2000,2000,'top',100)
    } else {
      throw new Error('Invalid file type')
    }
    if(!fileUrl)throw new Error

    return fileUrl
  } catch (error) {
    throw new Error(error)
  }
}

export const uploadFile = async (file, type) => {
  if (!file) return
  const asset={
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
};
  try {
    const uploadedFile = await storage.createFile(
      appwrite.storageId,
      ID.unique(),
      asset
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl
  
  } catch (error) {
    throw new Error(error)
  }
}
export const postVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail,'image'),
      uploadFile(form.video,'video')
    ])
    const newPost = await databases.createDocument(
      appwrite.databaseId,
      appwrite.videoCollectionId,
      ID.unique(), {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator:form.userId
      }
    )
    return newPost;
  } catch (error) {
    throw new Error(error)
  }
}