
function shrinkToSize(instance, targetLength)
{
	var length = instance.path.segments.length;
	if (length <= targetLength) return;
	instance.path.removeSegment(length - 1);
	instance.path.removeSegment(0);
	setTimeout(function() { return shrinkToSize(instance) }, targetLength));
}

function growToSize(instance, targetLength)
{

	var length = instance.path.segments.length;
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
		setTimeout(function() { return growToSize(instance, targetLength); }, interval);
	} 

}