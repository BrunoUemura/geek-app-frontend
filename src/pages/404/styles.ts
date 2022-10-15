import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
  background: #0c0e29;

  img {
    width: 350px;
    height: 350px;
    margin-bottom: 2rem;
  }

  h1,
  h2 {
    color: #fff;
  }
`;
