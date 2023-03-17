export type User = {
  name: string;
  phoneNumber: string;
  password: string;
  email: string;
};

export type AlertProps = {
  type: "success" | "warning" | "error" | "notification" | "";
  message: string | undefined;
  styles?: string;
};
