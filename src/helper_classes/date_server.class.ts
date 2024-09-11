import { format } from "date-fns";

export class DateServer {
    /**
     * Obtiene la fecha actual del servidor en formato UTC (Universal Time Coordinated).
     * @returns {Date} Fecha actual en formato UTC.
     */
    static getUTCDate(): Date {
        return new Date();
    }

    /**
     * Obtiene la fecha actual del servidor en la zona horaria local.
     * @returns {Date} Fecha actual en la zona horaria local.
     */
    static getLocalDate(): Date {
        const now = new Date();
        const localOffset = now.getTimezoneOffset() * 60000; // Offset en milisegundos
        return new Date(now.getTime() - localOffset);
    }

    /**
     * Formatea una fecha en el formato especificado utilizando la librería date-fns.
     * @param {Date} date Fecha a formatear.
     * @param {string} formatString Formato de fecha deseado (por ejemplo, 'yyyy-MM-dd HH:mm:ss').
     * @returns {string} Fecha formateada.
     */
    static formatDate(date: Date, formatString: string): string {
        return format(date, formatString);
    }
}
