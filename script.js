var currentTime = moment();
// var container = $('.container');

// Render formatted date
$('#currentDay').text(currentTime.format("dddd, MMMM Do"));

function renderTimeBlock() {
    for (var i = 9; i <= 17; i++) {
        var hour;
        if (i < 12) {
            hour = (i + 'AM')
        } else if (i > 12) {
            hour = ((i - 12) + 'PM')
        } else {
            hour = '12PM'
        }
        $('.container').append(`
        <div class="row justify-content-md-center">
            <div class="col-1 hour">${hour}</div>
            <textarea id="hour-${i}" class="col-10"></textarea>
            <div class="col-1 saveBtn">Save</div>
        </div>
        `
        )
    }
}

renderTimeBlock();