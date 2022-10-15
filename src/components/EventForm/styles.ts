import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  background: #ffffff;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  min-width: 600px;
  min-height: 600px;

  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 5px;

    input {
      display: flex;
      padding: 5px;
      border: 1px solid #e3e3e3;

      &:focus {
        border: 1px solid #5f99f5;
      }
    }
  }

  .btn-container {
    display: flex;
    flex-direction: row;

    button {
      width: 90%;
      padding: 10px 0;
      border: 1 solid var(--text-title);

      &:hover {
        filter: opacity(0.9);
      }
    }

    .theme-one {
      color: var(--text-title);
      border: 1px solid var(--text-title);
    }

    .theme-two {
      background: var(--text-title);
      color: #ffffff;
    }
  }
`;
