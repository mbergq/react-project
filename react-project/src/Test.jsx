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
  max-width: 20%;
`;
function Test() {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
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
    fetchData();
  }, [pageNumber]);

  return (
    <>
      <h2>Go to a page</h2>
      <Div>
        <Formik
          initialValues={{ name: "" }}
          validate={(values) => {
            setInputValue(values.name);
            const errors = {};
            let numbers = /^[0-9]+$/;
            if (!values.name.match(numbers) && values.name !== "") {
              errors.name = "Must be a number";
            } else if (values.name * 1 > 3878) {
              errors.name = "There are 3878 pages, please enter a lower number";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            //multiply string with 1 to turn it into number data-type
            setPageNumber(values.name * 1);
            values.name = "";
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="name" name="name" />
              <button
                type="submit"
                disabled={
                  isSubmitting || inputValue > 3878 || inputValue === ""
                }
              >
                Go
              </button>
              <ErrorMessage name="name" component="p" />
            </Form>
          )}
        </Formik>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>
        <button
          disabled={pageNumber === 3878}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
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
