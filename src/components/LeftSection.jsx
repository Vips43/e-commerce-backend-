import React, { useState } from "react";
import { Box, Tabs, Tab, Paper, Fade, Card, Divider, CardMedia, Typography } from "@mui/material";
import { TabPanel } from "./oth_Component/TabPanel";
import Description from "./oth_Component/Description";
import ProductRating from "./oth_Component/ProductRating";

function LeftSection({ item }) {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper"
      }}
    >
      {/* TABS HEADER */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "grey.50" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              transition: "0.2s",
              "&:hover": { color: "primary.main", bgcolor: "action.hover" }
            }
          }}
        >
          <Tab label="Description" />
          <Tab label={`Reviews (${item?.reviews?.length || 0})`} />
          <Tab label="Support & Meta" />
        </Tabs>
      </Box>

      {/* TAB CONTENT WITH FADE ANIMATION */}
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        <TabPanel value={tab} index={0}>
          <Fade in={tab === 0} timeout={400}>
            <Box><Description item={item} /></Box>
          </Fade>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Fade in={tab === 1} timeout={400}>
            <Box><ProductRating item={item} /></Box>
          </Fade>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Fade in={tab === 2} timeout={400}>
            <Box><PrAbout item={item} /></Box>
          </Fade>
        </TabPanel>
      </Box>
    </Paper>
  );
}

export default LeftSection;


function PrAbout({ item }) {
  return (
    <Card sx={{ p: 3, maxWidth: 480, margin: '0 auto' }}>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Product Information
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Key-Value Rows */}
      <Box sx={{ display: "grid", rowGap: 1.5 }}>
        <InfoRow label="Product ID" value={item.id} />
        <InfoRow label="Weight" value={`${item.weight} g`} />
      </Box>

      {/* Meta Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Metadata
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "grid", rowGap: 1.5 }}>
          <InfoRow label="Barcode" value={item.meta.barcode} />

          {/* QR Code */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              QR Code
            </Typography>
            <CardMedia
              component="img"
              image={item.meta.qrCode}
              alt="QR Code"
              sx={{
                width: 90,
                height: 90,
                borderRadius: 1,
                border: "1px solid #eee",
              }}
            />
          </Box>

          <InfoRow label="Created At" value={formatDate(item.meta.createdAt)} />

          <InfoRow label="Updated At" value={formatDate(item.meta.updatedAt)} />
        </Box>
      </Box>
    </Card>
  );
}

/* 🔹 Reusable Row Component */
function InfoRow({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
}

/* 🔹 Date Formatter */
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}