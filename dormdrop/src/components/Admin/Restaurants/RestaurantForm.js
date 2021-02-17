import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import { db, storage, createRestaurant } from "../../../firebase/firebase";
import { FiUpload } from "react-icons/fi";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  width: 1060px;
  height: 600px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 600px;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContainer = styled.div`
  width: 460px;
  padding: 20px;
`;

const Form = styled.form``;

const TextFieldContainer = styled.div`
  margin: 20px auto;
`;

const TextFieldLabel = styled.div`
  margin-bottom: 20px;
`;

const UploadContainer = styled.div`
  margin: 30px auto;
`;

const UploadLabel = styled.label`
  cursor: pointer;
  border-radius: 20px;
  padding: 10px;
  background: white;
  outline: none;
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  :hover {
    background: #f8f8f8;
  }
`;

const IconSpan = styled.span`
  margin-right: 10px;
  margin-left: 5px;
`;

const UploadImageInput = styled.input`
  display: none;
`;

export default function RestaurantForm({ open, setOpen }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [campusRegion, setCampusRegion] = useState("");
  const [image, setImage] = useState(null);
  const [imageSRC, setImageSRC] = useState(null);
  const [regions, setRegions] = useState([]);

  const regionRef = db.collection("campusRegions");

  const getRegions = () => {
    regionRef.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, data: doc.data() });
      });
      console.log(items);
      setRegions(items);
    });
  };

  useEffect(() => {
    getRegions();
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageSRC(url);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " % done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            const data = {
              name,
              campusRegion,
              description,
              imageURL: url,
              imageRef: `images/${image.name}`,
            };
            createRestaurant(data);
            handleClose();
          });
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setCampusRegion("");
    setImage(null);
    setImageSRC(null);
  };

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <ModalContainer>
        <ContentWrapper>
          <ImageContainer>
            <Image src={imageSRC} />
          </ImageContainer>
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <TextFieldContainer>
                <TextFieldLabel>Restaurant Name</TextFieldLabel>
                <TextField
                  value={name}
                  variant="outlined"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  fullWidth
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Restaurant Description</TextFieldLabel>
                <TextField
                  value={description}
                  variant="outlined"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  fullWidth
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Campus Region</TextFieldLabel>
                <FormControl fullWidth>
                  <Select
                    labelId="region-select-label"
                    value={campusRegion}
                    onChange={(event) => {
                      setCampusRegion(event.target.value);
                    }}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {regions.map((region, index) => {
                      return (
                        <MenuItem value={region.data.name} key={index}>
                          {region.data.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </TextFieldContainer>
              <TextFieldContainer>
                <UploadContainer>
                  <UploadLabel for="file-upload">
                    <IconSpan>
                      <FiUpload />
                    </IconSpan>
                    Upload Image
                  </UploadLabel>
                  <UploadImageInput
                    id="file-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                </UploadContainer>
              </TextFieldContainer>
              <Button autoFocus type="submit" color="primary">
                Save Changes
              </Button>
            </Form>
          </FormContainer>
        </ContentWrapper>
      </ModalContainer>
    </Modal>
  );
}
