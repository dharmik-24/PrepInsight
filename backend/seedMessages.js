const mongoose = require('mongoose');
const fs = require('fs/promises');
const path = require('path');
const Message = require('./models/Message');
const dotenv = require('dotenv');

dotenv.config();

const messagesDir = path.join(__dirname, 'data/messages');

const seedMessages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding Messages');

    const files = await fs.readdir(messagesDir);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const groupId = file.replace('.json', '');
        const filePath = path.join(messagesDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        let messages = [];
        try {
          messages = JSON.parse(fileContent);
        } catch (e) {
          console.error(`Error parsing ${file}`);
          continue;
        }

        if (messages.length > 0) {
          // Format messages for MongoDB
          const docs = messages.map(msg => ({
            groupId,
            sender: msg.sender,
            message: msg.message,
            imageUrl: msg.imageUrl || null,
            timestamp: msg.timestamp || new Date()
          }));
          
          await Message.insertMany(docs);
          console.log(`Seeded ${docs.length} messages for group: ${groupId}`);
        }
      }
    }
    
    console.log('Finished seeding messages.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding messages:', error);
    process.exit(1);
  }
};

seedMessages();
