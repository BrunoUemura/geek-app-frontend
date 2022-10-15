import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;

  width: 100%;

  background: var(--text-title);
  color: #fff;

  a {
    color: #fff;
    padding: 5px 10px;
    text-decoration: none;
    margin-right: 2rem;

    &:hover {
      filter: brightness(0.6);
    }
  }
`;
