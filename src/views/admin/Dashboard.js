import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
//import { Line } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
//import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
// @material-ui/icons components
//import ArrowDownward from "@material-ui/icons/ArrowDownward";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";

// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  //chartExample1,
  chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";



const baroptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Taux d'absenteisme moyen par département ",
    },
  },
};

const barlabels = ["HR", "Sales", "R&D"];
const bardata = {
  labels: barlabels,
  datasets: [
    {
      label: "Nombre",
      data: [210, 216, 207],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      barThickness: 200,
      borderWidth: 1,
    },
  ],
};

const piedata = {
  labels: ["Mâles", "Femelles"],
  datasets: [
    {
      label: "My First Dataset",
      data: [42.64, 57.36],
      backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
      hoverOffset: 4,
    },
  ],
};
const piedata2 = {
  labels: ["Turned over", "Travaillent"],
  datasets: [
    {
      label: "My First Dataset",
      data: [11.46, 88.54],
      backgroundColor: ["rgb(70, 70, 70)", "rgb(255,214,0)"],
      hoverOffset: 4,
    },
  ],
};
const piedata3 = {
  labels: ["Nouveaux salariés", "Salariés permanants"],
  datasets: [
    {
      label: "My First Dataset",
      data: [30, 70],
      backgroundColor: ["rgb(70, 70, 100)", "rgb(150,214,0)"],
      hoverOffset: 4,
    },
  ],
};
const pieoptions = {
  legend: { display: true },
  title: { display: true, text: "Pourcentage Mâles/Femelles" },
};
const pieoptions2 = {
  legend: { display: true },
  title: { display: true, text: "Taux de turnover" },
};
const pieoptions3 = {
  legend: { display: true },
  title: { display: true, text: "Proportion des nouveaux salariés" },
};
const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [EmpolyeeData, setEmpolyeeData] = React.useState([])

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  React.useEffect(() => {
    axios.get("https://test.ipdb.io/api/v1/assets/?search=dataemployee").then((response) => {
      setEmpolyeeData(response.data[0].data.dataemployee);
      console.log(response.data[0].data.dataemployee);
    }).catch((err)=>{
      console.log(err)
      
    });
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootBgGradient,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h6"
                        letterSpacing=".0625rem"
                        marginBottom=".25rem!important"
                        className={classes.textUppercase}
                      >
                        <Box component="span" color={theme.palette.gray[400]}>
                          {/*Overview*/}
                        </Box>
                      </Box>
                      <Box
                        component={Typography}
                        variant="h2"
                        marginBottom="0!important"
                      >
                        <Box component="span" color={theme.palette.white.main}>
                          Nombre d'emplyoés par département
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {/*<Button
                          variant="contained"
                          color="primary"
                          component={Box}
                          marginRight="1rem!important"
                          onClick={() => toggleNavs(1)}
                          classes={{
                            root:
                              activeNav === 1
                                ? ""
                                : classes.buttonRootUnselected,
                          }}
                        >
                          Month
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => toggleNavs(2)}
                          classes={{
                            root:
                              activeNav === 2
                                ? ""
                                : classes.buttonRootUnselected,
                          }}
                        >
                          Week
                        </Button>*/}
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>

              <CardContent>
                <Box
                  position="relative"
                  height="350px"
                  width="100%"
                  style={{ display: "flex" }}
                >
                  {/*<Pie
                    style = {{float:"left"}}
                    data={piedata}
                    options={pieoptions}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                  <Pie
                    style = {{float:"right"}}
                    data={piedata2}
                    options={pieoptions2}
                    getDatasetAtEvent={(e) => console.log(e)}
              />*/}
                  <Bar
                    data={bardata}
                    options={baroptions}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />

                  {/*<Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
              />*/}
                </Box>
                <Box
                  position="relative"
                  height="350px"
                  width="33%"
                  style={{ display: "flex", float: "left" }}
                >
                  <Pie
                    style={{ float: "left" }}
                    data={piedata}
                    options={pieoptions}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                  <Pie
                    data={piedata2}
                    options={pieoptions2}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                  <Pie
                    style={{ float: "right" }}
                    data={piedata3}
                    options={pieoptions3}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid  item xs={12} xl={4}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                title={
                  <Box component="span" color={theme.palette.gray[600]}>
                    {/*profane*/}
                  </Box>
                }
                subheader="KPIs"
                classes={{ root: classes.cardHeaderRoot }}
                titleTypographyProps={{
                  component: Box,
                  variant: "h6",
                  letterSpacing: ".0625rem",
                  marginBottom: ".25rem!important",
                  classes: {
                    root: classes.textUppercase,
                  },
                }}
                subheaderTypographyProps={{
                  component: Box,
                  variant: "h2",
                  marginBottom: "0!important",
                  color: "initial",
                }}
              ></CardHeader>
              <CardContent>
                <Box position="relative" height="350px">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </Box>
              </CardContent>
            </Card>
            <Grid item xs={12} xl={12} style = {{marginTop:"5%"}}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        Taux d'Absenteïsme par departement
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {/*<Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          See all
                        </Button>*/}
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <TableContainer>
                <Box
                  component={Table}
                  alignItems="center"
                  marginBottom="0!important"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Département
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Absenteïsme
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        R&D
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                      28.58%
                      </TableCell>
                      {/*<TableCell classes={{ root: classes.tableCellRoot }}>
                        <Box display="flex" alignItems="center">
                          <Box component="span" marginRight=".5rem">
                            60%
                          </Box>
                          <Box width="100%">
                            <LinearProgress
                              variant="determinate"
                              value={60}
                              classes={{
                                root: classes.linearProgressRoot,
                                bar: classes.bgGradientError,
                              }}
                            />
                          </Box>
                        </Box>
                            </TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        HR
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                      31,83%
                      </TableCell>
                      {/*<TableCell classes={{ root: classes.tableCellRoot }}>
                        <Box display="flex" alignItems="center">
                          <Box component="span" marginRight=".5rem">
                            70%
                          </Box>
                          <Box width="100%">
                            <LinearProgress
                              variant="determinate"
                              value={70}
                              classes={{
                                root: classes.linearProgressRoot,
                                bar: classes.bgGradientSuccess,
                              }}
                            />
                          </Box>
                        </Box>
                            </TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        Sales
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                      32.29%
                      </TableCell>
                      {/*<TableCell classes={{ root: classes.tableCellRoot }}>
                        <Box display="flex" alignItems="center">
                          <Box component="span" marginRight=".5rem">
                            80%
                          </Box>
                          <Box width="100%">
                            <LinearProgress
                              variant="determinate"
                              value={80}
                              classes={{
                                root: classes.linearProgressRoot,
                                bar: classes.bgGradientPrimary,
                              }}
                            />
                          </Box>
                        </Box>
                            </TableCell>*/}
                    </TableRow>
                  </TableBody>
                </Box>
              </TableContainer>
            </Card>
          </Grid>
          </Grid>
        </Grid>
        <Grid container component={Box} marginTop="3rem">
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            <Card
              classes={{
                root: classes.cardRoot,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        Les employés
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {/*<Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          See all
                </Button>*/}
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <TableContainer>
                <Box
                  component={Table}
                  alignItems="center"
                  marginBottom="0!important"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        EmployeeNumber
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Department
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        NumOfCurrProjects
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Gender
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        ProjectsDone
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Age
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    
                    {EmpolyeeData.map((x) => (
                      <TableRow>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {x.EmployeeNumber}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {x.Department}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {x.NumOfCurrProjects}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {x.Gender}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {x.ProjectsDone}
                        </TableCell>
                        <TableCell classes={{ root: classes.tableCellRoot }}>
                          {x.Age}
                        </TableCell>
                      </TableRow>
                    ))}

                    {/*<TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        Barry Alan
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        210,000
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        90 548 888
                      </TableCell>
                      <Box
                        component={TableCell}
                        className={classes.tableCellRoot}
                        marginBottom="-2px"
                      >
                        <Box
                          //component={ArrowDownward}
                          width="1rem!important"
                          height="1rem!important"
                          marginRight="1rem"
                          color={theme.palette.warning.main}
                        />
                        HR
                      </Box>
                      </TableRow>*/}
                    {/*<TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        /argon/tables.html
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        2,050
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        147
                      </TableCell>
                      <Box
                        component={TableCell}
                        className={classes.tableCellRoot}
                        marginBottom="-2px"
                      >
                        <Box
                          component={ArrowUpward}
                          width="1rem!important"
                          height="1rem!important"
                          marginRight="1rem"
                          color={theme.palette.success.main}
                        />
                        50,87%
                      </Box>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead +
                            " " +
                            classes.borderBottomUnset,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        /argon/profile.html
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.borderBottomUnset,
                        }}
                      >
                        1,795
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.borderBottomUnset,
                        }}
                      >
                        190
                      </TableCell>
                      <Box
                        component={TableCell}
                        className={
                          classes.tableCellRoot +
                          " " +
                          classes.borderBottomUnset
                        }
                        marginBottom="-2px"
                      >
                        <Box
                          component={ArrowDownward}
                          width="1rem!important"
                          height="1rem!important"
                          marginRight="1rem"
                          color={theme.palette.error.main}
                        />
                        46,53%
                      </Box>
                      </TableRow>*/}
                  </TableBody>
                </Box>
              </TableContainer>
            </Card>
          </Grid>

          <Grid item xs={12} xl={4}>
            <Card classes={{ root: classes.cardRoot }}>
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        Salaire moyen par département
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {/*<Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          See all
                        </Button>*/}
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <TableContainer>
                <Box
                  component={Table}
                  alignItems="center"
                  marginBottom="0!important"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Département
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      >
                        Salaire
                      </TableCell>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootHead,
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        R&D
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        9947
                      </TableCell>
                      {/*<TableCell classes={{ root: classes.tableCellRoot }}>
                        <Box display="flex" alignItems="center">
                          <Box component="span" marginRight=".5rem">
                            60%
                          </Box>
                          <Box width="100%">
                            <LinearProgress
                              variant="determinate"
                              value={60}
                              classes={{
                                root: classes.linearProgressRoot,
                                bar: classes.bgGradientError,
                              }}
                            />
                          </Box>
                        </Box>
                            </TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        HR
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        151,735
                      </TableCell>
                      {/*<TableCell classes={{ root: classes.tableCellRoot }}>
                        <Box display="flex" alignItems="center">
                          <Box component="span" marginRight=".5rem">
                            70%
                          </Box>
                          <Box width="100%">
                            <LinearProgress
                              variant="determinate"
                              value={70}
                              classes={{
                                root: classes.linearProgressRoot,
                                bar: classes.bgGradientSuccess,
                              }}
                            />
                          </Box>
                        </Box>
                            </TableCell>*/}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        classes={{
                          root:
                            classes.tableCellRoot +
                            " " +
                            classes.tableCellRootBodyHead,
                        }}
                        component="th"
                        variant="head"
                        scope="row"
                      >
                        Sales
                      </TableCell>
                      <TableCell classes={{ root: classes.tableCellRoot }}>
                        21,433
                      </TableCell>
                      {/*<TableCell classes={{ root: classes.tableCellRoot }}>
                        <Box display="flex" alignItems="center">
                          <Box component="span" marginRight=".5rem">
                            80%
                          </Box>
                          <Box width="100%">
                            <LinearProgress
                              variant="determinate"
                              value={80}
                              classes={{
                                root: classes.linearProgressRoot,
                                bar: classes.bgGradientPrimary,
                              }}
                            />
                          </Box>
                        </Box>
                            </TableCell>*/}
                    </TableRow>
                  </TableBody>
                </Box>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
