
import * as Highcharts from 'highcharts';

export function createGraph(data: number[], container: string){
    Highcharts.chart(container, {

        title: {
            text: 'Public support'
        },
    
        yAxis: {
            title:{ enabled: false },
            labels:{ enabled: false },
            min: 0,
            max: 100
        },

        xAxis: {
            categories: ['2021', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            min: 0,
            max: 4
        },
    
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y}%'
                },
                enableMouseTracking: false
            }
        },
    
        series: [{
            data: data,
        }],

        credits: {
            enabled: false
        },
        
        legend: {
            enabled: false
        },
    
    });
}