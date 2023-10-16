require("dotenv").config();

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

const list = new RunningList();

client.on("interactionCreate", (interaction) => {
    if(!interaction.isChatInputCommand()){
        return;
    }

    if(interaction.commandName === "add-task"){
        const task = interaction.options.get("task").value;
        const dueDate = interaction.options.get("due-date").value;

        list.addNode(task, dueDate);
        interaction.reply(`${task} successfully added!`);
    }

    if(interaction.commandName === "remove-task"){
        const task = interaction.options.get("task").value;
        list.removeNode(task);
        interaction.reply(`${task} successfully removed!`);
    }

    if(interaction.commandName === "show-list"){
        if(list.head == null){
            interaction.reply("no tasks to display");
        } else{
            list.toString=function(){
                let retStr = "Task:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDue Date:\n";
                let current = list.head;
                while(current != null){
                    retStr += current.task + current.dueDate.padStart(80-current.task.length) + "\n";
                    current = current.next;
                }
                return retStr;
            }
            interaction.reply(list.toString());
        }
        
    }
    
})

client.login(process.env.TOKEN);