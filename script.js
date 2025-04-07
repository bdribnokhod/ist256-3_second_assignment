$(document).ready(function() {
    console.log("JQuery is ready!");

    let TimeStart, TimeStop;
    let $BUTTON = document.getElementById("BUTTON")
    let $TIMER = document.getElementById("TIMER")
    let $DISPLAY = document.getElementById("DISPLAY")
    const GOAL = 3;
    let Attempts = [];
    let AttemptNum = 1;

    let Chart = new Morris.Bar( {
        element: 'CHART',
        data: [],
        xkey: 'Attempt',
        ykeys: ['Time'],
        labels: ['Time'],
        barColors: function (row, series, type) {
            if (row.y === GOAL) {
                return "#014d00";
            }
            else if (Math.abs(row.y - GOAL) <= 0.2) {
                return "#2849b5";
            }
            else if (Math.abs(row.y - GOAL) <= 0.5) {
                return "#fcb900";
            }
            else {
                return "#ab0000";
            }
        },
        resize: true,
        hideHover: 'auto'
    });

    $BUTTON.addEventListener("click",
        function (format, data){
            if (this.value === "START") {
                TimeStart = new Date();
                this.value = "STOP";
                $TIMER.innerText=("");
            } else {
                TimeStop = new Date();
                let Time = (TimeStop - TimeStart) / 1000;
                this.value = "START";
                $TIMER.innerText=("Time: " + Time + " seconds");
                let Diff = Math.abs(Time - GOAL);
                if (Diff === 0) {
                    $DISPLAY.style.backgroundColor = "#014d00";
                }
                else if (Diff <= 0.2) {
                    $DISPLAY.style.backgroundColor = "#2849b5";
                }
                else if (Diff <= 0.5)
                    $DISPLAY.style.backgroundColor = "#fcb900";
                else {
                    $DISPLAY.style.backgroundColor = "#ab0000";
                }
                Attempts.push({ Attempt: "Attempt " + AttemptNum, Time: Time + " seconds" });
                AttemptNum++;

                Chart.setData(Attempts, data);
            }
    });
});