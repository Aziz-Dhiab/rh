const componentStyles = (theme) => ({
  header: {
    position: "relative",
    background:
      "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    paddingBottom: "8rem",
    paddingTop: "3rem",
    [theme.breakpoints.up("md")]: {
      paddingTop: "8rem",
    },
  },
  containerRoot: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "39px",
      paddingRight: "39px",
    },
  },
});

export default componentStyles;
