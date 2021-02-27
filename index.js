const Discord = require("discord.js");
const client = new Discord.Client({
  ws:{
    intents:[]
  }
});
const compare = require("./commands/compare.js");
const leg = require("./commands/leg.js");
const ping = require("./commands/ping.js");
const stickbug = require("./commands/stickbug.js");
const https = require('https');

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const command_prefix = "/";
const commands = {
  leg: leg,
  ping: ping,
  stickbug: stickbug,
  compare: compare,
};
client.on("debug", console.log);
client.on("message", (msg) => {
  var cmd;
  if (
    msg.content.startsWith(command_prefix) &&
    (cmd = msg.content.substr(1)) in commands
  ) {
    commands[cmd](msg);
  }
});

client.ws.on("INTERACTION_CREATE", async interaction => {
  // Do stuff here - interaction is an InteractionResponse object. To get the name, use interaction.data.name
  // In particular, the values you passed to the interaction when creating it will be passed back here
  const cmd = interaction.data.name;
  if (cmd in commands) {
    commands[cmd](interaction, client);
  }
  return;
  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 3,
      data: {
        content: `\`\`\`json\n${JSON.stringify(interaction)}\n\`\`\``,
      },
    },
  });
});

const token = process.env.token;
client.login(token);

url = "/api/v8/applications/814156218859126795/commands"

json = {
    "name": "leg",
    "description": "how leggy are you?"
};

headers = {
  "Authorization": `Bot ${token}`,
  "Content-Type": "application/json"
};

//the hecc is this supposed to be
// you are dog
// this better be amazing when i get to look at it tomorrow again
// ok boss
// wow i love this new form of communication

/*
const options = {
  hostname: 'discord.com',
  port: 443,
  path: '/api/v8/applications/814156218859126795/commands',
  method: 'POST',
  headers: headers
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
})

req.on('error', error => {
  console.error(error);
});

req.write(JSON.stringify(json));
req.end();
*/