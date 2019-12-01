import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

interface TimezoneMapProps {
  offsetStart?: number;
  offsetEnd?: number;
}

function TimezoneMapComponent({ offsetEnd, offsetStart }: TimezoneMapProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      style={{ maxHeight: '100%', maxWidth: '100%' }}
    >
      <ZoomableGroup>
        <Geographies
          pointerEvents="none"
          geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
        >
          {({ geographies }) =>
            geographies.map(geo => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="none"
                  stroke="#ddd"
                  strokeWidth={1}
                  tabIndex={-1}
                />
              );
            })
          }
        </Geographies>
        <Geographies geography="https://gist.githubusercontent.com/mbostock/f0ae25cf1f057d443ca903277e3eb330/raw/254996390d4e19ef5eb1429103e0138ad08e19d0/timezones.json">
          {({ geographies }) =>
            geographies.map(
              (geo: {
                rsmKey: string;
                svgPath: string;
                properties: { zone: number; time_zone: string };
              }) => {
                const isSelected =
                  offsetStart != null && offsetEnd != null
                    ? offsetStart <= geo.properties.zone &&
                      offsetEnd >= geo.properties.zone
                    : false;

                return (
                  <path
                    d={geo.svgPath}
                    data-timezone={geo.properties.zone}
                    key={geo.rsmKey}
                    fill={isSelected ? 'green' : 'none'}
                    fillOpacity={0.1}
                    stroke={isSelected ? 'green' : '#ccc'}
                    strokeOpacity={0.1}
                    strokeWidth={1}
                  >
                    <title>{geo.properties.time_zone}</title>
                  </path>
                );
              },
            )
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}

export const TimezoneMap = React.memo(TimezoneMapComponent);
