export default function formatUptime(uptime: number): string {
    return `${Math.floor(uptime / 3600)} horas, ${Math.floor((uptime % 3600) / 60)} minutos, ${Math.floor(uptime % 60)} segundos`;
}