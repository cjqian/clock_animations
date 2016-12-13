/************************************************
 * Helper functions
 ***********************************************/

// Initialization
var sequenceArray = [];
var sequenceIdx = -1;

var width = 312;
var height = 390;

var centerPosition = new paper.Point(width / 2, height / 2);
var interval = 150;

var currentPath = null;
var globalPath = GetNewPath();
globalPath.visible = false;

var globalPosition = new paper.Point(width / 2, height * 1 / 4);
for (var count = 288; count >= 0; count--)
{
	var angle = count * 5;
	var length = angle / 150;

	var vector = new paper.Point({
		angle: angle,
		length: length
	});

	vector.y = vector.y * -1;

	var rot= vector.rotate(90);
	rot.length = 2;
	globalPath.add(globalPosition  - vector + rot);
	globalPath.insert(0, globalPosition + vector - rot);
	globalPath.smooth();
	globalPosition += vector;
}

// Main area
var globalInstance = null;

// Returns a clean path in our desired style
function GetNewPath()
{
	var newPath = new paper.Path(
	{
		fillColor: 'white',
		strokeWidth: 100
	});

	newPath.strokeWidth = 1000;
	return newPath;
}

var fastInterval = .0001;

function Animate(curPath, beginOffset) {
	if (curPath.segments.length >= globalPath.segments.length) return;
	if (curPath.segments.length > globalPath.segments.length / 3)
	{
		// Potentially terminate
		if (Math.random() < .05) return;
	}

	var offset = (curPath.segments.length / 2) + Math.floor(beginOffset);
	var center = globalPath.segments.length / 2;
	var leftIdx = center - offset - 1;
	var rightIdx = center + offset;
	curPath.add(globalPath.segments[leftIdx]);
	curPath.insert(0, globalPath.segments[rightIdx]);
	curPath.smooth();

	setTimeout(function() { return Animate(curPath, beginOffset); }, interval);
}


/********************************************************************************
 * Keyboard functions
 **********************************************************************/
 /*
 function handleScrollUp()
 {
 	console.log("Up called with " + sequenceIdx);
 	if (sequenceIdx <= 0) return;

 	var difference = sequenceArray.length - sequenceIdx;
	// 1 sequence ago
	if (difference == 1)
	{
		$('#text-div').text("1 sequence ago");
	} 
	else 
	{
		$('#text-div').text(difference + " sequences ago");
	}

	sequenceIdx--;
	transitionInstances(sequenceIdx + 1, sequenceIdx);
}

function handleScrollDown()
{
	console.log("Called down with " + sequenceIdx);
	if (sequenceIdx >= sequenceArray.length - 1) return;
	sequenceIdx++;
	console.log("lnegth " + sequenceArray.length);
	var difference = sequenceArray.length - sequenceIdx - 1;
	// 1 sequence ago
	if (difference == 0)
	{
		$('#text-div').text("");
	} 
	else if (difference == 1)
	{
		$('#text-div').text("1 sequence ago");
	}
	else 
	{
		$('#text-div').text(difference + " sequences ago");
	}

	transitionInstances(sequenceIdx - 1, sequenceIdx);
}

*/
$(document).keypress(function(e) {
	console.log(e.keyCode);

	// Change speed intervals
	if (e.keyCode == 49)
	{
		interval = 150;
	}

	if (e.keyCode == 50)
	{
		interval = 10;
	}

	if (e.keyCode == 51)
	{
		interval = .00000001;
	}
/*
	// Handle key settings
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
*/
	// Generate new day
	if (e.keyCode == 13)
	{
		if (currentPath != null) currentPath.visible = false;
		sequenceArray.push(currentPath);

		$('#text-div').text("");
		currentPath = GetNewPath();
		Animate(currentPath, Math.random() * 100);
	}
});