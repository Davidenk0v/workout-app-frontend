export interface ErrorBack {
  data: {
    response: {
      data: string;
    };
  };
}

export type MessageType = "success" | "error" | "warning";
export type ButtonType = "submit" | "delete" | "edit" | "add" | "logout";
