export class FormatClass {
    static formatCpuUsage(cpu: number): string {
        return `${Math.round(cpu / 1000)} ms`;
    }

    static formatMemoryUsage(memory: number): string {
        return `${Math.round(memory / 1024 / 1024)} MB`;
    }

    static formatUptime(uptime: number): string {
        return `${Math.floor(uptime / 3600)} horas, ${Math.floor((uptime % 3600) / 60)} minutos, ${Math.floor(uptime % 60)} segundos`;
    }
}
