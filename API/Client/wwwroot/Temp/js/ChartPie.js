 // CHART PIE
var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
        type: "donut",
        toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
            },
            export: {
                csv: {
                    filename: "Grafik-Dummy",
                    columnDelimiter: ',',
                    headerCategory: 'Dummy',
                    headerValue: 'Value',
                    dateFormatter(timestamp) {
                        return new Date(timestamp).toDateString()
                    }
                },
                svg: {
                    filename: "Grafik-Dummy",
                },
                png: {
                    filename: "Grafik-Dummy",
                }
            },
            autoSelected: 'zoom'
        },
    },
   
};

var chart = new ApexCharts(document.querySelector("#Chart"), options);
chart.render();



/*$(document).ready(function () {
    $('#UChart').ApexCharts({
       
       
    })
})
function eExcel() {
    var dataEmployee = $('#UChart').ApexCharts
    dataEmployee.buttons('excel:name').trigger();
}*/



$(document).ready(function () {
    var jumlah = [];
    var label = [];
    $.ajax({
        url: "https://localhost:44384/API/Universities/university",
        success: function (result) {
            console.log(result.result);
            var data = result.result.length;
            for (var i = 0; i < data; i++) {
                jumlah.push(result.result[i].value);
                label.push(result.result[i].universityId);
            }
        }
    })
    var options = {

        breakpoint: 300,
        chart: {
            height: 200,
            type: 'donut'
        },
        series: jumlah,
        labels: label,
        theme: {
            palette: 'palette5'
        },
        chart: {
            type: "donut",
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export: {
                    csv: {
                        filename: "Grafik-University",
                        columnDelimiter: ',',
                        headerCategory: 'University',
                        headerValue: 'Value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: "Grafik-University",
                    },
                    png: {
                        filename: "Grafik-University",
                    }
                },
                autoSelected: 'zoom'
            },
        },
    }
    var chart = new ApexCharts(document.querySelector("#UChart"), options);
    chart.render();
});

$(document).ready(function () {
    var jml = [];
    var lbl = [];
    $.ajax({
        url: "https://localhost:44384/API/Employees/Gender",
        success: function (result) {
            console.log(result.result);
            var data = result.result.length;
            for (var i = 0; i < data; i++) {
                jml.push(result.result[i].value);
                if (result.result[i].gender === 0) {
                    lbl.push("Male");
                } else
                {
                    lbl.push("Female");
                }

            }
        }
    })
    var options = {
        chart: {
            height: 200,
            type: 'donut'
        },
        series: jml,
        labels: lbl,
        theme: {
            palette: 'palette2'
        },
        chart: {
            type: "donut",
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true | '<img src="/static/icons/reset.png" width="20">',
                    customIcons: []
                },
                export: {
                    csv: {
                        filename: "Grafik-Gender",
                        columnDelimiter: ',',
                        headerCategory: 'Gender',
                        headerValue: 'Value',
                        dateFormatter(timestamp) {
                            return new Date(timestamp).toDateString()
                        }
                    },
                    svg: {
                        filename: "Grafik-Gender",
                    },
                    png: {
                        filename: "Grafik-Gender",
                    }
                },
                autoSelected: 'zoom'
            },
        },
    }
    var chart = new ApexCharts(document.querySelector("#GChart"), options);
    chart.render();
})




/*chart: {
       type:"pie",
       toolbar: [{
           show: true,
           offsetX: 0,
           offsetY: 0,
           tools: {
               download: true,
               selection: true,
               zoom: true,
               zoomin: true,
               zoomout: true,
               pan: true,
               reset: true | '<img src="/static/icons/reset.png" width="20">',
               customIcons: []
           },
           export: {
               csv: {
                   filename: undefined,
                   columnDelimiter: ',',
                   headerCategory: 'category',
                   headerValue: 'value',
                   dateFormatter(timestamp) {
                       return new Date(timestamp).toDateString()
                   }
               },
               svg: {
                   filename: undefined,
               },
               png: {
                   filename: undefined,
               }
           },
           autoSelected: 'zoom'
       }],
   },*/