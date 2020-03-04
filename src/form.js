import React from "react";

import Line from './components/line';
import Curve from './components/curve';
import Fork from './components/fork';
import Endian from './components/endian'
import Cross from './components/cross';

export default class Form {
    constructor(type) {

        this.type = type;
        this.rotation = 0;
        this.solved = type === 1; // type 1 is an empty square thus always solved

        this._setConnectors();

        for (let i = 0; i <= Math.floor(Math.random() * 3); i++) {
            this.rotate();
        }
    }

    get figure(){
        switch(this.type){
            case 2: return ( <Endian /> );
            case 3: return ( <Curve /> );
            case 4: return ( <Line /> );
            case 5: return ( <Fork /> );
            case 6: return ( <Cross /> );
            case 1:
            default: return "";
        }
    }

    rotate() {
        this.rotation += 90;

        const connectors = { ...this.connectors };

        connectors.top = this.connectors.left;
        connectors.right = this.connectors.top;
        connectors.bottom = this.connectors.right;
        connectors.left = this.connectors.bottom;

        this.connectors = connectors;
    }

    _setConnectors(){
        this.connectors = {
            top: [2, 4, 5, 6].includes(this.type),
            right: [5,6].includes(this.type),
            bottom: [3,4,6].includes(this.type),
            left: [3,5,6].includes(this.type),
        };
    }
}
