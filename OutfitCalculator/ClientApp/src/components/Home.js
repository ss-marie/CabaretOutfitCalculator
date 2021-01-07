import React, { Component } from 'react';
import MakeoverItemButtons from './MakeoverItemButtons';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { makeoverItems: [], loading: true };
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <MakeoverItemButtons
                makeoverItems={this.state.makeoverItems}
            />;

        return (
            // Main page rendering area
            <div>
                <h1 id="tabelLabel" >Makeover Items</h1>
                {contents}
            </div>
        );
    }

    async populateData() {
        const response = await fetch('items');
        const data = await response.json();
        this.setState({ makeoverItems: data, loading: false });
    }
}
