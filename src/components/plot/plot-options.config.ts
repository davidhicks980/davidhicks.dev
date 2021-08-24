import { ChartConfiguration, ChartOptions } from 'chart.js';

export function plotOptions(
  coordinates: { x: number; y: number }[],
  canvas: HTMLCanvasElement,
  color: string,
  highlight: string
) {
  const gradient = canvas.getContext('2d')?.createLinearGradient(0, 1000, 0, 0);
  // Add two color stops
  gradient?.addColorStop(0.75, 'rgba(255,255,255,0)');
  gradient?.addColorStop(1, highlight);
  const ticks = {
    font: { color: 'rgb(90,90,90)', family: 'IBM Plex Sans', size: 14 },
    maxTicksLimit: 10,
    padding: 2,
    precision: 0.5,
    color: 'rgb(90,90,90)',
  };
  const gridLines = {
    tickLength: 5,
    lineWidth: 1.3,
    display: true,
  };
  const title = (text: string) => {
    return {
      display: true,
      text,
      font: {
        size: 14,
        color: 'rgb(50,50,50)',
      },
      padding: { top: 3, bottom: 3 },
    };
  };
  return {
    type: 'line',
    data: {
      labels: ['x', 'y'],
      datasets: [
        {
          label: 'Dataset',
          data: coordinates,
          spanGaps: true,
          fill: {
            target: 'origin',
            below: gradient,
          },
        },
      ],
    },
    options: {
      parsing: false,
      normalized: true,
      responsive: true,
      resizeDelay: 100,
      animation: {
        duration: 0, // general animation time
      },
      plugins: {
        tooltip: {
          enabled: false,
        },
        legend: {
          display: false,
        },
      },
      elements: {
        line: {
          tension: 0, // disables bezier curves
          backgroundColor: gradient,
          borderJoinStyle: 'round',
          borderColor: color,
          borderWidth: 2,
        },

        point: {
          radius: 0, //hide points
        },
      },
      aspectRatio: 1.5,
      maintainAspectRatio: false,
      devicePixelRatio: 2.3,

      layout: {
        padding: {
          left: 5,
        },
      },

      scales: {
        y: {
          title: title('Concentration'),
          axis: 'y',
          weight: 2,
          type: 'linear',
          gridLines,
          ticks,
        },
        x: {
          title: title('Time(hours)'),
          position: 'bottom',
          axis: 'x',
          weight: 1,
          type: 'linear',
          gridLines,
          ticks,
        },
      },
    } as ChartOptions,
  } as ChartConfiguration;
}
