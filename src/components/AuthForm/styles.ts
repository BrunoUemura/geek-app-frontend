import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  background: #ffffff;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

  min-width: 350px;
  min-height: 450px;

  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 5px;
    background: #f0f2f5;

    input {
      display: flex;
      padding-left: 5px;
    }
  }

  button {
    width: 90%;
    padding: 10px 0;
    border: none;
    background: var(--text-title);
    color: #ffffff;

    &:hover {
      filter: opacity(0.9);
    }
  }
`;
