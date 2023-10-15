require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", (c) => {
    console.log(`${c.user.tag} is online.`);
});

class Node {
    constructor(task, dueDate){
        this.task = task;
        this.dueDate = dueDate;
        this.next = null;
    }
}

class RunningList{
    constructor(head = null){
        this.head = head;
    }

    addFirstNode(node){
        this.head = node;
    }

    addNode(task, dueDate){
        const node = new Node(task, dueDate);
        let curr;
        if(this.head === null){
            this.head = node;
        } else {
            curr = this.head;
            while(curr.next){
                    curr = curr.next;
                }
            curr.next = node;
        }
    }

    removeNode(task){
        let curr = this.head;
        let lastVisited = null;
        while(curr != null){
            if(curr.task === task){
                if(lastVisited == null){
                    this.head = curr.next;
                } else {
                    lastVisited.next = curr.next;
                }
            }
            lastVisited = curr;
            curr = curr.next;
        }
    }
}

client.login(process.env.TOKEN);