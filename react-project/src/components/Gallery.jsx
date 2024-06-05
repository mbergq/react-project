import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { StyledGrid } from "../styled-components/Grid.styled";
import { StyledImage } from "../styled-components/Image.styled";
import { StyledWrapperLeft } from "../styled-components/LeftColWrap.styled";
import {
  StyledText,
  StyledHeader,
} from "../styled-components/TextColor.styled";
import { StyledButton } from "../styled-components/Button.styled";
import { Spinner } from "../styled-components/Spinner.styled";
import { ErrorMsg } from "../styled-components/ErrorMsg.styled";
import SomeContext from "../SomeContext";

const url = "https://api.harvardartmuseums.org/image?";

function Gallery() {
  const header = useContext(SomeContext);
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [pageNumber, setPageNumber] = useOutletContext(); //useContext

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
      <StyledWrapperLeft>
        <StyledHeader>{header}</StyledHeader>
        <Formik
          initialValues={{ name: "" }}
          validate={(values) => {
            setInputValue(values.name);
            const errors = {};
            let numbers = /^[0-9]+$/;
            if (!values.name.match(numbers) && values.name !== "") {
              errors.name = "Invalid entry, must be only numbers";
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
              <ErrorMessage name="name" component={ErrorMsg} />
              <StyledButton
                type="submit"
                disabled={
                  isSubmitting || inputValue > 3878 || inputValue === ""
                }
              >
                Go
              </StyledButton>
            </Form>
          )}
        </Formik>
        <StyledButton
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </StyledButton>
        <StyledButton
          disabled={pageNumber === 3878}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </StyledButton>

        {info ? (
          <StyledText>
            Page: {info.page} / {info.pages}
          </StyledText>
        ) : (
          <Spinner />
        )}
        {info ? (
          <StyledText>Response time: {info.responsetime}</StyledText>
        ) : (
          <Spinner />
        )}
      </StyledWrapperLeft>
      <StyledGrid>
        {data !== null &&
          data.map((object) => (
            <div key={object.id}>
              <Link to={`${object.id}`}>
                <StyledImage src={object.baseimageurl}></StyledImage>
              </Link>
            </div>
          ))}
      </StyledGrid>
    </>
  );
}

export default Gallery;
