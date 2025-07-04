import { bootstrap, setupCreators } from "#base";
import { ChannelType } from "discord.js";

const { MAIN_GUILD_ID } = process.env;

setupCreators({
    commands: {
        guilds: [MAIN_GUILD_ID!],
    },
});

await bootstrap({
    meta: import.meta,
    whenReady(client) {
        const channel = client.channels.cache.get("1390094988599361557");
        if (channel?.type === ChannelType.GuildText) {
            channel
                .bulkDelete(100, true)
                .then(() => {
                    channel.send({
                        content:
                            "🧹 As mensagens anteriores foram limpas!\n🐉 Este canal foi configurado para receber os avisos do **Drogon**!",
                    });
                })
                .catch(console.error);

            setInterval(() => {
                const now = new Date();
                const minutes = now.getMinutes();
                const currentHour = now.getHours();
                const nextHour = (currentHour + 1) % 24;
                const cargoId = "1390383978351034470";

                if (minutes === 50 && nextHour % 2 === 0) {
                    channel.send(
                        `🐉 O Drogon aparecerá em 10 minutos! <@&${cargoId}>`
                    );
                }
            }, 60 * 1000); // Executa a cada 1 minuto a verificação do horário
        }
    },
});
