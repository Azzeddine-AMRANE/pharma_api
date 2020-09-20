import * as mongo from "mongodb";

import { MONGODB_URI } from "../util/secrets";

  let clientConnection: mongo.MongoClient;
 
  const connect = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      mongo.MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client: mongo.MongoClient) => {
        if (err) {
          reject(err);
        } else {
          clientConnection = client;
          resolve(client);
        }
      });
    });
  };

  const disconnect = (): void => {
    clientConnection.close();
  };

  const getCollection = async(collection: string) => {
    return clientConnection.db("Pharmacie").collection(collection);  
  };

  export { connect, disconnect, getCollection };
      

