import {
  AutocompleteInput,
  Button,
  Heading,
  TextInput,
} from '@byteclaw/visage';
import React, { useMemo } from 'react';
import Helmet from 'react-helmet';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { TimezoneMap } from '../components';
import { offsetToHours } from '../helpers';
import { availableTimezoneAbbrs, timezones, timezonesByAbbr } from '../config';

interface Params {
  timezone?: string;
  offsetStart?: string;
  offsetEnd?: string;
}

async function timezonesAutocomplete(filter: string | null) {
  const regex = new RegExp(filter, 'i');

  if (filter) {
    return timezones
      .filter(tz => regex.test(tz.abbr) || regex.test(tz.label))
      .map(tz => tz.abbr);
  }

  return timezones.map(tz => tz.abbr);
}

function timezoneToString(abbr: string | null): string {
  if (!abbr) {
    return '';
  }

  return timezonesByAbbr[abbr].label;
}

function timezoneToValue(abbr: string): string {
  return timezonesByAbbr[abbr].abbr;
}

export function Timezones({
  match: {
    params: { offsetEnd, offsetStart, timezone },
  },
}: RouteComponentProps<Params>) {
  const history = useHistory();
  const tz = useMemo(() => {
    if (!timezone) {
      return null;
    }

    const tzAbbr = timezone.toUpperCase();

    return timezones.find(({ abbr }) => abbr === tzAbbr);
  }, [timezone]);
  const title = !tz
    ? 'Am I eligible to work in timezones?'
    : `Am I eligible to work in timezones ${tz.abbr}${
        offsetStart.startsWith('-') ? offsetStart : `+${offsetStart}`
      } - ${tz.abbr}${
        offsetEnd!.startsWith('-') ? offsetEnd! : `+${offsetEnd!}`
      }?`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <form
        onSubmit={e => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);

          history.push(
            `/${data.get('timezone')}/${data.get('offsetStart')}-${data.get(
              'offsetEnd',
            )}`,
          );
        }}
      >
        <Heading>
          Am I eligible to work in timezone{' '}
          <AutocompleteInput
            aria-label="Timezone"
            defaultValue={tz ? tz.abbr : ''}
            menuProps={{ fullscreen: false }}
            baseProps={{
              styles: { display: 'inline-flex', verticalAlign: 'middle' },
            }}
            name="timezone"
            valueToString={timezoneToValue}
            options={timezonesAutocomplete}
            optionToString={timezoneToString}
            placeholder="Select"
            pattern={`(${availableTimezoneAbbrs.join('|')})`}
            required
          />{' '}
          from{' '}
          <TextInput
            aria-label="Timezone offset start"
            baseProps={{
              styles: { display: 'inline-flex', verticalAlign: 'middle' },
            }}
            defaultValue={offsetStart}
            name="offsetStart"
            pattern="^[-+]?([0-1][0-9]|2[0-3]):[0-5][0-9]$"
            placeholder="00:00"
            required
          />{' '}
          to{' '}
          <TextInput
            aria-label="Timezone offset end"
            baseProps={{
              styles: { display: 'inline-flex', verticalAlign: 'middle' },
            }}
            defaultValue={offsetEnd}
            name="offsetEnd"
            pattern="^[-+]?([0-1][0-9]|2[0-3]):[0-5][0-9]$"
            placeholder="00:00"
            required
          />
          <Button
            styles={{
              visibility: 'hidden',
              position: 'absolute',
              height: 1,
              width: 1,
              overflow: 'hidden',
              clip: 'rect(1px, 1px, 1px, 1px)',
              whiteSpace: 'nowrap',
            }}
            type="submit"
          >
            Set timezone and offsets
          </Button>
          ?
        </Heading>
      </form>
      <TimezoneMap
        offsetStart={
          !tz || !offsetStart
            ? undefined
            : offsetToHours(offsetStart, tz.offset)
        }
        offsetEnd={
          !tz || !offsetEnd ? undefined : offsetToHours(offsetEnd, tz.offset)
        }
      />
    </>
  );
}
