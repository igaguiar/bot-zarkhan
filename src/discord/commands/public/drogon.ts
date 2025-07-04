import { createCommand, createResponder, ResponderType } from "#base";
import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import {
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
} from "discord.js";

createCommand({
    name: "drogon",
    description: "Envia um menu de notificações do Drogon",
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
                content: "Comando executado com sucesso! 🐉",
                ephemeral: true,
            });

            await interaction.channel?.send(drogonMenu());
        }
    },
});

createResponder({
    customId: "notificacao/:acao",
    types: [ResponderType.Button],
    cache: "cached",
    async run(interaction, { acao }) {
        const { member } = interaction;
        const cargoId = "1390383978351034470";

        const temCargo = member.roles.cache.has(cargoId);

        if (acao === "ativar") {
            if (temCargo) {
                interaction.reply({
                    content:
                        "Você já está inscrito para receber notificações do Drogon!",
                    ephemeral: true,
                });
            } else {
                await member.roles.add(cargoId);
                interaction.reply({
                    content:
                        "Você agora receberá notificações do Drogon a cada 2 horas! 🐉",
                    ephemeral: true,
                });
            }
        }
        if (acao === "desativar") {
            if (!temCargo) {
                interaction.reply({
                    content:
                        "Você não está inscrito para receber notificações do Drogon!",
                    ephemeral: true,
                });
            } else {
                await member.roles.remove(cargoId);
                interaction.reply({
                    content:
                        "Você não receberá mais notificações do Drogon! ❌",
                    ephemeral: true,
                });
            }
        }
    },
});

function drogonMenu() {
    const embed = createEmbed({
        color: settings.colors.primary,
        description: brBuilder(
            "# 🔔 Notificações do Drogon",
            "",
            "🐉 Deseja ser avisado sempre que o **Drogon** aparecer?",
            "",
            "📢 Clique no botão abaixo para **ativar** ou **desativar** as notificações.",
            "",
            "✅ Ao ativar, você será mencionado toda vez que o **Drogon**, surgir a cada 2 horas.",
            "❌ Ao desativar, você não receberá mais esses avisos."
        ),
    });

    const row = createRow(
        new ButtonBuilder({
            customId: "notificacao/ativar",
            label: "🔥 Quero ser notificado",
            style: ButtonStyle.Success,
        }),
        new ButtonBuilder({
            customId: "notificacao/desativar",
            label: "❌ Não quero mais ser notificado",
            style: ButtonStyle.Danger,
        })
    );

    return {
        ephemeral: false,
        embeds: embed ? [embed] : [],
        components: [row],
    };
}
