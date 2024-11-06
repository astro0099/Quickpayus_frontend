import { useState } from "react";
import { NOTIFICATION_TYPES } from "../Notifications/constanst";
import { ANNOUNCEMENT_TYPES } from "../Announcements/constants";
import * as Styled from "./NotificationCard.styled";
import useThemeMode from "@/utils/Hooks/useThemeMode";
import dayjs from "dayjs";
import {
  AlertOutlined,
  BellOutlined,
  CheckOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface props {
  cardItem: any;
  variant: string;
  onRead: any;
  onDelete: any;
}

export const NotificationCard: React.FC<props> = ({ cardItem, variant, onRead, onDelete }) => {
  const themeMode = useThemeMode();
  const [fullText, setFullText] = useState<boolean>(false)

  // console.log(themeMode);
  const icon =
    variant === "notification" ? (
      cardItem.type === NOTIFICATION_TYPES.GENERAL ? (
        <BellOutlined style={{ color: "#007AFF" }} />
      ) : cardItem.type === NOTIFICATION_TYPES.IMPORTANT ? (
        <AlertOutlined style={{ color: "#FF3B30" }} />
      ) : (
        <InfoCircleOutlined className="color-gray" />
      )
    ) : variant === "announcements" ? (
      cardItem.type === ANNOUNCEMENT_TYPES.GENERAL ? (
        (themeMode.themeMode === "dark") ? <BellOutlined  style={{ color: "#ffffff" }} twoToneColor="blue" /> : <BellOutlined twoToneColor="blue" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.IMPORTANT ? (
        <AlertOutlined style={{ color: "#FF3B30" }} />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.UPDATES ? (
        <InfoCircleOutlined className="color-green" />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.URGENT ? (
        <AlertOutlined style={{ color: "#FF3B30" }} />
      ) : cardItem.type === ANNOUNCEMENT_TYPES.WARNING ? (
        <WarningOutlined className="color-orange" />
      ) : (
        <InfoCircleOutlined className="color-gray" />
      )
    ) : null;

    console.log(JSON.stringify(cardItem));

  return (
    <Styled.NotificationCardContainer $type={cardItem.type}>
      {!cardItem.isRead && <Styled.UnreadDot />}
      <Styled.NotificationIcon $variant={variant}>
        {icon}
      </Styled.NotificationIcon>
      <Styled.NotificationBody>
        <Styled.NotificationContent>
          <Link to={cardItem.link}>
            <Styled.Title $type={cardItem.$type}>{cardItem.title}</Styled.Title>
            {variant === "announcements" ? (
              cardItem.description && (
                <Styled.Message>{fullText ? cardItem.description : `${cardItem.description.substring(0, 200)}...`}</Styled.Message>
              )
            ) : (
              <Styled.Message>{cardItem.message}</Styled.Message>
            )}
          </Link>
          {cardItem.description && cardItem.description.length > 200 ? <Link className="text-display-btn" type="link" onClick={() => setFullText(!fullText)}>{fullText ? "Hide" : "Read more"}</Link> : null }
          {cardItem.message && cardItem.message.length > 200 ? <Link className="text-display-btn" type="link" onClick={() => setFullText(!fullText)}>{fullText ? "Hide" : "Read more"}</Link> : null }
        </Styled.NotificationContent>
        <Styled.Action>
          <Styled.Time $variant={variant}>
            <span>
              {dayjs(cardItem?.createdAt).format("DD-MM-YYYY hh:mm A")}
            </span>
          </Styled.Time>
          {!cardItem.isRead && (
            <Button
              size="small"
              type="text"
              onClick={() => onRead(cardItem._id)}
              icon={<CheckOutlined />}
            />
          )}
          <Button
            size="small"
            type="text"
            onClick={() => onDelete(cardItem._id)}
            danger
            icon={<DeleteOutlined />}
          />
        </Styled.Action>
      </Styled.NotificationBody>
    </Styled.NotificationCardContainer>
  );
};
