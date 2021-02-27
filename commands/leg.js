const canvas = require('canvas');
const Discord = require('discord.js');
module.exports = async (interaction, client) => {
  // crazy leggy boi code
  // dont touch it or ill touch you
  const leggy_head = await canvas.loadImage('https://v4.nu/legs/leggy_head.png');
  const leggy_legs = await canvas.loadImage('https://v4.nu/legs/leggy_legs.png');
  const leggy_feet = await canvas.loadImage('https://v4.nu/legs/leggy_feet.png');

  //Calculate leg size using LCG
  var m = 120, a = 37, b = 13;
  var user_seed = parseInt(interaction.member.user.id);
  user_seed = user_seed % Math.round(Number.MAX_SAFE_INTEGER / 100);
  var leg_size = (a * user_seed + b) % m;

  // generate a cool leg image
  // head = 250px, bottom = 60px, legs = 5 px (120 * 5 = 600 max)
  var w = 250, h = 250 + 60 + leg_size * 5;
  var my_canvas = canvas.createCanvas(w, h);
  var context = my_canvas.getContext('2d');

  context.drawImage(leggy_head, 0, 0);
  for(var i = 0; i < leg_size; i++)
  {
    context.drawImage(leggy_legs, 0, 250 + i * 5);
  }
  context.drawImage(leggy_feet, 0, 250 + leg_size * 5);

  var attachment = new Discord.MessageAttachment(my_canvas.toBuffer(), "leggy.png");
  //msg.reply(`your legs are ${leg_size} inches long.`, attachment)


  client.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: `your legs are ${leg_size} inches long.`,
        embeds: 
        [
          {
            image: {
              url: my_canvas.toDataURL("image/png")
            }
          }
        ]
      },
    },
  });
}