import { Box, Rating, Typography, Avatar, Stack, Divider } from "@mui/material";

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) hash = string.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 60%, 80%)`;
};

export default function ProductRating({ item }) {
  const avgRating = item?.rating || 0;
  const reviews = item?.reviews || [];

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 4, px: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={4} justifyContent="center">
        <Typography variant="h3" fontWeight="800">{avgRating}</Typography>
        <Box>
          <Rating value={avgRating} readOnly precision={0.5} size="medium" />
          <Typography variant="body2" color="text.secondary">
            {reviews.length} Reviews
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={4}>
        {reviews.map((r, i) => (
          <Box key={i}>
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Avatar
                sx={{
                  width: 36, height: 36, fontSize: "0.85rem",
                  bgcolor: stringToColor(r.reviewerName || "User"),
                  color: "#333"
                }}
              >
                {r.reviewerName?.[0] || "U"}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" fontWeight="700">{r.reviewerName}</Typography>
                  <Rating value={r.rating} readOnly size="small" />
                </Stack>
                <Typography variant="caption" color="text.disabled">
                  {new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ pl: 6.5 }}>
              {r.comment}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
