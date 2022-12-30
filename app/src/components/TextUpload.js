import { Input, Button } from "antd";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import TextAreaField from "../common/TextArea";
import API from "../core/http/api";
import QRCode from "react-qr-code";

const { TextArea } = Input;

const TextUpload = () => {
  const [value, setValue] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [response, setReponse] = useState(null);
  return (
    <>
      <Formik
        initialValues={{
          content: "",
          pin: "",
        }}
        onSubmit={async (values) => {
          console.debug(values);
          setLoadingState(true);
          const response = await API({
            method: "post",
            url: "file/create",
            data: values,
          });
          console.debug(response);
          setReponse(response);
          setLoadingState(false);
          // alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="content">Message</label>
          <Field
            id="content"
            name="content"
            placeholder="Type your text here..."
            component={TextAreaField}
          />
          {loadingState && <h2>Loading</h2>}
          <Field id="pin" name="pin" placeholder="Type a random PIN code." />
          {response?.data && (
            <img
              src={`${response?.data?.dataImage}`}
              alt="qr code for the data"
            />
          )}
          <Button htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </>
  );
};

export default TextUpload;
