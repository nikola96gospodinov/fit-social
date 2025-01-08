import { Database } from "../database.types";

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"] & {
  equipment_name: string;
  muscle_group_name: string;
};
