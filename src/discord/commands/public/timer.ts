import { createCommand } from "#base";
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

createCommand({
    name: "timer",
    description: "Inicia o timer para notificar sobre o Drogon",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        const { member } = interaction;

        if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({
                content:
                    "🚫 Você precisa ser administrador para usar este comando.",
                ephemeral: true,
            });
        } else {
            interaction.reply({
                content:
                    "🕒 Mensagem programada para ser enviada neste canal para o drogon!",
                ephemeral: true,
            });

            interaction.channel?.send(
                `🐉 Este canal foi configurado para receber os avisos do Drogon!`
            );

            setInterval(() => {
                const now = new Date();
                const minutes = now.getMinutes();
                const currentHour = now.getHours();
                const nextHour = (currentHour + 1) % 24;
                const cargoId = "1390383978351034470";

                if (minutes === 50 && nextHour % 2 === 0) {
                    interaction.channel?.send(
                        `🐉 O Drogon aparecerá em 10 minutos! <@&${cargoId}>`
                    );
                }
            }, 60 * 1000); // Executa a cada 1 minuto
        }
    },
});
