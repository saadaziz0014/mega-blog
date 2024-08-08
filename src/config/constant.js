const constants = {
    appwriteEndPoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteDB: String(import.meta.env.VITE_APPWRITE_DB),
    appwriteBlog: String(import.meta.env.VITE_APPWRITE_BLOG),
    appwriteBucket: String(import.meta.env.VITE_APPWRITE_BUCKET),
    appwriteProject: String(import.meta.env.VITE_APPWRITE_PROJECT),
}

export default constants;