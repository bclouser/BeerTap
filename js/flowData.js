var d = new Date();
var io = require('socket.io-client')
var socket = io.connect('http://localhost:6000', {reconnect: true})
var Chart = require('chart.js')
var renderer = require('electron').ipcRenderer
var ounceCountVisible = false;
var timeSinceLastUpdate;
var timeIdleToHideOunces = 1000

var showHideOunces = function(show){

}

$(function() {
    console.log('Adding connect listener');

    // Add a connect listener
    socket.on('connect', function(socket) { 
        console.log('Connected!');
        //socket.emit("Ben says hi");
    });

    renderer.on('flowSensorData', (event, message) => {
        var currentPouredOz = parseFloat($(".container .active-flow-reading .ounces").text());
        //console.log("currentPouredOz = " + currentPouredOz);
        currentPouredOz = currentPouredOz+message.latestOz;
        //console.log("currentPouredOz = " + currentPouredOz);
        $(".container .active-flow-reading .ounces").text(currentPouredOz.toFixed(2));
        //$(".container .clock .minutes").text(d.getMinutes())
        //$(".container .clock .meridiem").text(meridiem)
        timeSinceLastUpdate = new Date();
        console.log("\n\n=== updating time. timeSinceLastUpdate = " + timeSinceLastUpdate);
        if(!ounceCountVisible){
            ounceCountVisible = true;
            console.log("First time through, setting the ounceCount to be visible");
            $(".container .row.active-flow-reading div.reading").animate({
                fontSize: 100,
                },
                300, function() {
                    // kick off timout check to see if we should hide the ounces.
                    setTimeout(maybeHideOunces, 300);
                }
            );
        }
    })

    var maybeHideOunces = function(){
        // Has it been at least 1 second since we received any ounces update
        // CODE
        var now = new Date();
        console.log("timeSinceLastUpdate:");
        console.log(timeSinceLastUpdate);
        console.log("now");
        console.log(now);
        var milliseconds = now-timeSinceLastUpdate;
        console.log("milliseconds = " + milliseconds)
        // Yes, hide ounces
        if(milliseconds >= timeIdleToHideOunces){
            console.log('Hiding ounces');
            $(".container .row.active-flow-reading div.reading").animate({
                fontSize: 0,
                },
                500, function() {
                    // when anmition done, set to false
                    ounceCountVisible = false;
                }
            );
        }
        else{
            //console.log("Hasn't been a second yet");
            // Not yet. Try again in 300 seconds
            setTimeout(maybeHideOunces, 300);
        }
    }

    $('.back').click(function(){
        window.location = "index.html"
    });

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["June", "July", "August", "September"],
            datasets: [{
                label: 'Beer Consumed By Month',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(104, 99, 206, 0.5)',
                    'rgba(76, 192, 83, 0.7)', // green2
                    'rgba(3, 169, 244, 0.7)', // blue
                    'rgba(255, 149, 0, 0.7)',
                    'rgba(255, 211, 0, 0.7)',
                    'rgba(255, 111, 0, 0.7)',

                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(0, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(104, 99, 206, 1)',
                    'rgba(76, 192, 83, 1)',
                    'rgba(3, 169, 244, 1)',
                    'rgba(255, 149, 0, 1)',
                    'rgba(255, 211, 0, 1)',
                    'rgba(255, 111, 0, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            /*
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            */
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'white',
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontColor: 'white',
                        labelString: 'oz'

                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'white',
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        fontColor: 'white',
                        labelString: 'Month'
                    }
                }]
            }
        }
    });
});




