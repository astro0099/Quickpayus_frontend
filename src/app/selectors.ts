import { RootState } from "./store";

export const selectProfile = (state: RootState) => state.profile;

export const selectTransactionPageCount = (state: RootState) =>
  state.transaction.totalPages;

export const selectTransactionsCount = (state: RootState) =>
  state.transaction.totalCount;

export const selectRankPageCount = (state: RootState) => state.rank.totalPages;

export const selectRanksCount = (state: RootState) => state.rank.totalCount;

export const selectSetting = (state: RootState) => state.setting;

export const selectAnalytics = (state: RootState) => state.analytics;

export const selectNotifications = (state: RootState) => state.notifications;

export const selectAnnouncements = (state: RootState) => state.announcements;

export const selectKycVerification = (state: RootState) =>
  state.kycVerification;

export const selectOtpStatus = (state: RootState) => state.otpStatus;

export const selectTwoFactor = (state: RootState) => state.profile.twofactor;

export const selectIsNewNotification = (state: RootState) =>
  state.notifications.data.some((notification) => !notification.isRead);

export const selectIsNewAnnouncements = (state: RootState) => {
  return state.announcements.data.some((announcement) => !announcement.isRead);
};

export const selectUnreadAnnouncementsCount = (state: RootState) => {
  let count = 0;

  state.announcements.data.forEach((announcement) => {
    if (!announcement.isRead) count++;
  });

  console.log(count)
  return count;
};

export const selectUnDeletedAnnouncmentsCount = (state: RootState) => {
  let count = 0;

  state.announcements.data.forEach((announcement) => {
    if (!announcement.isDelete) count++;
  });
  return count;
};

export const selectUnreadNotificationCount = (state: RootState) => {
  let count = 0;
  state.notifications.data.forEach((notification) => {
    if (!notification.isRead) count++;
  });
  return count;
};

export const selectUnDeletedNotificationsCount = (state: RootState) => {
  let count = 0;

  state.notifications.data.forEach((notification) => {
    if (!notification.isDelete) count++;
  });
  return count;
};
