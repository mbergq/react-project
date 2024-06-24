import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import {
  StyledGrid,
  StyledWrapperLeft,
  StyledImage,
  ErrorMsg,
  StyledButton,
} from "../styled-components/Gallery.styled";
import {
  StyledText,
  StyledHeader,
} from "../styled-components/TextColor.styled";
import { Spinner } from "../styled-components/Spinner.styled";
import SomeContext from "../SomeContext";

const url = "https://api.harvardartmuseums.org/image?";

function Gallery() {
  const user = useContext(SomeContext);
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
        <StyledHeader>Jump to a page</StyledHeader>

        <Formik
          initialValues={{ name: "" }}
          validate={(values) => {
            setInputValue(values.name);
            const errors = {};
            let numbers = /^[0-9]+$/;
            if (!values.name.match(numbers) && values.name !== "") {
              errors.name = "Invalid entry, can only contain numbers";
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
              {info && (
                <StyledButton
                  type="submit"
                  disabled={
                    isSubmitting || inputValue > info.pages || inputValue === ""
                  }
                >
                  Go
                </StyledButton>
              )}
            </Form>
          )}
        </Formik>
        {info && (
          <StyledButton
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </StyledButton>
        )}
        {info && (
          <StyledButton
            disabled={pageNumber === info.pages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </StyledButton>
        )}
        {info && (
          <StyledText>
            Page: {info.page} / {info.pages}
          </StyledText>
        )}
        {info ? (
          <StyledText>Response time: {info.responsetime}</StyledText>
        ) : (
          <Spinner />
        )}
        <StyledText $fontStyle="italic" $colorOpac="#ffffff80">
          User: {user}
        </StyledText>
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
