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

    db.ref().on("child_added", function (snapshot) {
        console.log(snapshot);
        console.log(snapshot.val());
        $("#table").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().dest}</td>
            <td>${snapshot.val().freq}</td>
            <td>${snapshot.val().first}</td>
            <td>${snapshot.val().first}</td>
            <!--
            <td>{moment.unix(snapshot.val().next).format("HH:mm")}</td>
            <td>{moment.unix(snapshot.val().next, "minutes")}</td>
            <td>{snapshot.val().next * moment.unix(snapshot.val().start, "months")}</td>
            -->
        </tr>
        `);
    });

    $("#submit").on("click", function (event) {
        console.log(event);
        event.preventDefault();

        db.ref().push({
            name: $("#name").val(),
            dest: $("#dest").val(),
            freq: $("#freq").val(),
            first: moment($("#first").val(), "HH:mm").format("X")
        });

        $("#name").val("");
        $("#dest").val("");
        $("#freq").val("");
        $("#first").val("");
    });

    console.log(moment().format("MM/DD/YYYY hh:mm:ss"));


});