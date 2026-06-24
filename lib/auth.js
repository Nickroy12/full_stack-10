import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db('fullstack_db');
export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  }, 
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
        }, 
    },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
   user:{
    additionalFields:{
      role:{
        defaultValue: "chef"
      },
      plan:{
        defaultValue:'chef_free'
      }

    }
  },
  session:{
cookieCache:{
  enabled:true,
  strategy:'jwt',
  maxAge: 60 * 24 * 30
}
  },
  plugins:[
   jwt()
  ]
});