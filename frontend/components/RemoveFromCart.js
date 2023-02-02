import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

export default function RemoveFromCart({ id }) {
  return (
    <BigButton type="button" title="Remove this item from Cart">
      &times;
    </BigButton>
  );
}
