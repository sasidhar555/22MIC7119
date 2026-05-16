import { useState, useEffect } from "react";

import {
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";

import { fetchNotifications } from "../services/api";

import { Log } from "../middleware/logger";

function Home() {

  const [notifications, setNotifications] = useState([]);

  const [selectedType, setSelectedType] =
    useState("All");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

 const loadNotifications = async () => {

  const data = await fetchNotifications();

  if (data.length > 0) {

    Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    setNotifications(data);

  } else {

    Log(
      "frontend",
      "warn",
      "api",
      "Using fallback sample data"
    );

    // fallback sample data

    setNotifications([
      {
        Type: "Placement",
        Message: "Microsoft hiring",
        Timestamp: "2026-04-22 17:51:18",
      },
      {
        Type: "Event",
        Message: "Tech Fest",
        Timestamp: "2026-04-22 17:50:06",
      },
      {
        Type: "Result",
        Message: "Mid Sem Results",
        Timestamp: "2026-04-22 17:51:30",
      },
    ]);

  }
};

  const filteredNotifications =
    notifications.filter((item) => {

      const matchesType =
        selectedType === "All" ||
        item.Type === selectedType;

      const matchesSearch =
        item.Message.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        item.Type.toLowerCase().includes(
          search.toLowerCase()
        );

      return matchesType && matchesSearch;
    });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "40px",
      }}
    >

      <Typography
        variant="h2"
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Campus Notifications
      </Typography>

      {/* FILTER BUTTONS */}

      <Box
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >

        <Button
          variant="contained"
          onClick={() => setSelectedType("All")}
        >
          ALL
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setSelectedType("Placement")
          }
        >
          PLACEMENT
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() =>
            setSelectedType("Event")
          }
        >
          EVENT
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() =>
            setSelectedType("Result")
          }
        >
          RESULT
        </Button>

      </Box>

      {/* SEARCH BAR */}

      <Box
        style={{
          maxWidth: "900px",
          margin: "auto",
          marginBottom: "30px",
        }}
      >

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Notifications"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{
            "& .MuiInputBase-input": {
              color: "black",
            },

            "& .MuiInputBase-input::placeholder":
              {
                color: "gray",
                opacity: 1,
              },
          }}
        />

      </Box>

      {/* NOTIFICATIONS */}

      <Box
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        {filteredNotifications.length > 0 ? (

          filteredNotifications.map(
            (item, index) => (
              <NotificationCard
                key={index}
                notification={item}
              />
            )
          )

        ) : (

          <Typography
            variant="h5"
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            No Results Found
          </Typography>

        )}

      </Box>

    </div>
  );
}

export default Home;