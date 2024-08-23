export default function formatMemoryUsage(memory: number): string {
    return `${Math.round(memory / 1024 / 1024)} MB`;
}