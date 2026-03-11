import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";

function Description({ item }) {
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
        Product Details
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        {item?.title}
      </Typography>

      <Stack spacing={0.5} sx={{ borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
        <InteractiveRow label="Brand" value={item?.brand || "N/A"} />
        
        <InteractiveRow 
          label="Product Type" 
          value={
            item?.tags?.length ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {item.tags.map((tag, idx) => (
                  <Chip key={idx} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            ) : "N/A"
          } 
        />

        <InteractiveRow label="Description" value={item?.description || "N/A"} multiline />
        <InteractiveRow label="Shipping Info" value={item?.shippingInformation || "Standard shipping"} />
        <InteractiveRow label="SKU" value={item?.sku || "N/A"} />
        <InteractiveRow label="Warranty" value={item?.warrantyInformation || "No warranty"} />
        <InteractiveRow label="Return Policy" value={item?.returnPolicy || "No return policy"} />
        
        <InteractiveRow 
          label="Availability" 
          value={
            <Chip 
              label={item?.availabilityStatus || "Unavailable"} 
              size="small"
              color={item?.availabilityStatus?.toLowerCase().includes("stock") ? "success" : "default"}
              sx={{ fontWeight: 600 }}
            />
          } 
        />
      </Stack>
    </Box>
  );
}

/* 🔹 Interactive Row Component with Hover Effects */
function InteractiveRow({ label, value, multiline = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: multiline ? "flex-start" : "center" },
        gap: { xs: 1, sm: 3 },
        p: 1.5,
        borderRadius: 2,
        transition: "background-color 0.2s ease-in-out",
        "&:hover": { bgcolor: "grey.50" },
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ minWidth: 140, fontWeight: 500 }}
      >
        {label}
      </Typography>

      <Box sx={{ flexGrow: 1, color: "text.primary", lineHeight: multiline ? 1.6 : 1.4 }}>
        {typeof value === 'string' ? (
          <Typography variant="body2">{value}</Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  );
}

export default Description;