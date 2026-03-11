import { Box, Divider, Typography } from "@mui/material";

function Description({ item }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Product Description
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: "grid", rowGap: 1.5 }}>
        <InfoRow label="Brand" value={item.brand || "N/A"} />

        <InfoRow
          label="Product Type"
          value={item.tags?.length ? item.tags.join(", ") : "N/A"}
        />

        <InfoRow
          label="Description"
          value={item.description || "N/A"}
          multiline
        />

        <InfoRow
          label="Shipping Info"
          value={item.shippingInformation || "Standard shipping"}
        />

        <InfoRow label="SKU" value={item.sku || "N/A"} />

        <InfoRow
          label="Warranty"
          value={item.warrantyInformation || "No warranty"}
        />

        <InfoRow
          label="Return Policy"
          value={item.returnPolicy || "No return policy"}
        />

        <InfoRow
          label="Availability"
          value={item.availabilityStatus || "Unavailable"}
        />
      </Box>
    </Box>
  );
}

/* 🔹 Reusable row */
function InfoRow({ label, value, multiline = false }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: multiline ? "start" : "center",
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "text.primary", lineHeight: multiline ? 1.6 : 1.4 }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default Description;