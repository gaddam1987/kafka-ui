import React from 'react';
import { store } from 'redux/store';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import New from 'components/Schemas/New/New';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/theme';

describe('New', () => {
  describe('View', () => {
    const pathname = '/ui/clusters/clusterName/schemas/create-new';

    const setupWrapper = (props = {}) => (
      <ThemeProvider theme={theme}>
        <StaticRouter location={{ pathname }} context={{}}>
          <New createSchema={jest.fn()} {...props} />
        </StaticRouter>
      </ThemeProvider>
    );

    it('matches snapshot', () => {
      expect(mount(setupWrapper())).toMatchSnapshot();
    });
  });
});
