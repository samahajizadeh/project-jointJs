// Canvas where shape are dropped
var graph = new joint.dia.Graph,
    paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
        height: '350',
        width: '100%',
        model: graph,
        defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        }),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            // Prevent linking from input ports.
            if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
            // Prevent linking from output ports to input ports within one element.
            if (cellViewS === cellViewT) return false;
            // Prevent linking to input ports.
            return magnetT && magnetT.getAttribute('port-group') === 'in';
        },
        // Enable marking available cells & magnets
        markAvailable: true,
        snapLinks: { radius: 75 },
        gridSize: 15,
        drawGrid: true
    });

// Canvas from which you take shapes
var stencilGraph = new joint.dia.Graph,
    stencilPaper = new joint.dia.Paper({
        el: document.getElementById('stencil'),
        height: 105,
        width:'100%',
        model: stencilGraph,
        interactive: false
    });

/* =======================================
 * START NODE
 * =======================================
 */

joint.shapes.devs.StartEvent = joint.shapes.basic.Circle.extend({
    markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/></g>',
    portMarkup: '<rect/>',
    defaults: _.defaultsDeep({
        type: 'devs.StartEvent',
        ports: {
            groups: {
                'out': {
                    position: {
                        name: 'ellipse',
                        args: {
                            dx: -5,
                            dy: -5,
                            dr: 0,
                            step: 20,
                            startAngle: 180
                        }
                    },
                    attrs: {
                        rect: {
                            width: 8,
                            height: 8,
                            stroke: 'black',
                            fill: 'red',
                            magnet: 'active'
                        }
                    }
                }
            }
        }
    }, joint.shapes.devs.Model.prototype.defaults)
});
var Start = new joint.shapes.devs.StartEvent({
    position: {
        x: 30,
        y: 25
    },
    size: {width: 35, height: 35},
    attrs: {
        '.body': {cx: 35, cy: 35, r: 35, stroke: 'black', fill: 'transparent', 'stroke-width': 1.5},
        text: {
            fill: 'black',
            'font-size': 12,
            'font-weight': 'bold',
            'text': 'Start',
            'ref-y': 0.5,
            'y-alignment': 'middle',
            'text-anchor': 'middle'

        }
    },
    ports: {
        items: [
            {group: 'out'}
        ]
    },
    cellsDetail: {
        type: 'Start',
    }
});

/* =======================================
 * END NODE
 * =======================================
 */

joint.shapes.devs.EndEvent = joint.shapes.basic.Circle.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/></g>',
    portMarkup: '<rect/>',

    defaults: _.defaultsDeep({
        type: 'devs.EndEvent',
        ports: {
            groups: {
                'in': {
                    position: {
                        name: 'ellipse',
                        args: {
                            dx: -5,
                            dy: -5,
                            dr: 0,
                            step: 30,
                            startAngle: 0
                        }
                    },
                    attrs: {
                        rect: {
                            width: 8,
                            height: 8,
                            stroke: 'black',
                            fill: 'blue',
                            magnet: 'passive'
                        }
                    }
                }
            }
        }
    }, joint.shapes.devs.Model.prototype.defaults)
});
var End = new joint.shapes.devs.EndEvent({
    position: {
        x: 80,
        y: 25
    },
    size: {width: 35, height: 35},
    attrs: {
        '.body': {cx: 35, cy: 35, r: 35, stroke: 'black', fill: 'transparent', 'stroke-width': 3},
        text: {
            'fill': 'black',
            'font-size': 12,
            'font-weight': 'bold',
            'text': 'End',
            'ref-y': 0.5,
            'y-alignment': 'middle',
            'text-anchor': 'middle'
        }
    },
    ports: {
        items: [
            {group: 'in'}
        ]
    },
    cellsDetail: {
        type: 'End',
    }
});


/* =======================================
 * CONDITION NODE
 * =======================================
 */


joint.shapes.devs.PathModel = joint.shapes.basic.Path.extend({
    portMarkup: '<rect/>',
    defaults: _.defaultsDeep({
        type: 'devs.PathModel',
        ports: {
            groups: {
                'in': {
                    position: {
                        name: 'ellipse',
                        args: {
                            dx: 30,
                            dy: -40,
                            dr: 0,
                            step: 270,
                            startAngle: 270
                        }
                    },
                    attrs: {
                        rect: {
                            width: 10,
                            height: 10,
                            stroke: 'black',
                            fill: 'blue',
                            magnet: 'passive'
                        }
                    }
                },
                'out': {
                    position: {
                        name: 'right',
                        args:{
                            dx: -5,
                            dy: -5,
                            dr: 0,
                            startAngle: 90
                        }
                    },
                    attrs: {
                        'text': {
                            'text': 'YES',
                            'font-size': 9,
                            'font-weight': 'bold',
                        },
                        rect: {
                            width: 10,
                            height: 10,
                            stroke: 'black',
                            fill: 'red',
                            magnet: 'active',

                        }
                    }
                },
                'outLeft': {
                    position: {
                        name: 'left',
                        args:{
                            dx: -5,
                            dy: -5,
                            dr: 0,
                            startAngle: 90
                        }
                    },
                    attrs: {
                        'text': {
                            'text': 'NO',
                            'font-size': 9,
                            'dx': 10,
                            'dy':-10,
                            'font-weight': 'bold',
                        },
                        rect: {
                            width: 10,
                            height: 10,
                            stroke: 'black',
                            fill: 'red',
                            magnet: 'active',

                        }
                    }
                }

            }
        }
    }, joint.shapes.devs.Model.prototype.defaults)
});
var conditionNode = new joint.shapes.devs.PathModel({
    markup: '<g class="rotatable"><g class="scalable"><path class="body"/></g><text class="label"/></g>',
    position: {
        x: 270,
        y: 12
    },
    size: {width: 70, height: 70},
    attrs: {
        path: {d: 'M 30 0 L 60 30 30 60 0 30 z', stroke: 'black', 'stroke-width': 1},
        text: {
            fill: 'black',
            'font-size': 11,
            text: 'Condition',
            'ref-y': '45%',
            'ref-x': '50%',
            'text-anchor': 'middle'
        }
    },
    ports: {
        items: [
            {group: 'in'},
            {group: 'out'},
            {group: 'outLeft'}
        ]
    },
    cellsDetail: {
        type: 'exclusive',
    }
});

/* =======================================
 * ACTION NODE
 * =======================================
 */

var actionNode = new joint.shapes.devs.Model({
    portMarkup: '<rect/>',
    position: {
        x: 130,
        y: 22
    },
    size: {width: 100, height: 40},
    inPorts: ['in1'],
    outPorts: ['out','out2'],
    ports: {
        groups: {
            'in': {
                position: {
                    name: 'top',
                    args:{
                        dx: -5,
                        dy: -5,
                        dr: 0,
                    }
                },
                attrs: {
                    '.port-label': {
                        fill:'transparent'
                    },
                    rect: {
                        width: 10,
                        height: 10,
                        stroke: 'black',
                        fill: 'blue',
                        magnet: 'passive'
                    }
                }

            },
            'out': {
                position: {
                    name: 'bottom',
                    args:{
                        dx: -5,
                        dy: -5,
                        dr: 0
                    }
                },
                attrs: {
                    '.port-label': {
                        fill:'transparent'
                    },
                    rect: {
                        width: 10,
                        height: 10,
                        stroke: 'black',
                        fill: 'red',
                        magnet: 'active'
                    }
                }
            }
        }
    },
    attrs: {
        '.label': { text: 'action', 'ref-x': .5, 'ref-y': .3 },
    }
});


stencilGraph.addCells([Start,End,actionNode,conditionNode]);


/* =======================================
 * DRAG AND DROP
 * =======================================
 */

stencilPaper.on('cell:pointerdown', function(cellView, e, x, y)
{
    var divFly= document.createElement("div");
    divFly.setAttribute('id', 'flyPaper');
    divFly.setAttribute('style',"position:fixed;z-index:100;opacity:0;pointer-event:none;");
    document.body.appendChild (divFly);
    var flyGraph = new joint.dia.Graph,
        flyPaper = new joint.dia.Paper({
            el: $('#flyPaper'),
            model: flyGraph,
            interactive: false
        }),
        flyShape = cellView.model.clone(),
        pos = cellView.model.position(),
        offset = {
            x: x - pos.x,
            y: y - pos.y
        };

    // flyShape.position(0, 0);
    flyGraph.addCell(flyShape);
    $("#flyPaper").offset({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y
    });
    $('body').on('mousemove.fly', function(e) {
        $("#flyPaper").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y
        });
    });
    $('body').on('mouseup.fly', function(e) {
        var x = e.pageX,
            y = e.pageY,
            target = paper.$el.offset();

        // Dropped over paper ?
        if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
            var s = flyShape.clone();
            s.position(x - target.left - offset.x, y - target.top - offset.y);
            graph.addCell(s);
        }
        $('body').off('mousemove.fly').off('mouseup.fly');
        flyShape.remove();
        $('#flyPaper').remove();
    });

});
/* =======================================
 * BUTTONS
 * =======================================
 */

function btnSave(){
    var Json = graph.toJSON(),
        addjson = JSON.stringify(Json);
        document.getElementById('configJSON').value = addjson
}

function btnDelete() {
    graph.clear();
}

function btnConvert() {
    var copyJson =  document.getElementById('configJSON').value;
    graph.fromJSON(JSON.parse(copyJson));
}
