import {Client,Databases,Storage,ID, Query} from 'appwrite';
import config from '../config/config';

class CreateDatabase{
   
    client=new Client();
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        
        this.database=new Databases(this.client);
        this.storage=new Storage(this.client)
    }

    async createPost({title,slug,status,content,image_id,userId}){
        try {
            //Slug is used as ID for Document 
          return  await this.database.createDocument(
                 config.appwriteDatabaseId,
                 config.appwriteCollectionId,
                 ID.unique(),
                 { 
                    title,
                    status,
                    content,
                    image_id,
                    userId,
                    slug
                }
             )
            
        } catch (error) {
            throw error
        }

    }

    async updatePost(id, {title,status,content,image_id}){
        try {
          return  this.database.updateDocument(config.appwriteDatabaseId,
            config.appwriteCollectionId,
            id,
            {
                title,
                content,
                image_id,
                status
            }
            )
            
        } catch (error) {
            throw error
        }
    }
    async deletePost(id,fileid){
        try {
           const file=await this.storage.deleteFile(config.appwriteBucketId,fileid);
            if(file){
                await this.database.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    id
                    )
                }else{
                    await this.database.deleteDocument(
                        config.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        id
                        )
                }
                return true
        } catch (error) {
            console.log("ERROR IN POST DELETE ::",error)
        }
    }

     
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

   async getPost(id){  
    try {
       return this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
       );
    } catch (error) {
        console.log("Get Post error:",error)
        
    }
   }




///File Upload//
 async uploadFile(file){
    try {
       return this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
        )
     
    } catch (error) {
     throw error
    }
 }

 
 async deleteFile(fileId){
    try { 
       return await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
        );

    } catch (error) {
        throw error
    }
}


     getFilePreview(fileId){
          return  this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
            )
        }
    }

const database=new CreateDatabase();
export default database;