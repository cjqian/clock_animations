		var width = 312;
		var height = 390;

		var count = 0;
		var position = new paper.Point(width / 2, height / 2);
		var spiralPath = new paper.Path();
		spiralPath.fillColor = 'red';
		spiralPath.closed = true;


		function growSpiral() {
			var count = 0;
			count++;
			var vector = new paper.Point();
		/*
		vector.angle = count * 5;
		vector.length = count / 100;
		*/
		/*
		var vector = new paper.Point({
			angle: count * 5,
			length: count / 100
		});

		var rot = vector.rotate(90);
		rot.length = .2;
		path.add(position + vector - rot);
		path.insert(0, position + vector + rot);
		position += vector;
		*/
	}

/*
function onFrame(event)
{
	for (var i = 0, l = count / 36 + 1; i < l; i++) {
	growSpiral();
}
path.smooth();
}
*/