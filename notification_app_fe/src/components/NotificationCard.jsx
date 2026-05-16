import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function NotificationCard({ notification }) {

  const getColor = () => {
    if (notification.Type === "Placement") {
      return "#1976d2";
    }

    if (notification.Type === "Event") {
      return "#4caf50";
    }

    if (notification.Type === "Result") {
      return "#ff9800";
    }

    return "#9c27b0";
  };

  const getIcon = () => {
    if (notification.Type === "Placement") {
      return (
        <WorkIcon
          style={{
            fontSize: "40px",
            color: "#1976d2",
          }}
        />
      );
    }

    if (notification.Type === "Event") {
      return (
        <EventIcon
          style={{
            fontSize: "40px",
            color: "#4caf50",
          }}
        />
      );
    }

    if (notification.Type === "Result") {
      return (
        <SchoolIcon
          style={{
            fontSize: "40px",
            color: "#ff9800",
          }}
        />
      );
    }
  };

  return (
    <Card
      style={{
        marginBottom: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      <CardContent
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        {getIcon()}

        <Typography
          variant="h4"
          style={{
            color: getColor(),
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {notification.Type}
        </Typography>

        <Typography
          variant="h6"
          style={{
            marginTop: "15px",
          }}
        >
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          style={{
            marginTop: "10px",
            color: "gray",
          }}
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;