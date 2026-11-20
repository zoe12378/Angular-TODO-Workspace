export interface TODO{
  id: number;
  thing: string;
  completed: boolean;
  editing: boolean;
}

export enum todoStatus{
  All= "All",
  Active= "Active",
  Completed= "Completed",
}

