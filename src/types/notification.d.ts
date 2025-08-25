export type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: string;
  created_at: string;
  updated_at: string;
};

export type GetAllNotficationsResponse = {
  error: string;
  data: {
    notifications: Notification[];
    nextCursor: number | null;
    unread_count;
  };
};
