import { Client, Storage, ID } from "appwrite";
import constants from "../config/constant";

class Upload {
    client = new Client();
    bucket;

    constructor() {
        this.client.setEndpoint(constants.appwriteEndPoint).setProject(constants.appwriteProject);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            let data = await this.bucket.createFile(constants.appwriteBucket, ID.unique(), file);
            if (data) {
                return data;
            } else {
                throw data;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileID) {
        try {
            let data = await this.bucket.deleteFile(constants.appwriteBucket, fileID);
            if (data) {
                return data;
            } else {
                throw data;
            }
        } catch (error) {
            throw error;
        }
    }

    getPreview(fileID) {
        try {
            let data = this.bucket.getFilePreview(constants.appwriteBucket, fileID);
            if (data) {
                return data;
            } else {
                throw data;
            }
        } catch (error) {
            throw error;
        }
    }
}

const upload = new Upload();
export default upload;