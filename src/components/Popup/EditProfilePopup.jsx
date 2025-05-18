import React, { useState, useEffect } from "react";
import "./EditProfilePopup.scss";
import { useUserStore } from "../../store/userStore";
import UserService from "../../service/UserService";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";
import Popup from "../Popup/Popup";
import Button from "../Button/Buttons";

const formSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "The name must have at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "The surname must have at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "The password must have at least 6 characters" }),
});

const EditProfilePopup = ({ isProfileMenuOpen, handleCloseProfileClick }) => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "/assets/images/profile-avatar-image.png"
  );

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset } = methods;

  const userDataFromStore = useUserStore((state) => state.userData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getCurrentUser();
        console.log("Të dhënat e përdoruesit nga API:", response.data);

        if (response.data) {
          setUserData({
            firstName: response.data.data.firstName || "",
            lastName: response.data.data.lastName || "",
            email: response.data.data.email || "",
            username: response.data.data.username || "",
          });

          useUserStore.getState().setUserData({
            id: response.data.data.id,
          });
          reset({
            firstname: response.data.data.firstName || "",
            lastname: response.data.data.lastName || "",
            password: "",
          });
        }
      } catch (error) {
        console.error(
          "Gabim gjatë marrjes së të dhënave të përdoruesit:",
          error.message
        );
      }
    };

    fetchUser();
  }, [reset]);

  useEffect(() => {
    if (isEditProfilePopupOpen) {
      reset({
        firstname: userData.firstName,
        lastname: userData.lastName,
        password: "",
      });
    }
  }, [isEditProfilePopupOpen, userData, reset]);

  useEffect(() => {
    console.log("Gjendja e përditësuar e userData:", userData);
  }, [userData]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleCloseEditProfileClick = () => {
    setIsEditProfilePopupOpen(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarDataUrl = reader.result;
        setAvatar(avatarDataUrl);
        localStorage.setItem("avatar", avatarDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const [user, setUser] = useState({});
  const [serverError, setServerError] = useState("");

  const handleAcceptChanges = async (data) => {
    const userId = userDataFromStore.id;

    console.log("Password që po dërgohet:", data.password);

    if (data.password !== user.password) {
    } else {
      setServerError("The password is incorrect!");
      return;
    }

    const updateUserData = {
      firstName: data.firstname,
      lastName: data.lastname,
      password: data.password || user.password,
    };

    try {
      const response = await UserService.updateCurrentUser(
        userId,
        updateUserData
      );

      if (response.status === 200) {
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          password: response.data.password,
        });

        setUserData((prevUserData) => ({
          ...prevUserData,
          firstName: data.firstname,
          lastName: data.lastname,
        }));

        reset();
        setServerError("");
        handleCloseEditProfileClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isProfileMenuOpen && (
        <div className="profile-menu">
          <div className="profile-image">
            <img
              className="close-profile"
              src="/assets/images/x.png"
              alt="Close"
              onClick={handleCloseProfileClick}
            />
            <div className="profile-avatar-container">
              <img className="profile-avatar" src={avatar} alt="Avatar" />
              <div className="profile-name-username">
                <h3>
                  {userData.firstName} {userData.lastName}
                </h3>
                <p>Username: {userData.username}</p>
              </div>
            </div>
          </div>
          <div className="profile-container">
            <div className="profile-buttons">
              <Button
                variant="solid"
                size="medium"
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </Button>
              <Button variant="solid" size="medium">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  id="avatar-input"
                />
                <label htmlFor="avatar-input" style={{ cursor: "pointer" }}>
                  Change Avatar
                </label>
              </Button>
            </div>
            <div className="your-tasks">
              <div className="your-tasks-heading">
                <h4>Your Tasks</h4>
              </div>
              <div className="search-tasks">
                <input
                  type="text"
                  name="search-tasks"
                  id="search-tasks"
                  placeholder="Search Task..."
                />

                <i className="fi fi-rr-search"></i>
              </div>
              <div className="profile-tasks">
                <div
                  className="task-heading"
                  onClick={() => toggleSection("brochure")}
                >
                  <h5>Brochure products</h5>
                  <img
                    src={`/assets/images/chevron-${
                      openSections["brochure"] ? "up" : "down"
                    }.png`}
                    alt=""
                  />
                </div>
                {openSections["brochure"] && (
                  <div className="profile-task-container">
                    <div className="profile-task">
                      <h6>Verify Water Meter</h6>
                      <p>Set up your first party</p>
                    </div>
                    <div className="profile-task">
                      <h6>Install Cabinets</h6>
                      <p>Get set on autoship</p>
                    </div>
                    <div className="profile-task">
                      <h6>Electric Underground</h6>
                      <p>Learn how to master your communication skills</p>
                    </div>
                    <div className="profile-task">
                      <h6>Pad Certification</h6>
                      <p>Complete the Compensation Plan Quiz</p>
                    </div>
                  </div>
                )}
                <div
                  className="task-heading"
                  onClick={() => toggleSection("treatment")}
                >
                  <h5>Treatment</h5>
                  <img
                    src={`/assets/images/chevron-${
                      openSections["treatment"] ? "up" : "down"
                    }.png`}
                    alt=""
                  />
                </div>
                {openSections["treatment"] && (
                  <div className="profile-task-container">
                    <div className="profile-task">
                      <h6>Final Check</h6>
                      <p>Create new brand styleguide</p>
                    </div>
                  </div>
                )}

                <div
                  className="task-heading"
                  onClick={() => toggleSection("windexing")}
                >
                  <h5>Windexing mirrors</h5>
                  <img
                    src={`/assets/images/chevron-${
                      openSections["windexing"] ? "up" : "down"
                    }.png`}
                    alt=""
                  />
                </div>

                <div
                  className="task-heading"
                  id="task-heading"
                  onClick={() => toggleSection("quarterly")}
                >
                  <h5>Quarterly report tasklist</h5>
                  <img
                    src={`/assets/images/chevron-${
                      openSections["quarterly"] ? "up" : "down"
                    }.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditProfilePopupOpen && (
        <FormProvider {...methods}>
          <Popup
            title="Edit Profile"
            onSubmit={handleSubmit(handleAcceptChanges)}
            onClose={handleCloseEditProfileClick}
            btnName1="Accept changes"
            btnName2="Cancel"
          >
            <InputField label="First Name" type="text" name="firstname" />
            <InputField label="Last Name" type="text" name="lastname" />
            <InputField label="Password" type="password" name="password" />
            {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          </Popup>
        </FormProvider>
      )}
    </>
  );
};

export default EditProfilePopup;
