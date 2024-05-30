import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import axios from "axios";
const url = "https://api.harvardartmuseums.org/image?";

const Image = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(0, 6vw);
  grid-gap: 15px;
`;
const GridWrapper = styled.div`
  max-width: 60%;
`;
const Div = styled.div`
  border: solid 1px black;
`;
function Test() {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fetchData = async () => {
    try {
      //fetch api-key from local json file
      const response = await fetch("../apikey.json");
      const json = await response.json();
      //fetch the array of data needed and put it into state
      return axios
        .get(`${url}apikey=${json.apikey}&size=100&page=${pageNumber}`)
        .then((response) => {
          console.log(response.data.records);
          setData(response.data.records);
          console.log("Fetch is done..");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  return (
    <>
      <h2>Go to a page</h2>
      <Div>
        <Formik
          initialValues={{ name: "" }}
          validate={(values) => {
            const errors = {};
            let numbers = /^[0-9]+$/;
            if (!values.name.match(numbers) && values.name !== "") {
              errors.name = "Must be a number";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.name);
            setPageNumber(values.name);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="name" name="name" />

              <ErrorMessage name="name" component="p" />

              <button type="submit" disabled={isSubmitting}>
                Go
              </button>
            </Form>
          )}
        </Formik>
      </Div>
      <GridWrapper>
        <Grid>
          {data !== null &&
            data.map((object) => (
              <Image key={object.id} src={object.baseimageurl}></Image>
            ))}
        </Grid>
      </GridWrapper>
    </>
  );
}

export default Test;
