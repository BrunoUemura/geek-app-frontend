import styled from "styled-components";

export const Container = styled.div`
  background: var(--shape);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;

  padding: 1rem;
  margin-bottom: 1rem;

  .listDetail {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  .detail-indicator {
    font-size: 0.9rem;
    color: var(--text-title);
  }

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
  }

  .rightColumn {
    width: 5%;

    a {
      text-decoration: none;
    }

    .edit-btn {
      color: #11ad20;

      &:hover {
        color: #0e8f1b;
      }
    }

    .remove-btn {
      color: #b01212;

      &:hover {
        color: #6b0c0c;
      }
    }
  }
`;
