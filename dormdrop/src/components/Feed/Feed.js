import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OptionCard from "./OptionCard";
import styled from "styled-components";
import { db } from "../../firebase/firebase";
import { sortOptions } from "../../utils/index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    maxWidth: 1300,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
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

const SectionHeading = styled.h1`
  font-size: 25px;
  margin-top: 0;
  margin-bottom: 10px;
  border-left: 5px solid #3ab44b;
  padding-left: 10px;
`;

const SectionSubheading = styled.div`
  color: gray;
  font-weight: 500;
  font-size: 13px;
`;

const NoneAvailable = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px auto;
`;

export default function Feed({ addToCart }) {
  const classes = useStyles();
  const [activeOptions, setActiveOptions] = useState([]);
  const [inactiveOptions, setInactiveOptions] = useState([]);

  const ref = db.collection("restaurants");

  useEffect(() => {
    const getRestaurants = () => {
      ref.onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, data: doc.data() });
        });
        const { active, inactive } = sortOptions(items);
        setActiveOptions(active);
        setInactiveOptions(inactive);
      });
    };
    getRestaurants();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1} className={classes.content}>
          <Grid item xs={12}>
            <SectionHeadingContainer>
              <SectionHeading>Delivery Options - Available now</SectionHeading>
              <SectionSubheading>
                Select from the following options. You can selected up to the
                specified number of orders.
              </SectionSubheading>
            </SectionHeadingContainer>
          </Grid>
          {activeOptions.length === 0 ? (
            <NoneAvailable>No options are currently available</NoneAvailable>
          ) : (
            ""
          )}
          {activeOptions.map((option, index) => {
            console.log(option);
            return (
              <OptionCard
                Details={option}
                addToCart={addToCart}
                active={true}
              />
            );
          })}
        </Grid>
        <Grid container spacing={2} className={classes.content}>
          <Grid item xs={12}>
            <SectionHeadingContainer>
              <SectionHeading>Delivery Options - Available Later</SectionHeading>
              <SectionSubheading>
                These options will be available later.
              </SectionSubheading>
            </SectionHeadingContainer>
          </Grid>
          {inactiveOptions.map((option, index) => {
            console.log(option);
            return (
              <OptionCard
                Details={option}
                addToCart={addToCart}
                active={false}
              />
            );
          })}
        </Grid>
      </div>
    </>
  );
}
