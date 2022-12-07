function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function currentTime() {
    var date = new Date();
    var hourHand = (date.getHours() * (360 / 24))
    var minuteHand = (date.getMinutes() * (360 / 60))

    var optsHours = {
        cx: 100,
        cy: 100,
        radius: 100,
        start_angle: 0,
        end_angle: hourHand,
    };
    var optsMinutes = {
        cx: 100,
        cy: 100,
        radius: 100,
        start_angle: 0,
        end_angle: minuteHand,
    };
    var startD = polarToCartesian(optsHours.cx, optsHours.cy, optsHours.radius, optsHours.end_angle),
        endD = polarToCartesian(optsHours.cx, optsHours.cy, optsHours.radius, optsHours.start_angle),
        largeArcFlagD = optsHours.end_angle - optsHours.start_angle <= 180 ? "0" : "1";

    var hours = [
        "M", startD.x, startD.y,
        "A", optsHours.radius, optsHours.radius, 0, largeArcFlagD, 0, endD.x, endD.y,
        "L", optsHours.cx, optsHours.cy,
        "Z"
    ].join(" ");

    var startM = polarToCartesian(optsMinutes.cx, optsMinutes.cy, optsMinutes.radius, optsMinutes.end_angle),
        endM = polarToCartesian(optsMinutes.cx, optsMinutes.cy, optsMinutes.radius, optsMinutes.start_angle),
        largeArcFlagM = optsMinutes.end_angle - optsMinutes.start_angle <= 180 ? "0" : "1";

    var minutes = [
        "M", startM.x, startM.y,
        "A", optsMinutes.radius, optsMinutes.radius, 0, largeArcFlagM, 0, endM.x, endM.y,
        "L", optsMinutes.cx, optsMinutes.cy,
        "Z"
    ].join(" ");

    document.getElementById("hours").setAttribute("d", hours);
    document.getElementById("minutes").setAttribute("d", minutes);
    let t = setTimeout(function () { currentTime() }, 45000);
}
currentTime()