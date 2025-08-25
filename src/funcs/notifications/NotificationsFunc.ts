import { axiosClient } from "@/lib/axios";
import { GetAllNotficationsResponse } from "@/types/notification";

const path = {
  NotificationsBase: "/protected/notifications",
  NotificationsAll: "/all",
  NotificationsMarkRead: "/mark-read/:id",
  NotificationMarkReadBulk: "/mark-read-bulk",
  NotificationsMarkAllRead: "/mark-all-read",
  NotificationDeleteBulk: "/delete-bulk",
};

type NotificationParam = {
  cursor: number;
};

const getAllNotifications = async ({
  cursor,
}: NotificationParam): Promise<GetAllNotficationsResponse> => {
  const response = await axiosClient.get(
    path.NotificationsBase + path.NotificationsAll,
    { params: { ...(cursor && cursor != 0 && { cursor }) } },
  );
  return response.data;
};

const markNotificationAsRead = async (id: string[]) => {
  const response = await axiosClient.post(
    path.NotificationsBase + path.NotificationMarkReadBulk,
    { id },
  );
  return response.data;
};

const deleteMarkedNotifcation = async (id: string[]) => {
  const response = await axiosClient.delete(
    path.NotificationsBase + path.NotificationDeleteBulk,
    { data: { id } },
  );
  return response.data;
};

export { getAllNotifications, markNotificationAsRead, deleteMarkedNotifcation };
