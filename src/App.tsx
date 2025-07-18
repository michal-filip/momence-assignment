import React from 'react';
import { Layout } from './Layout';
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <Layout>
        <div>
          <h1>Welcome!</h1>
          <p>Start building your currency converter app here.</p>
        </div>
      </Layout>
    </MantineProvider>
  );
};

export default App;
