const path = require('path');
const { readJson, writeJson } = require('../utils/jsonUtils');

const groupsFile = path.join(__dirname, '../data/groups.json');
const messagesDir = path.join(__dirname, '../data/messages');

// Store active users in memory or could use a json file, but memory is fine for Socket IDs
const activeUsers = new Map(); // socketId -> { userId, name, groupId }

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joining a group
    socket.on('joinGroup', async ({ groupId, user }) => {
      try {
        // Leave current rooms if any
        Array.from(socket.rooms).forEach(room => {
          if (room !== socket.id) socket.leave(room);
        });

        // Join the new group room
        socket.join(groupId);
        
        // Store user info
        activeUsers.set(socket.id, { 
          userId: user._id || user.id, 
          name: user.name, 
          groupId 
        });

        // Read group info and add user to members if not present
        const groups = await readJson(groupsFile, []);
        const groupIndex = groups.findIndex(g => g.groupId === groupId);
        
        if (groupIndex !== -1) {
          const group = groups[groupIndex];
          if (!group.members.includes(user.name)) {
            group.members.push(user.name);
            await writeJson(groupsFile, groups);
          }
          
          // Emit updated member count to everyone in the room
          io.to(groupId).emit('groupUpdated', {
            groupId,
            membersCount: group.members.length
          });
        }

        // Fetch old messages for this group
        const messagesFile = path.join(messagesDir, `${groupId}.json`);
        const messages = await readJson(messagesFile, []);
        
        // Send old messages to the user who just joined
        socket.emit('loadMessages', messages);

        console.log(`${user.name} joined group ${groupId}`);
      } catch (error) {
        console.error('Error joining group:', error);
      }
    });

    // Handle sending a message
    socket.on('sendMessage', async ({ groupId, sender, message, imageUrl }) => {
      try {
        const newMessage = {
          id: Date.now().toString(),
          sender,
          message,
          imageUrl: imageUrl || null,
          timestamp: new Date().toISOString()
        };

        // Save to JSON
        const messagesFile = path.join(messagesDir, `${groupId}.json`);
        const messages = await readJson(messagesFile, []);
        messages.push(newMessage);
        await writeJson(messagesFile, messages);

        // Broadcast to everyone in the room
        io.to(groupId).emit('newMessage', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    // Handle leaving a group
    socket.on('leaveGroup', async ({ groupId, userName }) => {
      try {
        socket.leave(groupId);
        activeUsers.delete(socket.id);

        const groups = await readJson(groupsFile, []);
        const groupIndex = groups.findIndex(g => g.groupId === groupId);
        
        if (groupIndex !== -1) {
          const group = groups[groupIndex];
          group.members = group.members.filter(member => member !== userName);
          await writeJson(groupsFile, groups);

          io.to(groupId).emit('groupUpdated', {
            groupId,
            membersCount: group.members.length
          });
        }
        
        console.log(`${userName} left group ${groupId}`);
      } catch (error) {
        console.error('Error leaving group:', error);
      }
    });

    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.id}`);
      // Note: We are not removing the user from the JSON members list on disconnect
      // to simulate "total members who joined". We only remove on explicit "leaveGroup".
      activeUsers.delete(socket.id);
    });
  });
};
