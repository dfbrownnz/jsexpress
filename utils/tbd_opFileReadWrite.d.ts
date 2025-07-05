/**
 * @typedef {Object} Rcd
 * @property {string} name
 * @property {string} action
 * @property {string} [type] - Optional, add more fields as needed
 */
export interface Rcd {
  name: string;
  action: string;
  type?: string; // Optional, add more fields as needed
}

/**
 * Adds a record to the file.
 * @param rcd The record to add.
 */
export declare function fileAddRcd(rcd: Rcd): void;

/**
 * Reads records from the file.
 * @returns An array of records.
 */
export declare function fileReadRcd(): Rcd[];


