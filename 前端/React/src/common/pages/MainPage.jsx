import React, { useState } from "react";
import SearchBox from "../components/SearchBox.jsx";
import OpenButton from "../components/OpenButton.jsx";
import SideBar from "../components/SideBar.jsx";
import DataTable from "../components/DataTable.jsx";
import NavBar from "../components/NavBar.jsx";
import { Grid } from "@material-ui/core";
import CreatePj from "./CreatePj.jsx";

function MainPage() {
  const [isCreatePjOpen, setIsCreatePjOpen] = useState(false);
  const openCreatePj = () => {
    setIsCreatePjOpen(true);
  };
  const closeCreatePj = () => {
    setIsCreatePjOpen(false);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NavBar></NavBar>
      </Grid>
      <Grid item container spacing={2}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="flex-start"
          xs={2}
        >
          <SideBar></SideBar>
        </Grid>
        <Grid item container xs={10}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <SearchBox></SearchBox>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={2}
          >
            <OpenButton onClick={openCreatePj} children="新建项目"></OpenButton>
            {isCreatePjOpen && <CreatePj onClose={closeCreatePj} />}
          </Grid>
          <Grid item xs={12}>
            <DataTable></DataTable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MainPage;
