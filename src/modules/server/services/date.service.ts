import { Injectable } from "@nestjs/common";
import { format } from "date-fns";

@Injectable()
export class DateService {
    private customDate: Date | null = null;

    /**
     * Establece una fecha personalizada para uso en los métodos getUTCDate y getLocalDate.
     * @param {string} date Fecha personalizada en formato 'yyyy-MM-dd HH:mm:ss'.
     */
    setCustomDate(date: string | null): void {
        this.customDate = date ? new Date(date) : null;
    }

    /**
     * Obtiene la fecha actual del servidor en formato UTC (Universal Time Coordinated).
     * @returns {Date} Fecha actual en formato UTC.
     */
    getUTCDate(): Date {
        return this.customDate ?? new Date();
    }

    /**
     * Obtiene la fecha actual del servidor en la zona horaria local.
     * @returns {Date} Fecha actual en la zona horaria local.
     */
    getLocalDate(): Date {
        const now = this.customDate ?? new Date();
        const localOffset = now.getTimezoneOffset() * 60000; // Offset en milisegundos
        return new Date(now.getTime() - localOffset);
    }

    /**
     * Formatea una fecha en el formato especificado utilizando la librería date-fns.
     * @param {Date} date Fecha a formatear.
     * @param {string} formatString Formato de fecha deseado (por ejemplo, 'yyyy-MM-dd HH:mm:ss').
     * @returns {string} Fecha formateada.
     */
    formatDate(date: Date, formatString: string): string {
        return format(date, formatString);
    }
}
