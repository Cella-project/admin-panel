import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const notFoundTextAnimation = keyframes`
  0% {
    transform: translateX(-50%);
  }

  50% {
    transform: translateX(50%);
  }

  100% {
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.darkmode ? "#18191a" : "#f5f3fc")};
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  text-shadow: ${(props) =>
    props.darkmode ? "2px 2px 3px rgba($color: #000, $alpha: 0.5)" : "2px 2px 3px rgba($color: #737373, $alpha: 0.25)"};
  color: #ff3636;
  text-align: center;
  margin-bottom: 0;
`;

const Subtitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => (props.darkmode ? "#fefefe" : "#737373")};
  text-shadow: ${(props) =>
    props.darkmode ? "2px 2px 3px rgba($color: #000, $alpha: 0.5)" : "2px 2px 3px rgba($color: #737373, $alpha: 0.25)"};
  text-align: center;
  margin-top: 0;
  animation: ${notFoundTextAnimation} 4s ease-in-out infinite;
`;

const StyledButton = styled(Link)`
  background-color: ${(props) => (props.darkmode ? "#d14e0d" : "#d14e0d")};
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  padding: 1rem 2rem;
  margin-top: 3rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  text-shadow: ${(props) =>
    props.darkmode ? "2px 2px 3px rgba($color: #000, $alpha: 0.5)" : "2px 2px 3px rgba($color: #737373, $alpha: 0.25)"};

  &:hover {
    background-color: ${(props) => (props.darkmode ? "#d14e0d" : "#d14e0d")};
    color: ${(props) => (props.darkmode ? "#fff" : "#fff")};
    transform: scale(1.1);
  }
}`;

const NotFound = () => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Container darkmode={mode === "dark-mode"}>
      <Title darkmode={mode === "dark-mode"}>404</Title>
      <Subtitle darkmode={mode === "dark-mode"}>Page not found</Subtitle>
      <StyledButton to="/admin-panel/" darkmode={mode === "dark-mode"}>
        Go back to Home
      </StyledButton>
    </Container>
  );
};

export default NotFound;
