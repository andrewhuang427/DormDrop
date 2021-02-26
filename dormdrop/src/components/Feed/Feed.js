import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider"
import OptionCard from "./OptionCard";
import styled from "styled-components";
import { db } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    maxWidth: 1000,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const SectionHeadingContainer = styled.div`
  margin-bottom: 10px;
`;

const SectionHeading = styled.h3`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 5px;
`;

const SectionSubheading = styled.div`
  color: #8d8d8d;
`;

export default function Feed() {
  const classes = useStyles();
  const [deliverOptions, setDeliveryOptions] = useState([]);

  const ref = db.collection("restaurants");

  useEffect(() => {
    const getRestaurants = () => {
      ref.onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, data: doc.data() });
        });
        setDeliveryOptions(items);
      });
    };
    getRestaurants();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={12}>
          <SectionHeadingContainer>
            <SectionHeading>Available Now</SectionHeading>
            <SectionSubheading>
              Select from the following options. You can selected up to the
              specified number of orders.
            </SectionSubheading>
          </SectionHeadingContainer>
          <Divider />
        </Grid>
        {deliverOptions.map((option, index) => {
          console.log(option);
          return (
            <Grid item xs={12} sm={4}>
              <OptionCard key={index} Details={option} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
