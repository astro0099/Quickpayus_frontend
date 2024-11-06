import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// antd
import { Layout, Empty } from "antd";

// styled components
import * as Styled from "./Notifications.styled";

// redux
import { api } from "@/app/slice";
import {
  selectNotifications,
  selectUnDeletedNotificationsCount,
  selectUnreadNotificationCount,
} from "@/app/selectors";
import {
  // setNotifications,
  resetNotifications,
  readOne,
  deleteOne,
} from "@/app/slices/notificationsSlice";

// components
import PageTitle from "../PageTitle";
import { NotificationCard } from "../NotificationCard";
import { API } from "@/utils/api";
import useThemeMode from "@/utils/Hooks/useThemeMode";

const { Content } = Layout;

export const Notifications = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const notifications = useSelector(selectNotifications);
  const unReadCounter = useSelector(selectUnreadNotificationCount);
  const unDeleteCounter = useSelector(selectUnDeletedNotificationsCount);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (location.pathname === "/notifications") {
      setCurrentPage(1);
      dispatch(api.util.invalidateTags(["getNotifications"]));
      dispatch(resetNotifications());
    }
  }, [dispatch, location.pathname]);

  const handlePutData = async () => {
    console.log(notifications);
    notifications?.data?.map((notification) => {
      handleRead(notification._id);
    });
  };

  const handleDeleteData = async () => {
    try {
      notifications?.data?.map((notification) => {
        handleDelete(notification._id);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleRead = async (id: string) => {
    try {
      const response = await API.put(`/notifications/${id}`);
      if (response.data.success) {
        dispatch(readOne(id));
      }
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await API.delete(`/notifications/${id}`);
      if (response.data.success) {
        dispatch(deleteOne(id));
      }
    } catch (error) {}
  };

  const { themeMode } = useThemeMode();
  return (
    <>
      <PageTitle title="Notifications" />
      <>
        {unReadCounter > 0 && (
          <>
            <Styled.Counter>{`(New ${unReadCounter})`}</Styled.Counter>
            <Styled.ctaButton onClick={handlePutData}>
              Mark All Read
            </Styled.ctaButton>
          </>
        )}
        {unDeleteCounter > 0 && (
          <Styled.ctaButton onClick={handleDeleteData}>
            Delete All
          </Styled.ctaButton>
        )}
      </>
      <Content className="notification-content">
        <div>
          {/* {(isLoading || isFetching) && (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          )} */}
          {notifications?.data &&
            notifications?.data?.map((notification) => (
              <NotificationCard
                cardItem={notification}
                key={notification._id}
                variant="notification"
                onRead={handleRead}
                onDelete={handleDelete}
              />
            ))}
          {notifications?.data?.length === 0 && (
            <Empty
              description={"No notifications found"}
              style={{
                backgroundColor: "var(--color-bg-container)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px",
                color: themeMode === "dark" ? "#fff" : "#000",
              }}
            />
          )}
        </div>
        <Styled.LoadMoreButtonContainer>
          {notifications?.totalPages > currentPage && (
            <Styled.LoadMoreButton
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }}
            >
              Load More
            </Styled.LoadMoreButton>
          )}
          {notifications?.totalPages === currentPage && currentPage !== 1 && (
            <Styled.NoMoreData>No more notifications to load</Styled.NoMoreData>
          )}
        </Styled.LoadMoreButtonContainer>
      </Content>
    </>
  );
};
