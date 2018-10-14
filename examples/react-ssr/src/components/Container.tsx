import styled from 'styled-components';

export const Container = styled.div`
  padding-right: 24px;
  padding-left: 24px;

  @media (min-width: 576px) {
    margin-right: auto;
    margin-left: auto;
    padding-right: 0;
    padding-left: 0;
    width: 540px;
  }

  @media (min-width: 768px) {
    width: 720px;
  }
`;
