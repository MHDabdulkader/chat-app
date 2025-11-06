import admin from "firebase-admin"
import path from "path"

const serviceAccount = require(path.join(__dirname, "../config/serviceAccountKey.json"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export const sendPushNotification = async (
    token: string,
    title: string,
    body: string
) =>{
    const message ={
        token,
        notification: {title, body},
    };

    try{
        await admin.messaging().send(message);
        console.log("✅ Notification send successfully")
    }
    catch(error){
        console.log("❌ Notification send error ", error)
        
    }
}