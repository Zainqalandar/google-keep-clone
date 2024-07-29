const config = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    collectionId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
    // storageId: String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID)
}

export default config;