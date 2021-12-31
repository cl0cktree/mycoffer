/*
 Highcharts JS v9.1.1 (2021-06-03)

 Module for adding patterns and images as point fills.

 (c) 2010-2021 Highsoft AS
 Author: Torstein Hnsi, ystein Moseng

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/pattern-fill",["highcharts"],function(e){b(e);b.Highcharts=e;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function e(b,e,r,p){b.hasOwnProperty(e)||(b[e]=p.apply(null,r))}b=b?b._modules:{};e(b,"Extensions/PatternFill.js",[b["Core/Animation/AnimationUtilities.js"],b["Core/Chart/Chart.js"],b["Core/Globals.js"],
b["Core/DefaultOptions.js"],b["Core/Series/Point.js"],b["Core/Series/Series.js"],b["Core/Renderer/SVG/SVGRenderer.js"],b["Core/Utilities.js"]],function(b,e,r,p,t,u,v,l){function w(a,c){a=JSON.stringify(a);var b=a.length||0,f=0,d=0;if(c){c=Math.max(Math.floor(b/500),1);for(var n=0;n<b;n+=c)f+=a.charCodeAt(n);f&=f}for(;d<b;++d)c=a.charCodeAt(d),f=(f<<5)-f+c,f&=f;return f.toString(16).replace("-","1")}var z=b.animObject,A=p.getOptions;b=l.addEvent;var B=l.erase,x=l.merge,q=l.pick,C=l.removeEvent;p=l.wrap;
var y=r.patterns=function(){var a=[],c=A().colors;"M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11;M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9;M 3 0 L 3 10 M 8 0 L 8 10;M 0 3 L 10 3 M 0 8 L 10 8;M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7;M 3 3 L 8 3 L 8 8 L 3 8 Z;M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0;M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7;M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0".split(";").forEach(function(b,f){a.push({path:b,color:c[f],width:10,height:10})});return a}();t.prototype.calculatePatternDimensions=
function(a){if(!a.width||!a.height){var c=this.graphic&&(this.graphic.getBBox&&this.graphic.getBBox(!0)||this.graphic.element&&this.graphic.element.getBBox())||{},b=this.shapeArgs;b&&(c.width=b.width||c.width,c.height=b.height||c.height,c.x=b.x||c.x,c.y=b.y||c.y);if(a.image){if(!c.width||!c.height){a._width="defer";a._height="defer";return}a.aspectRatio&&(c.aspectRatio=c.width/c.height,a.aspectRatio>c.aspectRatio?c.aspectWidth=c.height*a.aspectRatio:c.aspectHeight=c.width/a.aspectRatio);a._width=
a.width||Math.ceil(c.aspectWidth||c.width);a._height=a.height||Math.ceil(c.aspectHeight||c.height)}a.width||(a._x=a.x||0,a._x+=c.x-Math.round(c.aspectWidth?Math.abs(c.aspectWidth-c.width)/2:0));a.height||(a._y=a.y||0,a._y+=c.y-Math.round(c.aspectHeight?Math.abs(c.aspectHeight-c.height)/2:0))}};v.prototype.addPattern=function(a,c){c=q(c,!0);var b=z(c),f=a.width||a._width||32,d=a.height||a._height||32,n=a.color||"#343434",g=a.id,e=this,m=function(a){e.rect(0,0,f,d).attr({fill:a}).add(k)};g||(this.idCounter=
this.idCounter||0,g="highcharts-pattern-"+this.idCounter+"-"+(this.chartIndex||0),++this.idCounter);this.forExport&&(g+="-export");this.defIds=this.defIds||[];if(!(-1<this.defIds.indexOf(g))){this.defIds.push(g);var h={id:g,patternUnits:"userSpaceOnUse",patternContentUnits:a.patternContentUnits||"userSpaceOnUse",width:f,height:d,x:a._x||a.x||0,y:a._y||a.y||0};a.patternTransform&&(h.patternTransform=a.patternTransform);var k=this.createElement("pattern").attr(h).add(this.defs);k.id=g;a.path?(h=l.isObject(a.path)?
a.path:{d:a.path},a.backgroundColor&&m(a.backgroundColor),m={d:h.d},this.styledMode||(m.stroke=h.stroke||n,m["stroke-width"]=q(h.strokeWidth,2),m.fill=h.fill||"none"),h.transform&&(m.transform=h.transform),this.createElement("path").attr(m).add(k),k.color=n):a.image&&(c?this.image(a.image,0,0,f,d,function(){this.animate({opacity:q(a.opacity,1)},b);C(this.element,"load")}).attr({opacity:0}).add(k):this.image(a.image,0,0,f,d).add(k));a.image&&c||"undefined"===typeof a.opacity||[].forEach.call(k.element.childNodes,
function(c){c.setAttribute("opacity",a.opacity)});this.patternElements=this.patternElements||{};return this.patternElements[g]=k}};p(u.prototype,"getColor",function(a){var c=this.options.color;c&&c.pattern&&!c.pattern.color?(delete this.options.color,a.apply(this,Array.prototype.slice.call(arguments,1)),c.pattern.color=this.color,this.color=this.options.color=c):a.apply(this,Array.prototype.slice.call(arguments,1))});b(u,"render",function(){var a=this.chart.isResizing;(this.isDirtyData||a||!this.chart.hasRendered)&&
(this.points||[]).forEach(function(c){var b=c.options&&c.options.color;b&&b.pattern&&(!a||c.shapeArgs&&c.shapeArgs.width&&c.shapeArgs.height?c.calculatePatternDimensions(b.pattern):(b.pattern._width="defer",b.pattern._height="defer"))})});b(t,"afterInit",function(){var a=this.options.color;a&&a.pattern&&("string"===typeof a.pattern.path&&(a.pattern.path={d:a.pattern.path}),this.color=this.options.color=x(this.series.options.color,a))});b(v,"complexColor",function(a){var c=a.args[0],b=a.args[1];a=
a.args[2];var f=this.chartIndex||0,d=c.pattern,e="#343434";"undefined"!==typeof c.patternIndex&&y&&(d=y[c.patternIndex]);if(!d)return!0;if(d.image||"string"===typeof d.path||d.path&&d.path.d){var g=a.parentNode&&a.parentNode.getAttribute("class");g=g&&-1<g.indexOf("highcharts-legend");"defer"!==d._width&&"defer"!==d._height||t.prototype.calculatePatternDimensions.call({graphic:{element:a}},d);if(g||!d.id)d=x({},d),d.id="highcharts-pattern-"+f+"-"+w(d)+w(d,!0);this.addPattern(d,!this.forExport&&q(d.animation,
this.globalAnimation,{duration:100}));e="url("+this.url+"#"+(d.id+(this.forExport?"-export":""))+")"}else e=d.color||e;a.setAttribute(b,e);c.toString=function(){return e};return!1});b(e,"endResize",function(){(this.renderer&&this.renderer.defIds||[]).filter(function(a){return a&&a.indexOf&&0===a.indexOf("highcharts-pattern-")}).length&&(this.series.forEach(function(a){a.points.forEach(function(a){(a=a.options&&a.options.color)&&a.pattern&&(a.pattern._width="defer",a.pattern._height="defer")})}),this.redraw(!1))});
b(e,"redraw",function(){var a={},c=this.renderer,b=(c.defIds||[]).filter(function(a){return a.indexOf&&0===a.indexOf("highcharts-pattern-")});b.length&&([].forEach.call(this.renderTo.querySelectorAll('[color^="url("], [fill^="url("], [stroke^="url("]'),function(b){if(b=b.getAttribute("fill")||b.getAttribute("color")||b.getAttribute("stroke"))b=b.replace(c.url,"").replace("url(#","").replace(")",""),a[b]=!0}),b.forEach(function(b){a[b]||(B(c.defIds,b),c.patternElements[b]&&(c.patternElements[b].destroy(),
delete c.patternElements[b]))}))});""});e(b,"masters/modules/pattern-fill.src.js",[],function(){})});
//# sourceMappingURL=pattern-fill.js.map


var patternPath = '/static/images/pattern/';

//경로 변경 (테스트서버용)
var locationFlag = window.location.href.split('/')[3];
if(locationFlag == 'view-test' || locationFlag == 'mydata_newsb'){        
    patternPath = '../../static/images/pattern/';
}

var chartBg = [
    '',
    {	// pattern_01.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 1 0.5 M 1 1.5 L 2 1.5 M 2 2.5 L 3 2.5 M 3 3.5 L 4 3.5 M 4 4.5 L 5 4.5 M 5 5.5 L 6 5.5 M 6 6.5 L 7 6.5 M 7 7.5 L 8 7.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#ffcf53",
			color : "#ffffff",
		}
	},
	{	// pattern_02.png
		pattern: {
			path:{
				d: 'M 2 0.5 L 5 0.5 M 1 1.5 L 2 1.5 M 5 1.5 L 6 1.5 M 0.5 2 L 0.5 5 M 1 5.5 L 2 5.5 M 2 6.5 L 5 6.5 M 5 5.5 L 6 5.5 M 6.5 5 L 6.5 2',
				strokeWidth : 1,
			},
			width: 9,
			height: 9,
			backgroundColor: "#ffab53",
			color : "#ffffff",
		}
	},
	{	// pattern_03.png
		pattern: {
			path:{
				d: 'M 0 3.5 L 4 3.5',
				strokeWidth : 1,
			},
			width: 4,
			height: 4,
			backgroundColor: "#fa844e",
			color : "#ffffff",
		}
	},
	{	// pattern_04.png
		pattern: {
			path:{
				d: 'M 3 0.5 L 4 0.5 M 2 1.5 L 3 1.5 M 1 2.5 L 2 2.5 M 0 3.5 L 1 3.5 M 1 4.5 L 2 4.5 M 2 5.5 L 3 5.5 M 3 6.5 L 4 6.5 M 4 5.5 L 5 5.5 M 5 4.5 L 6 4.5 M 6 3.5 L 7 3.5 M 5 2.5 L 6 2.5 M 4 1.5 L 5 1.5',
				strokeWidth : 1,
			},
			width: 9,
			height: 9,
			backgroundColor: "#5b75ce",
			color : "#ffffff",
		}
	},
	{	// pattern_05.png
		pattern: {
			path:{
				d: 'M 5.5 0 L 5.5 2 M 6 1.5 L 1 1.5 M 1.5 1 L 1.5 4 M 1 3.5 L 6 3.5',
				strokeWidth : 1,
			},
			width: 7,
			height: 4,
			backgroundColor: "#7f97ea",
			color : "#ffffff",
		}
	},
	{	// pattern_06.png
		pattern: {
			path:{
				d: 'M 2.5 0 L 2.5 1 M 3.5 1 L 3.5 2 M 4.5 2 L 4.5 5 M 3.5 5 L 3.5 6 M 2.5 6 L 2.5 7 M 1.5 7 L 1.5 8 M 0.5 8 L 0.5 11 M 1.5 11 L 1.5 12',
				strokeWidth : 1,
			},
			width: 5,
			height: 12,
			backgroundColor: "#8fd171",
			color : "#ffffff",
		}
	},
	{	// pattern_07.png
		pattern: {
			path:{
				d: 'M 0 3.5 L 4 3.5 M 3.5 4 L 3.5 0',
				strokeWidth : 1,
			},
			width: 4,
			height: 4,
			backgroundColor: "#66aa76",
			color : "#ffffff",
		}
	},
	{	// pattern_08.png
		pattern: {
			path:{
				d: 'M 0 7.5 L 1 7.5 M 1 6.5 L 2 6.5 M 2 5.5 L 3 5.5 M 3 4.5 L 4 4.5 M 4 3.5 L 5 3.5 M 5 2.5 L 6 2.5 M 6 1.5 L 7 1.5 M 7 0.5 L 8 0.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#ff445a",
			color : "#ffffff",
		}
	},
	{	// pattern_09.png
		pattern: {
			path:{
				d: 'M 0 2.5 L 1 2.5 M 1 1.5 L 2 1.5 M 2 0.5 L 5 0.5 M 5 1.5 L 6 1.5 M 6 2.5 L 7 2.5 M 7 3.5 L 8 3.5 M 8 4.5 L 11 4.5 M 11 3.5 L 12 3.5 M 12 2.5 L 13 2.5',
				strokeWidth : 1,
			},
			width: 13,
			height: 5,
			backgroundColor: "#7155c8",
			color : "#ffffff",
		}
	},
	{	// pattern_10.png
		pattern: {
			path:{
				d: 'M 0.5 0 L 0.5 4',
				strokeWidth : 1,
			},
			width: 4,
			height: 4,
			backgroundColor: "#ab94ff",
			color : "#ffffff",
		}
	},
	{	// pattern_11.png
		pattern: {
			path:{
				d: 'M 3 1.5 L 5 1.5 M 3 2.5 L 5 2.5 M 1 3.5 L 7 3.5 M 1 4.5 L 7 4.5 M 3 5.5 L 5 5.5 M 3 6.5 L 5 6.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#609df8",
			color : "#ffffff",
		}
	},
	{	// pattern_12.png
		pattern: {
			path:{
				d: 'M 3 1.5 L 5 1.5 M 5 2.5 L 6 2.5 M 6.5 3 L 6.5 5 M 6 5.5 L 5 5.5 M 5 6.5 L 3 6.5 M 3 5.5 L 2 5.5 M 1.5 5 L 1.5 3 M 2 2.5 L 3 2.5 M 3 3.5 L 5 3.5 M 3 4.5 L 5 4.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#405ab5",
			color : "#ffffff",
		}
	},
	{	// pattern_13.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 1 0.5 M 1 1.5 L 2 1.5 M 2 2.5 L 3 2.5 M 3 3.5 L 4 3.5 M 4 4.5 L 5 4.5 M 5 5.5 L 6 5.5 M 4 2.5 L 5 2.5 M 5 1.5 L 6 1.5 M 2 4.5 L 3 4.5 M 1 5.5 L 2 5.5',
				strokeWidth : 1,
			},
			width: 6,
			height: 6,
			backgroundColor: "#ffba53",
			color : "#ffffff",
		}
	},
	{	// pattern_14.png
		pattern: {
			path:{
				d: 'M 1.5 1.5 L 7.5 1.5 L 7.5 7.5 L 1.5 7.5 Z',
				strokeWidth : 1,
			},
			width: 9,
			height: 9,
			backgroundColor: "#9152ff",
			color : "#ffffff",
		}
	},
	{	// pattern_15.png
		pattern: {
			path:{
				d: 'M 1 4.5 L 8 4.5 M 2 3.5 L 3 3.5 M 6 3.5 L 7 3.5 M 3 2.5 L 4 2.5 M 5 2.5 L 6 2.5 M 4 1.5 L 5 1.5',
				strokeWidth : 1,
			},
			width: 9,
			height: 6,
			backgroundColor: "#ac3c55",
			color : "#ffffff",
		}
	},
	{	// pattern_16.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 1 0.5 M 1 1.5 L 2 1.5 M 2 2.5 L 3 2.5 M 3 3.5 L 4 3.5 M 2 4.5 L 3 4.5 M 1 5.5 L 2 5.5',
				strokeWidth : 1,
			},
			width: 4,
			height: 6,
			backgroundColor: "#aae0ff",
			color : "#ffffff",
		}
	},
	{	// pattern_17.png
		pattern: {
			path:{
				d: 'M 1 1.5 L 7 1.5 M 6.5 1 L 6.5 7 M 7 6.5 L 1 6.5 M 1.5 7 L 1.5 1 M 3 3.5 L 5 3.5 M 4.5 3 L 4.5 5 L 4.5 5 M 5 4.5 L 3 4.5 M 3.5 5 L 3.5 3',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#a9c5ff",
			color : "#ffffff",
		}
	},
	{	// pattern_18.png
		pattern: {
			path:{
				d: 'M 0 1.5 L 2 1.5 M 1.5 2 L 1.5 6 M 2 5.5 L 4 5.5 M 3.5 5 L 3.5 1',
				strokeWidth : 1,
			},
			width: 4,
			height: 7,
			backgroundColor: "#354673",
			color : "#ffffff",
		}
	},
	{	// pattern_19.png
		pattern: {
			path:{
				d: 'M 1 1.5 L 8 1.5 M 2 2.5 L 3 2.5 M 3 3.5 L 4 3.5 M 4 4.5 L 5 4.5 M 5 3.5 L 6 3.5 M 6 2.5 L 7 2.5',
				strokeWidth : 1,
			},
			width: 9,
			height: 6,
			backgroundColor: "#86afff",
			color : "#ffffff",
		}
	},
	{	// pattern_20.png
		pattern: {
			path:{
				d: 'M 0 3.5 L 1 3.5 M 1 2.5 L 2 2.5 M 2 1.5 L 3 1.5 M 3 0.5 L 4 0.5 M 4 1.5 L 5 1.5 M 5 2.5 L 6 2.5',
				strokeWidth : 1,
			},
			width: 6,
			height: 4,
			backgroundColor: "#afeaa7",
			color : "#ffffff",
		}
	},
	{	// pattern_21.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 1 0.5 M 1 1.5 L 2 1.5 M 2 2.5 L 3 2.5 M 3 3.5 L 4 3.5 M 4 4.5 L 5 4.5 M 5 5.5 L 6 5.5 M 6 6.5 L 7 6.5 M 7 7.5 L 8 7.5 M 5 3.5 L 6 3.5 M 3 5.5 L 4 5.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#cddf5c",
			color : "#ffffff",
		}
	},
	{	// pattern_22.png
		pattern: {
			path:{
				d: 'M 4.5 0 L 4.5 2 M 0 4.5 L 2 4.5 M 4.5 9 L 4.5 7 M 7 4.5 L 9 4.5 M 3 2.5 L 4 2.5 M 5 2.5 L 6 2.5 M 2 3.5 L 3 3.5 M 6 3.5 L 7 3.5 M 2 5.5 L 3 5.5 M 6 5.5 L 7 5.5 M 3 6.5 L 4 6.5 M 5 6.5 L 6 6.5',
				strokeWidth : 1,
			},
			width: 9,
			height: 9,
			backgroundColor: "#9eda83",
			color : "#ffffff",
		}
	},
	{	// pattern_23.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 1 0.5 M 1 1.5 L 2 1.5 M 2 2.5 L 3 2.5 M 3 3.5 L 4 3.5 M 2 4.5 L 3 4.5 M 1 5.5 L 2 5.5 M 3 5.5 L 4 5.5 M 0 3.5 L 1 3.5',
				strokeWidth : 1,
			},
			width: 4,
			height: 6,
			backgroundColor: "#f46c48",
			color : "#ffffff",
		}
	},
	{	// pattern_24.png
		pattern: {
			path:{
				d: 'M 0 1.5 L 2 1.5 M 1 2.5 L 2 2.5 M 3.5 1 L 3.5 3 M 3.5 4 L 3.5 5 M 1.5 4 L 1.5 5 M 2 5.5 L 3 5.5',
				strokeWidth : 1,
			},
			width: 4,
			height: 7,
			backgroundColor: "#ff9b53",
			color : "#ffffff",
		}
	},
	{	// pattern_25.png
		pattern: {
			path:{
				d: 'M 0.5 1 L 0.5 3 M 7.5 0 L 7.5 1 M 6.5 1 L 6.5 2 M 7.5 2 L 7.5 3 M 6.5 3 L 6.5 4 M 5.5 4 L 5.5 5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#4c8c64",
			color : "#ffffff",
		}
	},
	{	// pattern_26.png
		pattern: {
			path:{
				d: 'M 1 1.5 L 3 1.5 M 1.5 1 L 1.5 3 M 1.5 4 L 1.5 6 M 6 1.5 L 8 1.5 M 7.5 1 L 7.5 3 M 7.5 4 L 7.5 6 M 3 7.5 L 6 7.5',
				strokeWidth : 1,
			},
			width: 9,
			height: 9,
			backgroundColor: "#72b97a",
			color : "#ffffff",
		}
	},
	{	// pattern_27.png
		pattern: {
			path:{
				d: 'M 0.5 1 L 0.5 3 M 0.5 5 L 0.5 7',
				strokeWidth : 1,
			},
			width: 4,
			height: 8,
			backgroundColor: "#d090ee",
			color : "#ffffff",
		}
	},
	{	// pattern_28.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 8 0.5 M 0.5 1 L 0.5 8 M 1.5 1 L 1.5 2 M 2.5 2 L 2.5 3 M 3.5 3 L 3.5 4 M 4.5 4 L 4.5 5 M 5.5 5 L 5.5 6 M 6.5 6 L 6.5 7 M 7.5 7 L 7.5 8',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#ffbbd8",
			color : "#ffffff",
		}
	},
	{	// pattern_29.png
		pattern: {
			path:{
				d: 'M 2 0.5 L 3 0.5 M 6 0.5 L 7 0.5 M 3 1.5 L 6 1.5 M 2 2.5 L 3 2.5 M 6 2.5 L 7 2.5 M 1 3.5 L 2 3.5 M 7 3.5 L 8 3.5 M 0 4.5 L 1 4.5 M 8 4.5 L 9 4.5 M 1 5.5 L 2 5.5 M 7 5.5 L 8 5.5 M 2 6.5 L 3 6.5 M 6 6.5 L 7 6.5 M 3 7.5 L 6 7.5 M 2 8.5 L 3 8.5 M 6 8.5 L 7 8.5',
				strokeWidth : 1,
			},
			width: 9,
			height: 9,
			backgroundColor: "#48389b",
			color : "#ffffff",
		}
	},
	{	// pattern_30.png
		pattern: {
			path:{
				d: 'M 3 1.5 L 5 1.5 M 3 2.5 L 5 2.5 M 1 3.5 L 3 3.5 M 1 4.5 L 3 4.5 M 3 5.5 L 5 5.5 M 3 6.5 L 5 6.5 M 5 3.5 L 7 3.5 M 5 4.5 L 7 4.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#ff6391",
			color : "#ffffff",
		}
	},
	{	// pattern_31.png
		pattern: {
			path:{
				d: 'M 2 1.5 L 6 1.5 M 1.5 2 L 1.5 6 M 2 6.5 L 6 6.5 M 6.5 2 L 6.5 6 M 3 3.5 L 4 3.5 M 4 4.5 L 5 4.5',
				strokeWidth : 1,
			},
			width: 8,
			height: 8,
			backgroundColor: "#b171f7",
			color : "#ffffff",
		}
	},
	{	// pattern_32.png
		pattern: {
			path:{
				d: 'M 1 2 L 3 2',
				strokeWidth : 1,
			},
			width: 4,
			height: 4,
			backgroundColor: "#e02a61",
			color : "#ffffff",
		}
	},
	{	// pattern_33.png
		pattern: {
			path:{
				d: 'M 0 0.5 L 2 0.5 M 0 1.5 L 2 1.5',
				strokeWidth : 1,
			},
			width: 4,
			height: 4,
			backgroundColor: "#c6cbd0",
			color : "#ffffff",
		}
	}
]
var solidBg = ['','#ffcf53','#ffab53','#fa844e','#5b75ce','#7f97ea','#8fd171','#66aa76','#ff445a','#7155c8','#ab94ff','#609df8','#405ab5','#ffba53','#9152ff','#ac3c55','#aae0ff','#a9c5ff','#354673','#86afff','#afeaa7','#cddf5c','#9eda83','#f46c48','#ff9b53','#4c8c64','#72b97a','#d090ee','#ffbbd8','#48389b','#ff6391','#b171f7','#e02a61','#c6cbd0'];

var lineBg = ['','#ffcf53','#609df8','#e02a61','#4c8c64','#9152ff','#ffab53','#354673','#ff6391','#f46c48','#c6cbd0'];

var lineMarker = [
    '',
    {
        symbol: 'url(' + patternPath + 'line-marker_01.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_02.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_03.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_04.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_05.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_06.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_07.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_08.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_09.png)',
        width: 6,
        height: 6
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_10.png)',
        width: 6,
        height: 6
    }
];

