/**
 * Highcharts pattern fill plugin
 *
 * Author:         Torstein Honsi
 * Last revision:  2014-04-29
 * License:        MIT License
 *
 * Options:
 * - pattern:      The URL for a pattern image file
 * - width:        The width of the image file
 * - height:       The height of the image file
 * - color1:       In oldIE, bright colors in the pattern image are replaced by this color. 
 *                 Not yet implemented in SVG.
 * - color2:       In oldIE, dark colors are replaced by this. 
 */

/*global Highcharts */
(function() {

    'use strict';

    var idCounter = 0;

    Highcharts.wrap(Highcharts.SVGElement.prototype, 'fillSetter', function (proceed, color, prop, elem) {
        var markup,
            id,
            pattern,
            image;
        if (color && color.pattern && prop === 'fill') {
            id = 'highcharts-pattern-' + idCounter++;
            pattern = this.renderer.createElement('pattern')
                .attr({
                    id: id,
                    patternUnits: 'userSpaceOnUse',
                    width: color.width,
                    height: color.height
                })
                .add(this.renderer.defs);
            image = this.renderer.image(
                color.pattern, 0, 0, color.width, color.height
            ).add(pattern);
            elem.setAttribute(prop, 'url(' + this.renderer.url + '#' + id + ')');
        } else {
            return proceed.call(this, color, prop, elem);
        }
    });
    
    if (Highcharts.VMLElement) {
        Highcharts.wrap(Highcharts.Renderer.prototype.Element.prototype, 'fillSetter', function (proceed, color, prop, elem) {
                
            if (color && color.pattern && prop === 'fill') {
                // Remove previous fills
                if (elem.getElementsByTagName('fill').length) {
                    elem.removeChild(elem.getElementsByTagName('fill')[0]);                  
                }
                
                // If colors are given, use those, else use the original colors
                // of the pattern tile
                if (color.color1 && color.color2) {
                    markup = ['<hcv:', prop, ' color="', color.color1, '" color2="', 
                              color.color2, '" type="pattern" src="', color.pattern, '" />'].join('');
                } else {
                    markup = this.renderer.prepVML(['<', prop, ' type="tile" src="', color.pattern, '" />']);
                }
                
                elem.appendChild(
                    document.createElement(markup)
                );   
                
                // Work around display bug on updating attached nodes
                if (elem.parentNode.nodeType === 1) {
                    elem.outerHTML = elem.outerHTML
                }
                
            } else {
                return proceed.call(this, color, prop, elem);
            }
        });
    }
})();


var patternPath = '../../../static/images/pattern/'
var chartBg = [
    '',
    {
        pattern: patternPath + 'pattern_01.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_02.png',
        width: 9,
        height: 9,
    },
    {
        pattern: patternPath + 'pattern_03.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_04.png',
        width: 9,
        height: 9,
    },
    {
        pattern: patternPath + 'pattern_05.png',
        width: 7,
        height: 4,
    },
    {
        pattern: patternPath + 'pattern_06.png',
        width: 5,
        height: 17,
    },
    {
        pattern: patternPath + 'pattern_07.png',
        width: 4,
        height: 4,
    },
    {
        pattern: patternPath + 'pattern_08.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_09.png',
        width: 13,
        height: 5,
    },
    {
        pattern: patternPath + 'pattern_10.png',
        width: 4,
        height: 4,
    },
    {
        pattern: patternPath + 'pattern_11.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_12.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_13.png',
        width: 6,
        height: 6,
    },
    {
        pattern: patternPath + 'pattern_14.png',
        width: 9,
        height: 9,
    },
    {
        pattern: patternPath + 'pattern_15.png',
        width: 9,
        height: 6,
    },
    {
        pattern: patternPath + 'pattern_16.png',
        width: 4,
        height: 6,
    },
    {
        pattern: patternPath + 'pattern_17.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_18.png',
        width: 4,
        height: 7,
    },
    {
        pattern: patternPath + 'pattern_19.png',
        width: 9,
        height: 6,
    },
    {
        pattern: patternPath + 'pattern_20.png',
        width: 6,
        height: 4,
    },
    {
        pattern: patternPath + 'pattern_21.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_22.png',
        width: 9,
        height: 9,
    },
    {
        pattern: patternPath + 'pattern_23.png',
        width: 4,
        height: 6,
    },
    {
        pattern: patternPath + 'pattern_24.png',
        width: 4,
        height: 7,
    },
    {
        pattern: patternPath + 'pattern_25.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_26.png',
        width: 9,
        height: 9,
    },
    {
        pattern: patternPath + 'pattern_27.png',
        width: 4,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_28.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_29.png',
        width: 9,
        height: 9,
    },
    {
        pattern: patternPath + 'pattern_30.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_31.png',
        width: 8,
        height: 8,
    },
    {
        pattern: patternPath + 'pattern_32.png',
        width: 4,
        height: 4,
    },
    {
        pattern: patternPath + 'pattern_33.png',
        width: 4,
        height: 4,
    },
];

var solidBg = ['','#ffcf53','#ffab53','#fa844e','#5b75ce','#7f97ea','#8fd171','#66aa76','#ff445a','#7155c8','#ab94ff','#609df8','#405ab5','#ffba53','#9152ff','#ac3c55','#aae0ff','#a9c5ff','#354673','#86afff','#afeaa7','#cddf5c','#9eda83','#f46c48','#ff9b53','#4c8c64','#72b97a','#d090ee','#ffbbd8','#48389b','#ff6391','#b171f7','#e02a61','#c6cbd0'];

var lineBg = ['','#ffcf53','#609df8','#e02a61','#4c8c64','#9152ff','#ffab53','#354673','#ff6391','#f46c48','#c6cbd0'];

var lineMarker = [
    '',
    {
        symbol: 'url(' + patternPath + 'line-marker_01.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_02.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_03.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_04.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_05.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_06.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_07.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_08.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_09.png)',
        width: 10,
        height: 10
    },
    {
        symbol: 'url(' + patternPath + 'line-marker_10.png)',
        width: 10,
        height: 10
    }
];