import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  padding-top: 4rem;

  .new-btn {
    padding: 0.6rem 4rem;
    width: max-content;
    border-radius: 5px;
    background: var(--text-title);

    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;

    span {
      color: #fff;
    }

    &:hover {
      filter: opacity(0.9);
    }
  }
`;
