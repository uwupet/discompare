module.exports = async (msg) => {
  if (msg.author.id !== "218002563541368842") {
    msg.reply("pong");
  }
};