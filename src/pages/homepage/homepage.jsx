import React from "react";
import { HomePageContainer } from "./homepage-styles";
import Directory from "../../components/directory-menu/directory-menu";

const HomePage = () => {
  return (
    <HomePageContainer className="homepage">
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
