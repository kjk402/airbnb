function catmullRom2bezier(points: any): any {
	var result = [];
	for (var i = 0; i < points.length - 1; i++) {
		var p = [];

		p.push({
			x: points[Math.max(i - 1, 0)].x,
			y: points[Math.max(i - 1, 0)].y,
		});
		p.push({
			x: points[i].x,
			y: points[i].y,
		});
		p.push({
			x: points[i + 1].x,
			y: points[i + 1].y,
		});
		p.push({
			x: points[Math.min(i + 2, points.length - 1)].x,
			y: points[Math.min(i + 2, points.length - 1)].y,
		});

		var bp = [];
		bp.push({
			x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
			y: (-p[0].y + 6 * p[1].y + p[2].y) / 6,
		});
		bp.push({
			x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
			y: (p[1].y + 6 * p[2].y - p[3].y) / 6,
		});
		bp.push({
			x: p[2].x,
			y: p[2].y,
		});
		result.push(bp);
	}
	return result;
}

export default function makePath(points: any): any {
	var result = "M" + points[0].x + "," + points[0].y + " ";
	var catmull = catmullRom2bezier(points);
	for (var i = 0; i < catmull.length; i++) {
		result += "C" + catmull[i][0].x + "," + catmull[i][0].y + " " + catmull[i][1].x + "," + catmull[i][1].y + " " + catmull[i][2].x + "," + catmull[i][2].y + " ";
	}
	return result;
}

window.onload = function () {
	var graph = [75000, 79000, 79000, 80000, 80000, 85000, 85000, 85000, 85000, 85000, 90000, 90000, 90000, 90000, 90000, 90000, 92000, 92000, 95000, 95000, 95000, 95000, 95000, 95000, 95000, 95000, 95000, 98000, 98000, 98000, 98000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000];
	var graph2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100000 - 75000, 100000 - 79000, 100000 - 79000, 100000 - 80000, 100000 - 80000, 100000 - 85000, 100000 - 85000, 100000 - 85000, 100000 - 85000, 100000 - 85000, 100000 - 90000, 100000 - 90000, 100000 - 90000, 100000 - 90000, 100000 - 90000, 100000 - 90000, 100000 - 92000, 100000 - 92000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 95000, 100000 - 98000, 100000 - 98000, 100000 - 98000, 100000 - 98000];
	var points = [];
	var points2 = [];
	for (var i = 0; i < graph.length; i++) {
		points.push({ x: i * 7, y: graph[i] * 0.003 * -1 + 320 });
		points2.push({ x: i * 7, y: graph2[i] * 0.003 * -1 + 320 });
	}
	// document.querySelector("#svg path").setAttribute("d", makePath(points));
	// document.querySelector("#svg2 path").setAttribute("d", makePath(points2));
	// 좌표 점 찍기 설정
	// for (var i = 0; i < points.length; i++) {
	// 	var circle = points[i];
	// 	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	// 	c.setAttribute("cx", circle.x); // 좌표 점 x 위치
	// 	c.setAttribute("cy", circle.y); // 좌표 점 y 위치
	// 	// c.setAttribute("r", "1"); // 좌표 점 크기
	// 	document.querySelector("#svg").appendChild(c);
	// }
};
