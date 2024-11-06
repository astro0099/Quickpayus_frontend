import LightBg from "@/assets/support/bg-2.svg";
import DarkBg from "@/assets/support/bg-3.svg";

// antd
import type { SearchProps } from "antd/es/input/Search";
import { FileProtectOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { List, Tag, Typography, Collapse } from "antd";
const { Text, Title } = Typography;
const { Panel } = Collapse;

// styles
import * as Styled from "./Support.styled";
import { useSelector } from "react-redux";
import { selectSetting } from "@/app/selectors";
import { API } from "@/utils/api";
import { useState } from "react";

interface Ticket {
  id: number;
  subject: string;
  status: string;
  priority: string;
  description: string;
  image?: string;
}

interface Feedback {
  id: number;
  fbCnt: string;
  priority: string;
}

const Support = () => {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  // const [filteredTickets, setFilteredTickets] = useState([]);
  // const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [showFilteredFeedback, setShowFilteredFeedback] = useState(false);

  const onSearch: SearchProps["onSearch"] = async (value, _e) => {
    try {
      if (value) {
        const result = await API.post("/support/search", { searchText: value });

        setShowFilteredFeedback(true);

        setFilteredTickets(result.data.tickets);
        setFilteredFeedbacks(result.data.feedbacks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange: SearchProps["onChange"] = (e) => {
    if (e.target.value.length === 0) {
      setShowFilteredFeedback(false);
    }
  }

  const handleImageClick = (image: string) => {
    // Implement image click handling logic here, e.g., open image in a modal
    console.log("Image clicked:", image);
  };
  
  const settings = useSelector(selectSetting);

  return (
    <div>
      <Styled.BgTop>
        <Styled.ImageBg
          src={settings.themeMode === "light" ? LightBg : DarkBg}
        />
        <div className="w-full absolute">
          <Styled.StyledH1>How can we help?</Styled.StyledH1>
          <Styled.StyledSearch
            placeholder="Input search text"
            allowClear
            onSearch={onSearch}
            onChange={handleChange}
            size="middle"
          />
        </div>
      </Styled.BgTop>
      <Styled.TopicWrapper>
        <Styled.StyledH2>
          Choose a topic to help us route your request quickly.
        </Styled.StyledH2>
        <Styled.StyledRow justify="center" style={{ gap: 10 }}>
          <Styled.StyledCol span={24} lg={7}>
            <Styled.StyledLink to="/support/ticket">
              <Styled.IconWrapper>
                <FileProtectOutlined />
              </Styled.IconWrapper>
              <Styled.ItemTitleWrapper>
                Ticket Submission
              </Styled.ItemTitleWrapper>
            </Styled.StyledLink>
          </Styled.StyledCol>
          <Styled.StyledCol span={24} lg={7}>
            <Styled.StyledLink to="/support/feedback">
              <Styled.IconWrapper>
                <QuestionCircleOutlined />
              </Styled.IconWrapper>
              <Styled.ItemTitleWrapper>Feedback</Styled.ItemTitleWrapper>
            </Styled.StyledLink>
          </Styled.StyledCol>
        </Styled.StyledRow>
        { showFilteredFeedback ? <Styled.StyledFilterContainer>
        <Title level={4} style={{ marginBottom: "10px" }}>
          Tickets
        </Title>
        <List
          dataSource={filteredTickets}
          renderItem={(ticket) => (
            <List.Item
              key={ticket.id}
              style={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <List.Item.Meta
                title={
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
                  <Text strong>
                    {ticket.subject}
                  </Text>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <Tag color={ticket.status === "Open" ? "gold" : "green"}>
                      {ticket.status}
                    </Tag>
                    <Tag color="blue">{ticket.priority}</Tag>
                  </div>
                  </div>
                }
                description={
                  <div>
                    <Collapse ghost>
                      <Panel header="Description" key="1">
                        <Text>{ticket.description}</Text>
                        {ticket.image && (
                          <div>
                            <Text
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => handleImageClick(ticket.image!)}
                            >
                              Image provided
                            </Text>
                          </div>
                        )}
                      </Panel>
                    </Collapse>
                  </div>
                }
              />
              
            </List.Item>
          )}
        />
        <Title level={4} style={{ marginBottom: "10px" }}>
          Feedbacks
        </Title>
        <List
          dataSource={filteredFeedbacks}
          renderItem={(feedback) => (
            <List.Item
              key={feedback.id}
              style={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <List.Item.Meta
                title={
                  <Text style={{ minWidth: "200px" }} strong>
                    {feedback.fbCnt}
                  </Text>
                }
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <Tag color="blue">{feedback.priority}</Tag>
              </div>
            </List.Item>
          )}
        />
        </Styled.StyledFilterContainer> : null }
      </Styled.TopicWrapper>
    </div>
  );
};

export default Support;
