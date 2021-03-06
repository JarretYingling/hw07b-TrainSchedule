// javascript

$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBVh68jn0Wqnu0aZ-s7ZPT3H1g3x_YN89U",
        authDomain: "trainschedule-f8f9b.firebaseapp.com",
        databaseURL: "https://trainschedule-f8f9b.firebaseio.com",
        projectId: "trainschedule-f8f9b",
        storageBucket: "trainschedule-f8f9b.appspot.com",
        messagingSenderId: "262720693940"
    }

    firebase.initializeApp(config);

    var db = firebase.database();

    let timeFormat = "ddd, MMM DD @ hh:mm A";
    let width = $(window).width();
    switch (width < 768) {
        case true:
            timeFormat = "ddd hh:mma";
    }

    function calcNextTrainTime(trainTime, trainFreq) {
        console.log(trainTime, trainFreq);
        while (moment(trainTime).isBefore(moment().unix())) {
            trainTime = moment.unix(trainTime).add(trainFreq, "minutes").unix();
        }
        return trainTime;
    }

    db.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());
        let nextTrainTime = calcNextTrainTime(snapshot.val().first, snapshot.val().freq);
        $("#table").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().dest}</td>
            <td>${snapshot.val().freq}</td>
            <td>${moment.unix(nextTrainTime).format(timeFormat)}</td>
            <td>${moment.unix(nextTrainTime).fromNow()}</td>
        </tr>
        `);
    });

    setInterval(function () {
        db.ref().once("value", function (snapshot) {
            console.log(snapshot.val());
            $("#table").empty();
            snapshot.forEach(element => {
                console.log(element);
                let nextTrainTime = calcNextTrainTime(element.val().first, element.val().freq);
                $("#table").append(`
                    <tr>
                        <td>${element.val().name}</td>
                        <td>${element.val().dest}</td>
                        <td>${element.val().freq}</td>
                        <td>${moment.unix(nextTrainTime).format(timeFormat)}</td>
                        <td>${moment.unix(nextTrainTime).fromNow()}</td>
                    </tr>
                `);
            });
        });
    }, 60000);

    $("#submit").on("click", function (event) {
        console.log(event);
        event.preventDefault();

        db.ref().push({
            name: $("#name").val(),
            dest: $("#dest").val(),
            freq: $("#freq").val(),
            first: moment($("#first").val(), "HH:mm").unix()
        });

        $("#name").val("");
        $("#dest").val("");
        $("#freq").val("");
        $("#first").val("");
    });

    $("#restore").on("click", function (event) {
        console.log(event);
        event.preventDefault();
        $("#table").empty();
        initializeTrains();
    });

    function initializeTrains() {
        db.ref().set("");
        console.log(moment().unix());

        db.ref().push({
            name: "Trenton Express",
            dest: "Trenton",
            freq: 25,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 0,
                'minute': 15,
                'second': 0,
                'millisecond': 0
            }).unix()
        });

        db.ref().push({
            name: "Oregon Trail",
            dest: "Salem, Oregon",
            freq: 3600,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 1,
                'minute': 39,
                'second': 0,
                'millisecond': 0
            }).unix()
        });

        db.ref().push({
            name: "Midnight Carriage",
            dest: "Philadelphia",
            freq: 15,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 0,
                'minute': 5,
                'second': 0,
                'millisecond': 0
            }).unix()
        });

        db.ref().push({
            name: "Sing Sing Caravan",
            dest: "Atlanta",
            freq: 45,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 0,
                'minute': 38,
                'second': 0,
                'millisecond': 0
            }).unix()
        });

        db.ref().push({
            name: "Boston Bus",
            dest: "Boston",
            freq: 65,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 0,
                'minute': 20,
                'second': 0,
                'millisecond': 0
            }).unix()
        });

        db.ref().push({
            name: "California Caravan",
            dest: "San Francisco",
            freq: 6000,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 1,
                'minute': 25,
                'second': 0,
                'millisecond': 0
            }).unix()
        });

        db.ref().push({
            name: "Analben's Train",
            dest: "Florida",
            freq: 25,
            first: moment().set({
                'year': 2019,
                'month': 0,
                'date': 11,
                'hour': 0,
                'minute': 08,
                'second': 0,
                'millisecond': 0
            }).unix()
        });
    }

    let px = 200
    $("#track").animate({
        left: px + "px"
    }, 15000, function () {
        //complete
    });


});