/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define([
        'jquery.sap.global',
        'sap/ui/core/Control',
        'sap/ui/core/theming/Parameters'
    ],
    function(jQuery, Control, Parameters) {

        var ShapeMarker = Control.extend('sap.viz.ui5.controls.chartpopover.ShapeMarker', {
            metadata: {
                properties: {
                    'type': 'string',
                    'color': 'string',
                    'markerSize': 'int',
                    'showWithLine': 'string',
                    'lineInfo': 'object',
                    'stroke': 'object',
                    'pattern': 'string'
                }
            },

            renderer: {
                render: function(oRm, oControl) {
                    var markerSize = oControl.getMarkerSize() ? oControl.getMarkerSize() : 10;
                    var posX = markerSize / 2,
                        posY = posX,
                        width = markerSize,
                        height = markerSize;
                    if (oControl._isShowWithLine()) {
                        posX = markerSize;
                        width = markerSize * 2;

                        markerSize = 6;
                    }
                    var props = {
                        rx: markerSize / 2,
                        ry: markerSize / 2,
                        type: oControl.getType(),
                        borderWidth: 0
                    };
                    oRm.write('<div');
                    oRm.writeClasses();
                    oRm.write('>');
                    oRm.write('<svg width=' + width + 'px height=' + height + 'px ' + 'focusable = false');
                    oRm.write('>');
                    if (oControl._isShowWithLine()) {
                        var lineInfo = oControl.getLineInfo(),
                            lineColor = Parameters.get(lineInfo.lineColor);
                        if (!lineColor) {
                            lineColor = lineInfo.lineColor ? lineInfo.lineColor : oControl.getColor();
                        }

                        if (lineInfo.lineType === 'dotted' || lineInfo.lineType === 'dash') {
                            oRm.write("<line x1 = '0' y1='" + posY + "' x2 = '" + width + "' y2 = '" + posY + "' ");
                            oRm.write("stroke-width = '2' ");
                            oRm.write(" stroke-dasharray = '5, 3' ");
                        } else if (lineInfo.lineType === 'dot') {
                            var pointCount = Math.floor(width / 2);
                            pointCount = pointCount & 1 ? pointCount : pointCount - 1;
                            if (pointCount < 3) {
                                pointCount = 3;
                            }
                            var lineWidth = width / pointCount;
                            oRm.write("<line x1 ='" + (lineWidth / 2) + "'y1='" + posY + "' x2 = '" + width + "' y2 = '" + posY + "' ");
                            oRm.write(" stroke-dasharray = ' 0," + lineWidth * 2 + "'");
                            oRm.write("stroke-width = '" + lineWidth + "'");
                            oRm.write("stroke-linecap = 'round'");
                        } else {
                            oRm.write("<line x1 = '0' y1='" + posY + "' x2 = '" + width + "' y2 = '" + posY + "' ");
                            oRm.write("stroke-width = '2' ");
                        }
                        oRm.write(" stroke = '" + lineColor + "'");
                        oRm.write("> </line>");
                    }
                    if (props.type) {
                        oRm.write("<path d = '" + oControl._generateShapePath(props) + "'");
                        var pattern = oControl.getPattern();
                        if (!pattern) {
                            oRm.write(" fill = '" + oControl.getColor() + "'");
                        } else if (pattern === 'noFill') {
                            var fColor = Parameters.get('sapUiChartBackgroundColor');
                            if (fColor === 'transparent') {
                                fColor = "white";
                            }
                            oRm.write(" fill = '" + fColor + "'");
                            oRm.write(" stroke = '" + oControl.getColor() + "' stroke-width= '1px'");
                        } else {
                            oRm.write(" fill = '" + pattern + "'");
                        }


                        oRm.write(" transform = 'translate(" + posX + "," + posY + ")'");
                        oRm.write('></path>');
                    }
                    oRm.write('</svg>');
                    oRm.write('</div>');
                    oRm.writeStyles();
                }
            }
        });

        ShapeMarker.prototype._isShowWithLine = function() {
            return (this.getShowWithLine() === 'line') && this.getLineInfo();
        };

        ShapeMarker.prototype._generateShapePath = function(props) {
            var result;
            var temp = props.borderWidth / 2;
            switch (props.type) {
                case "circle":
                    result = "M" + (-props.rx - temp) + ",0 A" + (props.rx + temp) + "," + (props.ry + temp) + " 0 1,0 " + (props.rx + temp) + ",0 A";
                    result += (props.rx + temp) + "," + (props.ry + temp) + " 0 1,0 " + (-props.rx - temp) + ",0z";
                    break;
                case "cross":
                    result = "M" + (-props.rx - temp) + "," + (-props.ry / 3 - temp) + "H" + (-props.rx / 3 - temp) + "V" + (-props.ry - temp) + "H" + (props.rx / 3 + temp);
                    result += "V" + (-props.ry / 3 - temp) + "H" + (props.rx + temp) + "V" + (props.ry / 3 + temp) + "H" + (props.rx / 3 + temp);
                    result += "V" + (props.ry + temp) + "H" + (-props.rx / 3 - temp) + "V" + (props.ry / 3 + temp) + "H" + (-props.rx - temp) + "Z";
                    break;
                case "diamond":
                    result = "M0," + (-props.ry - temp) + "L" + (props.rx + temp) + ",0" + " 0," + (props.ry + temp) + " " + (-props.rx - temp) + ",0" + "Z";
                    break;
                case "square":
                case "sector":
                    result = "M" + (-props.rx - temp) + "," + (-props.ry - temp) + "L" + (props.rx + temp) + ",";
                    result += (-props.ry - temp) + "L" + (props.rx + temp) + "," + (props.ry + temp) + "L" + (-props.rx - temp) + "," + (props.ry + temp) + "Z";
                    break;
                case "triangle-down":
                    //TODO: remove duplicate
                case "triangleDown":
                    result = "M0," + (props.ry + temp) + "L" + (props.rx + temp) + "," + -(props.ry + temp) + " " + -(props.rx + temp) + "," + -(props.ry + temp) + "Z";
                    break;
                case "triangle-up":
                    //TODO: remove duplicate
                case "triangleUp":
                    result = "M0," + -(props.ry + temp) + "L" + (props.rx + temp) + "," + (props.ry + temp) + " " + -(props.rx + temp) + "," + (props.ry + temp) + "Z";
                    break;
                case "triangle-left":
                    //TODO: remove duplicate
                case "triangleLeft":
                    result = "M" + -(props.rx + temp) + ",0L" + (props.rx + temp) + "," + (props.ry + temp) + " " + (props.rx + temp) + "," + -(props.ry + temp) + "Z";
                    break;
                case "triangle-right":
                    //TODO: remove duplicate
                case "triangleRight":
                    result = "M" + (props.rx + temp) + ",0L" + -(props.rx + temp) + "," + (props.ry + temp) + " " + -(props.rx + temp) + "," + -(props.ry + temp) + "Z";
                    break;
                case "intersection":
                    result = "M" + (props.rx + temp) + "," + (props.ry + temp) + "L" + (props.rx / 3 + temp) + ",0L" + (props.rx + temp) + "," + -(props.ry + temp) + "L";
                    result += (props.rx / 2 - temp) + "," + -(props.ry + temp) + "L0," + (-props.ry / 3 - temp) + "L" + (-props.rx / 2 + temp) + "," + -(props.ry + temp) + "L";
                    result += -(props.rx + temp) + "," + -(props.ry + temp) + "L" + -(props.rx / 3 + temp) + ",0L" + -(props.rx + temp) + "," + (props.ry + temp) + "L";
                    result += (-props.rx / 2 + temp) + "," + (props.ry + temp) + "L0," + (props.ry / 3 + temp) + "L" + (props.rx / 2 - temp) + "," + (props.ry + temp) + "Z";
                    break;
                case 'squareWithRadius':
                    var r = props.rx;
                    var radius = r - 3;
                    result = "M0," + -r + "L" + -radius + "," + -r + "Q" + -r + "," + -r + " " + -r + "," + -radius + "L" + -r + "," + radius + "Q" + -r + "," + r + " " + -radius + "," + r;
                    result += "L" + radius + "," + r + "Q" + r + "," + r + " " + r + "," + radius + "L" + r + "," + -radius + "Q" + r + "," + -r + " " + radius + "," + -r + "Z";
                    break;
            }
            //symbolMap[props] = result;
            return result;
        };

        return ShapeMarker;
    });
