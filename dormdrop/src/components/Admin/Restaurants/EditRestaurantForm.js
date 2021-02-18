import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import styled from "styled-components";
import { db, storage, updateRestaurant } from "../../../firebase/firebase";
import { FiUpload } from "react-icons/fi";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
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
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
`;

const FormHeadingContainer = styled.div``;

const FormHeading = styled.h3``;

const Form = styled.form``;

const TextFieldContainer = styled.div`
  margin: 20px auto;
`;

const TextFieldLabel = styled.div`
  margin-bottom: 10px;
`;

const AddRestaurantContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddRestaurantHeading = styled.div`
  padding-top: 10px;
`;

const AddIconContainer = styled.div``;

const NewRestaurantContainer = styled.div``;

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

const OrderFormPropertiesContainer = styled.div`
  margin-top: 10px;
`;

const UploadImageInput = styled.input`
  display: none;
`;

const Button = styled.button`
  border-radius: 20px;
  width: 100%;
  border: none;
  display: flex;
  background: #3ab44b;
  color: white;
  padding: 15px 30px;
  margin-right: 10px;
  text-decoration: none;
  :hover {
    cursor: pointer;
    background: #3ab44bcc;
  }
`;

const formFields = [
  "Customer Name",
  "Order Number",
  "Include Drink",
  "Utensils",
  "Include Sauces",
  "Additional Instructions",
];

export default function RestaurantForm({ open, setOpen, restaurant }) {
  const [displayName, setDisplayName] = useState(restaurant.data.displayName);
  const [restaurants, setRestaurants] = useState(restaurant.data.restaurants);
  const [price, setPrice] = useState(restaurant.data.price);
  const [maxOrders, setMaxOrders] = useState(restaurant.data.maxOrders);
  const [instructions, setInstructions] = useState(
    restaurant.data.instructions
  );
  const [campusRegion, setCampusRegion] = useState(
    restaurant.data.campusRegion
  );
  const [image, setImage] = useState(null);
  const [imageSRC, setImageSRC] = useState(restaurant.data.imageURL);
  const [formProperties, setFormProperties] = useState(
    restaurant.data.formProperties
  );
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

  setTimeout(() => {
    setCampusRegion(restaurant.data.campusRegion);
  }, 1000);

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
    if (image !== null) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                displayName,
                restaurants,
                price,
                maxOrders,
                instructions,
                campusRegion,
                formProperties,
                imageURL: url,
                imageRef: `images/${image.name}`,
              };
              updateRestaurant(restaurant.id, data);
              handleClose();
            });
        }
      );
    } else {
      const data = {
        displayName,
        restaurants,
        price: Number(price),
        maxOrders: Number(maxOrders),
        instructions,
        campusRegion,
        formProperties,
        imageURL: restaurant.data.imageURL,
        imageRef: restaurant.data.imageRef,
      };
      updateRestaurant(restaurant.id, data);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCampusRegion("");
    setImage(null);
    setImageSRC(null);
  };

  const addRestaurant = () => {
    setRestaurants([...restaurants, ""]);
  };

  const editRestaurant = (index, text) => {
    let copy = [...restaurants];
    if (index !== -1) {
      copy[index] = text;
    }
    console.log(copy);
    setRestaurants(copy);
  };

  const removeRestaurant = (index) => {
    let copy = [...restaurants];
    if (index !== -1) {
      copy.splice(index, 1);
    }
    console.log(copy);
    setRestaurants(copy);
  };

  const handleFormPropertyChange = (event) => {
    const properties = event.target.value;
    setFormProperties(properties);
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
            <FormHeadingContainer>
              <FormHeading>Edit Delivery Option</FormHeading>
            </FormHeadingContainer>
            <Form onSubmit={handleSubmit}>
              <TextFieldContainer>
                <TextFieldLabel>Display Name</TextFieldLabel>
                <TextField
                  value={displayName}
                  variant="outlined"
                  onChange={(event) => {
                    setDisplayName(event.target.value);
                  }}
                  fullWidth
                  helperText="Name that will be displayed as heading of card to users."
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <AddRestaurantContainer>
                  <AddRestaurantHeading>Restaurants</AddRestaurantHeading>
                  <AddIconContainer>
                    <IconButton onClick={addRestaurant}>
                      <AddIcon style={{ fill: "green" }} />
                    </IconButton>
                  </AddIconContainer>
                </AddRestaurantContainer>
                <NewRestaurantContainer>
                  {restaurants.map((restaurant, index) => {
                    return (
                      <Restaurant
                        index={index}
                        restaurant={restaurant}
                        editRestaurant={editRestaurant}
                        removeRestaurant={removeRestaurant}
                      />
                    );
                  })}
                </NewRestaurantContainer>
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Instructions</TextFieldLabel>
                <TextField
                  value={instructions}
                  variant="outlined"
                  onChange={(event) => {
                    setInstructions(event.target.value);
                  }}
                  fullWidth
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Price</TextFieldLabel>
                <TextField
                  type="number"
                  value={price}
                  variant="outlined"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Max Orders</TextFieldLabel>
                <TextField
                  type="number"
                  helperText="Maximum number of orders that can be stacked."
                  value={maxOrders}
                  variant="outlined"
                  onChange={(event) => {
                    setMaxOrders(event.target.value);
                  }}
                />
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Campus Region</TextFieldLabel>
                <FormControl fullWidth>
                  <Select
                    value={campusRegion}
                    onChange={(event) => {
                      setCampusRegion(event.target.value);
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {regions.map((region) => {
                      return (
                        <MenuItem value={region.data.name} key={region.id}>
                          {region.data.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </TextFieldContainer>
              <TextFieldContainer>
                <TextFieldLabel>Order Form Properties</TextFieldLabel>
                <FormControl fullWidth>
                  <Select
                    multiple
                    value={formProperties}
                    onChange={handleFormPropertyChange}
                    input={<Input />}
                  >
                    {formFields.map((field, index) => (
                      <MenuItem key={index} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    Make sure the order of the selected fields follows how you
                    them to be displayed on website.
                  </FormHelperText>
                </FormControl>
              </TextFieldContainer>
              <TextFieldContainer>
                Selected Fields
                <OrderFormPropertiesContainer>
                  {formProperties.map((field, index) => {
                    return <FieldRow index={index} field={field} key={index} />;
                  })}
                </OrderFormPropertiesContainer>
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
              <TextFieldContainer>
                <Button type="submit">Save Restaurant</Button>
              </TextFieldContainer>
            </Form>
          </FormContainer>
        </ContentWrapper>
      </ModalContainer>
    </Modal>
  );
}

const OrderFormFieldContainer = styled.div`
  margin-bottom: 10px;
`;

const FormFieldNameContainer = styled.div``;

function FieldRow({ index, field }) {
  return (
    <OrderFormFieldContainer>
      <FormFieldNameContainer>
        {index + 1}. {field}
      </FormFieldNameContainer>
    </OrderFormFieldContainer>
  );
}

const RestaurantContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RemoveRestaurantButtonContainer = styled.div``;

function Restaurant({ index, restaurant, editRestaurant, removeRestaurant }) {
  const handleChange = (event) => {
    editRestaurant(index, event.target.value);
  };

  const handleDelete = () => {
    removeRestaurant(index);
  };
  return (
    <RestaurantContainer>
      <div>
        <TextField
          variant="outlined"
          placeholder="Restaurant Name"
          value={restaurant}
          onChange={handleChange}
          helperText={`Restaurant #${index + 1}`}
        />
      </div>
      <RemoveRestaurantButtonContainer>
        <IconButton onClick={handleDelete}>
          <RemoveIcon style={{ fill: "red" }} />
        </IconButton>
      </RemoveRestaurantButtonContainer>
    </RestaurantContainer>
  );
}
