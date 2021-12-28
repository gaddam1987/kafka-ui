import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import ClusterContext from 'components/contexts/ClusterContext';
import List from 'components/Schemas/List/List';
import { ThemeProvider } from 'styled-components';
import theme from 'theme/theme';

import { schemas } from './fixtures';

describe('List', () => {
  describe('View', () => {
    const pathname = `/ui/clusters/clusterName/schemas`;

    const setupWrapper = (props = {}) => (
      <ThemeProvider theme={theme}>
        <StaticRouter location={{ pathname }} context={{}}>
          <List
            isFetching
            fetchSchemasByClusterName={jest.fn()}
            isGlobalSchemaCompatibilityLevelFetched
            fetchGlobalSchemaCompatibilityLevel={jest.fn()}
            updateGlobalSchemaCompatibilityLevel={jest.fn()}
            schemas={[]}
            {...props}
          />
        </StaticRouter>
      </ThemeProvider>
    );

    describe('Initial state', () => {
      let useEffect: jest.SpyInstance<
        void,
        [effect: React.EffectCallback, deps?: React.DependencyList | undefined]
      >;
      const mockedFn = jest.fn();

      const mockedUseEffect = () => {
        useEffect.mockImplementationOnce(mockedFn);
      };

      beforeEach(() => {
        useEffect = jest.spyOn(React, 'useEffect');
        mockedUseEffect();
      });

      it('should call fetchSchemasByClusterName every render', () => {
        mount(setupWrapper({ fetchSchemasByClusterName: mockedFn }));
        expect(mockedFn).toHaveBeenCalled();
      });
    });

    describe('when fetching', () => {
      it('renders PageLoader', () => {
        const wrapper = mount(setupWrapper({ isFetching: true }));
        expect(wrapper.exists('thead')).toBeFalsy();
        expect(wrapper.exists('ListItem')).toBeFalsy();
        expect(wrapper.exists('PageLoader')).toBeTruthy();
      });
    });

    describe('without schemas', () => {
      it('renders table heading without ListItem', () => {
        const wrapper = mount(setupWrapper({ isFetching: false }));
        expect(wrapper.exists('thead')).toBeTruthy();
        expect(wrapper.exists('ListItem')).toBeFalsy();
      });
    });

    describe('with schemas', () => {
      const wrapper = mount(setupWrapper({ isFetching: false, schemas }));

      it('renders table heading with ListItem', () => {
        expect(wrapper.exists('thead')).toBeTruthy();
        expect(wrapper.find('ListItem').length).toEqual(3);
      });
    });

    describe('with readonly cluster', () => {
      const wrapper = mount(
        <StaticRouter>
          <ClusterContext.Provider
            value={{
              isReadOnly: true,
              hasKafkaConnectConfigured: true,
              hasSchemaRegistryConfigured: true,
              isTopicDeletionAllowed: true,
            }}
          >
            {setupWrapper({ schemas: [] })}
          </ClusterContext.Provider>
        </StaticRouter>
      );
      it('does not render Create Schema button', () => {
        expect(wrapper.exists('NavLink')).toBeFalsy();
      });
    });
  });
});
