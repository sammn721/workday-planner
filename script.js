var currentTime = moment();
var timeColor;

$('#currentDay').text(currentTime.format("dddd, MMMM Do"));

function renderTimeBlock() {
    for (var i = 9; i <= 23; i++) {
        var hour;
        if (i < 12) {
            hour = (i + 'AM')
        } else if (i > 12) {
            hour = ((i - 12) + 'PM')
        } else {
            hour = '12PM'
        }

        if (currentTime.hour() > i) {
            timeColor = 'past';
        } else if (currentTime.hour() < i) {
            timeColor = 'future';
        } else {
            timeColor = 'present';
        }

        $('.container').append(`
        <div class="row justify-content-md-center">
            <div class="col-1 hour">${hour}</div>
            <textarea id="hour-${i}" class="col-10 ${timeColor}"></textarea>
            <div class="col-1 saveBtn">Save</div>
        </div>
        `
        )
    }
}

function pageInit() {
    renderTimeBlock();

}

pageInit();
