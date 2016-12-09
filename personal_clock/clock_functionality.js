// Initialization
var width = 312;
var height = 390;

var centerPosition = new paper.Point(width / 2, height / 2);
var spiralPath = new paper.Path(
{
	fillColor: 'white',
	strokeWidth: 100
});
spiralPath.strokeWidth = 100;
console.log(spiralPath.strokeWidth);

var initialInterval = 1000;
var interval = initialInterval;
var count = getTimeAngle();
//var count = 20;	

/*
Angle: 1410, Length: 9.4, Addved Vector: { x: 105.55968, y: 97.06123 }
VM609:42 Angle: 1415, Length: 9.433333333333334, Addved Vector: { x: 114.12466, y: 93.06647 }
VM609:42 Angle: 1420, Length: 9.466666666666667, Addved Vector: { x: 123.03654, y: 89.822 }
VM609:65 New interval 1000
VM609:42 Angle: 1425, Length: 9.5, Addved Vector: { x: 132.22947, y: 87.35798 }
VM609:42 Angle: 1430, Length: 9.533333333333333, Addved Vector: { x: 141.63501, y: 85.69875 }
VM609:42 Angle: 1435, Length: 9.566666666666666, Addved Vector: { x: 151.18257, y: 84.86269 }
VM609:42 Angle: 1440, Length: 9.6, Addved Vector: { x: 160.8, y: 84.86193 }
VM609:42 Angle: 1445, Length: 9.633333333333333, Addved Vector: { x: 170.41411, y: 85.70229 }
VM609:42 Angle: 1450, Length: 9.666666666666666, Addved Vector: { x: 179.95121, y: 87.38316 }
*/

function getTimeAngle() {
	var now = new Date();

	var curSeconds = (now.getHours * 3600) + (now.getMinutes() * 60) + (now.getSeconds());
	var totalSeconds = 86400;
	var angleSeconds = curSeconds / totalSeconds;

	var angle = angleSeconds * 360 / 5;
	console.log(angle);
	return angle;
}

function growSpiral() {
	if (count < 0) return;

	count++;

	var angle = count * 5;
	var length = count / 30;

	/*
	console.log("Angle: " + angle);
	console.log("Length: " + length);
	*/
	//console.log(count);
	var vector = new paper.Point({
		angle: angle,
		length: length
	});

	var rot = vector.rotate(90);
	rot.length = .2;


	var addedVector = centerPosition + vector - rot;
	console.log("Angle: " + angle + ", Length: " + length + ", Addved Vector: " + addedVector);
	spiralPath.add(centerPosition + vector - rot);
	spiralPath.insert(0, centerPosition + vector + rot);
	//console.log(centerPosition);
	centerPosition += vector;
	spiralPath.smooth();

	setTimeout(growSpiral, interval);
}

$(document).ready(function()
{  
	var initialValue = 1;
	$("#time-value").text(initialValue); 
	$("#time-slider").slider(
	{
		min:1,
		max:100000,
		value:initialValue,
		slide:function(event,ui) 
		{
			$("#time-value").text(ui.value);
			interval = initialInterval * (1 / ui.value);
			console.log("New interval " + interval);
		}
	});
});

// Main area
growSpiral();