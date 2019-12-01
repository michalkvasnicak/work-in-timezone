import { DesignSystem } from '@byteclaw/visage';
import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { theme, availableTimezoneAbbrs } from './config';
import { NotFound, Timezones } from './pages';

const timezones = availableTimezoneAbbrs.join('|');
// this one is really stupid but path-to-regexp does not support groups so I wasn't able to write
// normal ([0-1][0-9]|2[0-3]):[0-5][0-9]
const offset = '[+-]?\\d{2}:[0-5][0-9]';

export function App() {
  return (
    <DesignSystem theme={theme}>
      <Helmet titleTemplate="%s | Available in timezone" />
      <Switch>
        <Route exact path="/" component={Timezones} />
        <Route
          exact
          path={`/work-in-timezone/:timezone(${timezones})`}
          component={Timezones}
        />
        <Route
          exact
          path={`/work-in-timezone/:timezone(${timezones})/:offsetStart(${offset})-:offsetEnd(${offset})`}
          component={Timezones}
        />
        <Route component={NotFound} />
      </Switch>
    </DesignSystem>
  );
}
