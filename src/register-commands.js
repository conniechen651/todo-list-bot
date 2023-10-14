require('dotenv').config();
const{REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {name: "add-task",
     description: "adds task to to-do list",
     options: [
        {name: "task",
         description: "what task do you need to accomplish?",
         type: ApplicationCommandOptionType.String,
         required: true,
        },
        {name: "due-date",
         description: "what date is it due?",
         type: ApplicationCommandOptionType.String,
         required: true,
        },
     ]
    },

    {name: "remove-task",
     description: "removes task to to-do list",
     options: [
        {name: "task",
         description: "what is the task name?",
         type: ApplicationCommandOptionType.String,
         required: true,
        }
     ]
    },

    {name: "show-list",
     description: "shows list of tasks",
    },
];

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log("Registering slash commands...")

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
            {body:commands}
        );

        console.log("Slash commands were registered successfully!");

    } catch (error){
        console.log(`There was an error: ${error}`);
    }
})();