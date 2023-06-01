import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import world from '../../../api/world.topo.json';
import useOrdersStore from 'store/ordersStore';
import { ISalesStat } from '@types';

const initOptions = (data: ISalesStat[]) => {
  return {
    chart: {
      map: world,
      backgroundColor: '#2e2e2e',
      style: {
        // fontFamily: 'serif',
        stroke: '#90CDF4'
      }
    },
    title: {
      text: 'Sales Map',
      align: 'left',
      style: {
        // fontFamily: 'serif',
        fontSize: '1em',
        fontWeight: '300',
        color: '#90CDF4'
      }
    },
    // subtitle: {
    //   text:
    //     'Source: <a href="https://github.com/trainline-eu/stations">' +
    //     'github.com/trainline-eu/stations</a>',
    //   align: 'left'
    // },
    mapNavigation: {
      enabled: true
    },
    // zoom germany
    mapView: {
      projection: {
        name: 'WebMercator'
      },
      center: [10, 50],
      zoom: 5
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.city}</b><br>{point.z}'
    },
    colorAxis: {
      min: 0,
      max: 200
    },
    plotOptions: {
      mappoint: {
        cluster: {
          enabled: true,
          allowOverlap: false,
          animation: {
            duration: 450
          },
          layoutAlgorithm: {
            type: 'grid',
            gridSize: 70
          },
          zones: [
            {
              from: 1,
              to: 4,
              marker: {
                radius: 13
              }
            },
            {
              from: 5,
              to: 9,
              marker: {
                radius: 15
              }
            },
            {
              from: 10,
              to: 15,
              marker: {
                radius: 17
              }
            },
            {
              from: 16,
              to: 20,
              marker: {
                radius: 19
              }
            },
            {
              from: 21,
              to: 100,
              marker: {
                radius: 21
              }
            }
          ]
        }
      }
    },
    series: [
      {
        name: 'World',
        accessibility: {
          exposeAsGroupOnly: true
        },
        // borderColor: 'darkgray',

        nullColor: 'gray',
        showInLegend: false
      },
      {
        type: 'mappoint',
        enableMouseTracking: true,
        accessibility: {
          point: {
            descriptionFormatter: function (point: any) {
              if (point.isCluster) {
                return 'Grouping of ' + point.clusterPointsAmount + ' points.';
              }
              return point.name + ', country code: ' + point.country + '.';
            }
          }
        },
        colorKey: 'clusterPointsAmount',
        name: 'Cities',
        // joinBy: null,
        data: data,
        color: 'dodgerblue',
        marker: {
          lineWidth: 1,
          lineColor: '#fff',
          symbol: 'mapmarker',
          radius: 8
        },
        dataLabels: {
          verticalAlign: 'top'
        }
      }
    ]
  };
};

const SalesMap = () => {
  const salesStat = useOrdersStore(state => state.ordersData?.salesStat);
  const [options, setoptions] = useState<any>(null);

  useEffect(() => {
    if (salesStat) {
      setoptions(initOptions(salesStat));
    }
  }, [salesStat]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType={'mapChart'} />
    </div>
  );
};

export default SalesMap;
