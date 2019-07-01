import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

// On this page, open the dev tools and clear everything from the Network and console.
// Then click the 'View Item' link. You will see `item.js` in the network, which is the minimal
// item page bundle; you will then also see the feature.item.js bundle load at the same time
// as the long-running API request.
// Observe the page behavior while this is happening.
// In a real world app, instead of spitting out "I'm loading" text you could for example
// present loading placeholders or some other (lightweight) experience.

export default () => (
  <div>
    <Title>My page</Title>
    <ul>
      <li>
        <Link href="/item">
          <a>View Item</a>
        </Link>
      </li>
    </ul>
  </div>
)
