export type Type = {
  user_type: "business" | "individual" | "other" | "non-profit" | null;
  budget: string[];
};

export type Service = {
  service_type: string[];
};

export type Basic = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type Detail = {
  meeting_date: string;
};

export type Contact = Type & Service & Basic & Detail;
