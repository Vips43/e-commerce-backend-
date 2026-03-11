import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TabPanel } from "./oth_Component/TabPanel";
import Description from "./oth_Component/Description";

function LeftSection({ item }) {
 const [tab, setTab] = React.useState(0);

 return (
  <Box sx={{ maxWidth: "100%", mt: 4 }}>
   {/* Tabs header */}
   <Tabs
    value={tab}
    onChange={(_, newValue) => setTab(newValue)}
    textColor="primary"
    indicatorColor="primary"
    sx={{
     borderBottom: 1,
     borderColor: "divider",
    }}
   >
    <Tab label="Description" />
    <Tab label={`Reviews (${item.reviews?.length || 0})`} />
    <Tab label="Support" />
   </Tabs>

   {/* DESCRIPTION TAB */}
   <TabPanel value={tab} index={0}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
     Product Details : {item.title}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Description item={item} />  {/*Description*/}
   </TabPanel>

   {/* REVIEWS TAB */}
   <TabPanel value={tab} index={1}>
   </TabPanel>

   {/* SUPPORT TAB */}
   <TabPanel value={tab} index={2}>
    <PrAbout item={item} />
   </TabPanel>
  </Box>
 );
}

export default LeftSection;


function PrAbout({ item }) {
 return (
  <Card sx={{ p: 3, maxWidth: 480, margin:'0 auto' }}>
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