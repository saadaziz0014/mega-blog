import { Client, Databases, ID, Query } from "appwrite";
import constants from "../config/constant";
class Blog {
    client = new Client();
    database;
    constructor() {
        this.client.setEndpoint(constants.appwriteEndPoint).setProject(constants.appwriteProject);
        this.database = new Databases(this.client);
    }

    async createPost({ title, description, content, userID, image, slug }) {
        try {
            let data = await this.database.createDocument(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                ID.unique(),
                {
                    title,
                    description,
                    content,
                    userID,
                    image,
                    slug
                }
            )
            if (data) {
                return data
            } else {
                throw data
            }
        } catch (error) {
            throw error
        }
    }

    async updatePost({ title, description, content, image, slug, id }) {
        try {
            let data = await this.database.updateDocument(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                id,
                {
                    title,
                    description,
                    content,
                    image,
                    slug
                }
            )
            if (data) {
                return data
            } else {
                throw data
            }
        } catch (error) {
            throw error
        }
    }

    async softDeletePost(id) {
        try {
            let data = await this.database.updateDocument(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                id,
                {
                    isDeleted: true
                }
            )
            if (data) {
                return data
            } else {
                throw data
            }
        } catch (error) {
            throw error
        }
    }

    async getPost(id) {
        try {
            let data = await this.database.getDocument(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                id
            )
            if (data) {
                return data
            } else {
                throw data
            }
        } catch (error) {
            throw error
        }
    }

    async activePosts({ page, limit }) {
        try {
            page = page || 1;
            limit = limit || 10;
            let offset = (page - 1) * limit;
            let total = await this.database.listDocuments(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                [
                    Query.equal("isDeleted", false)
                ],
            )
            let totalPages = Math.ceil(total.total / limit);
            totalPages = totalPages <= 0 ? 1 : totalPages;
            let data = await this.database.listDocuments(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                [
                    Query.equal("isDeleted", false)
                ],
                [
                    Query.orderDesc("createdAt")
                ],
                [
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            )
            if (data) {
                return {
                    data: data.documents,
                    total: total.total,
                    totalPages: totalPages
                }
            } else {
                throw data
            }
        } catch (error) {
            throw error
        }
    }

    async myPosts({ userID, page, limit }) {
        try {
            page = page || 1;
            limit = limit || 10;
            let offset = (page - 1) * limit;
            let total = await this.database.listDocuments(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                [
                    Query.equal("userID", userID)
                ],
            )
            let totalPages = Math.ceil(total.total / limit);
            totalPages = totalPages <= 0 ? 1 : totalPages;
            let data = await this.database.listDocuments(
                constants.appwriteDatabaseID,
                constants.appwriteBlog,
                [
                    Query.equal("userID", userID)
                ],
                [
                    Query.orderDesc("createdAt")
                ],
                [
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            )
            if (data) {
                return {
                    data: data.documents,
                    total: total.total,
                    totalPages: totalPages
                }
            } else {
                throw data
            }
        } catch (error) {
            throw error
        }
    }
}

const blog = new Blog();
export default blog;