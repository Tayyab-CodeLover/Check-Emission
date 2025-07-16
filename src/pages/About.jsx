import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
} from "@mui/material";
import {
  DirectionsCar,
  Traffic,
  WbCloudy as Cloud,
  Assessment,
  Public,
  LocalFlorist as EcoAlternative,
} from "@mui/icons-material";

const About = () => {
  const theme = useTheme();

  const featureItems = [
    {
      icon: <DirectionsCar fontSize="large" color="primary" />,
      title: "Vehicle-Specific Calculations",
      description:
        "Accurate emissions estimates based on your vehicle type and model",
    },
    {
      icon: <Traffic fontSize="large" color="primary" />,
      title: "Real-Time Traffic Data",
      description:
        "Considers current traffic conditions for precise route emissions",
    },
    {
      icon: <Cloud fontSize="large" color="primary" />,
      title: "Weather Impact Analysis",
      description: "Calculates how weather conditions affect your emissions",
    },
    {
      icon: <Assessment fontSize="large" color="primary" />,
      title: "Eco-Friendly Recommendations",
      description: "Suggests greener alternatives for your travel routes",
    },
    {
      icon: <Public fontSize="large" color="primary" />,
      title: "Global Impact Tracking",
      description:
        "See how your choices contribute to global emission reduction",
    },
    {
      icon: <EcoAlternative fontSize="large" color="primary" />,
      title: "Sustainability Insights",
      description:
        "Learn how small changes can make a big environmental difference",
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(to bottom, #f5f5f5 0%, #ffffff 100%)",
        marginBottom: "12px",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            px: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background:
                "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Green Transportation Planning Tool
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            sx={{
              mb: 4,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Empowering eco-conscious travel decisions for a sustainable future
          </Typography>
        </Box>

        {/* Problem Statement */}
        <Box
          sx={{
            mb: 8,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            The Challenge We're Addressing
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
            Urban transportation accounts for nearly{" "}
            <strong>30% of global CO₂ emissions</strong>, with private vehicles
            being the largest contributors. Despite growing environmental
            awareness, most travelers lack the tools to make informed decisions
            about their transportation choices.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
            Current navigation apps focus solely on time and distance, ignoring
            the environmental impact of different routes and vehicle types. Our
            tool bridges this gap by providing real-time emissions data to
            empower eco-friendly travel decisions.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: 6,
            color: theme.palette.primary.main,
          }}
        >
          How Our Tool Helps
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {featureItems.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Methodology */}
        <Box
          sx={{
            mb: 8,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Our Approach
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.primary.main,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "30px",
                    marginRight: "10px",
                  }}
                >
                  1
                </span>
                Data Collection
              </Typography>
              <Typography variant="body1" paragraph>
                We integrate real-time traffic and weather data from reliable
                APIs, combined with comprehensive vehicle emission databases to
                ensure accurate calculations.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.primary.main,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "30px",
                    marginRight: "10px",
                  }}
                >
                  2
                </span>
                Smart Algorithms
              </Typography>
              <Typography variant="body1" paragraph>
                Our proprietary algorithms process multiple factors including
                distance, vehicle type, traffic conditions, and elevation
                changes to provide precise emission estimates.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.primary.main,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "30px",
                    marginRight: "10px",
                  }}
                >
                  3
                </span>
                User-Centric Design
              </Typography>
              <Typography variant="body1" paragraph>
                We've designed an intuitive interface that presents complex
                environmental data in simple, actionable insights anyone can
                understand and use.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.primary.main,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "30px",
                    height: "30px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    lineHeight: "30px",
                    marginRight: "10px",
                  }}
                >
                  4
                </span>
                Continuous Improvement
              </Typography>
              <Typography variant="body1" paragraph>
                We regularly update our data sources and algorithms based on
                user feedback and the latest environmental research to maintain
                accuracy.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(142, 41, 208, 0.1) 0%, rgba(100, 103, 218, 0.1) 50%, rgba(10, 235, 238, 0.1) 100%)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Join the Green Transportation Movement
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem" }}
          >
            Every trip you take with our tool helps reduce your carbon
            footprint. Together, we can make a significant impact on urban air
            quality and global climate change.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: "1.2rem",
              mt: 3,
              color: theme.palette.primary.main,
            }}
          >
            Start planning your eco-friendly routes today!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
