var currentTime = moment();
var timeColor;

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

        if (currentTime.hour() > i) {
            timeColor = 'past';
        } else if (currentTime.hour() < i) {
            timeColor = 'future';
        } else {
            timeColor = 'present';
        }

        $('.container').append(`
        <div class="row justify-content-center">
            <div class="col-1 d-flex align-items-center justify-content-center hour">${hour}</div>
            <textarea id="hour-${i}" class="col-10 ${timeColor}"></textarea>
            <div class="col-1 d-flex align-items-center justify-content-center saveBtn"><i class="fa fa-save"></i></div>
        </div>
        `
        )
    }
}

function pageInit() {
    renderTimeBlock();
    if ((JSON.parse(localStorage.getItem('scheduled'))) !== null) {
        var schedLoad = JSON.parse(localStorage.getItem('scheduled'));

        for (i = 0; i < schedLoad.length; i++) {
            $('#'+schedLoad[i].schedHour).val(schedLoad[i].schedText);
        }
    } else { }
}

pageInit();

$('.saveBtn').on('click', (event) => {
    var scheduled = [];

    if ((JSON.parse(localStorage.getItem('scheduled'))) !== null) {
        scheduled = JSON.parse(localStorage.getItem('scheduled'));
    } else { }

    if (scheduled.length !== 0) {
        if (scheduled.find(sched => sched.schedHour === event.currentTarget.previousElementSibling.id) !== undefined) {
            scheduled.find(sched => sched.schedHour === event.currentTarget.previousElementSibling.id).schedText = ($('#' + event.currentTarget.previousElementSibling.id).val());
        } else if (scheduled.find(sched => sched.schedHour === event.currentTarget.previousElementSibling.id) === undefined) {
            scheduled.push({
                schedHour: (event.currentTarget.previousElementSibling.id),
                schedText: ($('#'+event.currentTarget.previousElementSibling.id).val())
            });
        }
    } else {
        scheduled.push({
            schedHour: (event.currentTarget.previousElementSibling.id),
            schedText: ($('#'+event.currentTarget.previousElementSibling.id).val())
        });
    }

    localStorage.setItem('scheduled', JSON.stringify(scheduled));
});