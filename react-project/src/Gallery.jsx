import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
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
const FormWrapper = styled.div`
  max-width: 20%;
  margin-bottom: 12px;
`;
const InfoWrapper = styled.div`
  max-width: 14%;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

function Gallery() {
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [pageNumber, setPageNumber] = useOutletContext();

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
            console.log(response.data.info);
            setInfo(response.data.info);
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
      <h3>Jump to a page</h3>
      <FormWrapper>
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
      </FormWrapper>
      <InfoWrapper>
        {info ? (
          <p>
            Page {info.page} / {info.pages}
          </p>
        ) : (
          <Spinner />
        )}
        {info ? <p>Response time: {info.responsetime}</p> : <Spinner />}
      </InfoWrapper>
      <GridWrapper>
        <Grid>
          {data !== null &&
            data.map((object) => (
              <div key={object.id}>
                <Link to={`${object.id}`}>
                  <Image src={object.baseimageurl}></Image>
                </Link>
              </div>
            ))}
        </Grid>
      </GridWrapper>
    </>
  );
}

export default Gallery;
