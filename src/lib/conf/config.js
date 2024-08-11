const config = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    collectionTaskId: String(process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID),
    collectionBlogId: String(process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID),
    storageBlogId: String(process.env.NEXT_PUBLIC_APPWRITE_BLOG_BUCKET_ID)
}

export default config;