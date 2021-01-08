import React, { Component } from 'react';
import MakeoverItemButtons from './MakeoverItemButtons';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            // Main page rendering area
            <div>
                <h1 id="tabelLabel" >Makeover Items</h1>
                <MakeoverItemButtons />
            </div>
        );
    }
}
