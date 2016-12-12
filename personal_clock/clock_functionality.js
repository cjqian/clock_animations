/************************************************
 * Helper functions
 ***********************************************/

function growToSize(instance, targetLength)
{

	var length = instance.path.segments.length;

	console.log("Growing to size " + targetLength + ", currently " + length);
	if (instance.path.segments.length >= targetLength) return;

	instance.offset++;
	instance.count--;

	var angle = instance.count * 5;
	var length = angle / 150;

	var vector = new paper.Point({
		angle: angle,
		length: length
	});

	vector.y = vector.y * -1;

	var rot= vector.rotate(90);
	rot.length = 2;
	instance.path.add(instance.position  - vector + rot);
	instance.path.insert(0, instance.position + vector - rot);
	instance.path.smooth();

	instance.position += vector;

	setTimeout(function() { return growToSize(instance, targetLength); }, interval);
}

function grow(instance) {
	console.log("growing spiral" + instance);
	if (instance.count < 0 || instance.offset > instance.end) return;

	instance.offset++;
	instance.count--;

	var angle = instance.count * 5;
	var length = angle / 150;

	var vector = new paper.Point({
		angle: angle,
		length: length
	});

	vector.y = vector.y * -1;

	if (instance.offset > instance.begin && instance.offset < instance.end)
	{
		var rot= vector.rotate(90);
		rot.length = 2;
		instance.path.add(instance.position  - vector + rot);
		instance.path.insert(0, instance.position + vector - rot);
		instance.path.smooth();
	}

	instance.position += vector;

	if (instance.offset < instance.end)
	{
		setTimeout(function() { return grow(instance); }, interval);
	} 
}

 function shrinkToSize(instance, targetLength)
{
	var length = instance.path.segments.length;
	console.log("Shrinking to size " + targetLength + ", currently " + length);
	if (length <= targetLength) return;
	instance.path.removeSegment(length - 1);
	instance.path.removeSegment(0);
	setTimeout(function() { return shrinkToSize(instance, targetLength); }, interval);
}

function deleteSpiral(instance) {
	instance.path.removeSegments(0, instance.path.segments.length);
}

function rotateToAngle(instance, rotation)
{
	if (rotation == 0) return;
	if (rotation < 1)
	{
		instance.path.rotate(-1);
		setTimeout(function() { return rotateToAngle(instance, rotation + 1)}, interval);
	}
	else{
		instance.path.rotate(1);
		setTimeout(function() { return rotateToAngle(instance, rotation - 1)}, interval);	
	}
}



function transitionInstances(current, target)
{
	console.log("translating");
	console.log(current);

	// Change the length of the path
	if (current.path.segments.length > target.path.segments.length)
	{
		shrinkToSize(current, target.path.segments.length);
	}

	if (current.path.segments.length < target.path.segments.length)
	{
		growToSize(current, target.path.segments.length);
	}

	console.log(target);

// Rotate the copy to match the start
rotateToAngle(current, (target.begin - current.begin) * 5);
}



// Returns a clean path in our desired style
function GetNewPath()
{
	var spiralPath = new paper.Path(
	{
		fillColor: 'white',
		strokeWidth: 100
	});

	spiralPath.strokeWidth = 100;
	return spiralPath;
}

// Creates a new time with randomized start and endpoints
function CreateInstance()
{
	var beginOffset = parseInt(Math.random() * 80);
	var endOffset = parseInt(beginOffset + 48 + (Math.random() * 200));
	var currentPosition = new paper.Point(width / 2, height * 1 / 4);

	var instance = 
	{
		path: GetNewPath(), 
		begin: beginOffset,
		end: endOffset,
		position: currentPosition,
		offset: 0,
		count: 288
	};

	return instance;
}

// Initialization
var sequenceArray = [];
var sequenceIdx = -1;

var width = 312;
var height = 390;

var centerPosition = new paper.Point(width / 2, height / 2);

var initialInterval = 1000;
var interval = initialInterval;

// Main area
var globalInstance = null;

/********************************************************************************
 * Keyboard functions
 **********************************************************************/
function handleScrollUp()
{
	console.log("Handle scroll up. " + sequenceIdx);
	sequenceIdx = sequenceArray.length - 1;
	if (sequenceIdx <= 0) return;

	transitionInstances(sequenceArray[sequenceIdx], sequenceArray[sequenceIdx - 1]);
	sequenceIdx = -1;
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
		}
	});
});

// Asking for a new day
$( "button, input, a" ).click( function( event ) {
	if (globalInstance != null) globalInstance.path.visible = false;
	globalInstance = CreateInstance();
	grow(globalInstance);
	sequenceArray.push(globalInstance);
} );

$(document).keypress(function(e) {
// w, up arrow
console.log(e.keyCode);
if (e.keyCode == 119)
{
	handleScrollUp();
}

if (e.keyCode == 115)
{
	handleScrollDown();
}

if (e.keyCode == 32)
{
	handleKeyPress();
}
});
