export default function formatCpuUsage(cpu: number): string {
    return `${Math.round(cpu / 1000)} ms`;
}