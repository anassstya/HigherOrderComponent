import React from 'react';
import './Agregation.css';


const API_URL = import.meta.env.VITE_API_URL;
function YearTable(props) {
    console.log('YearTable', props);

    return (
        <div>
            <h2>Year Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {props.list.map(item => (

                    <tr>
                        <td>{item.year}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

function SortTable(props) {
    console.log('SortTable', props);

    return (
        <div>
            <h2>Sort Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {props.list.map(item => (
                    <tr>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

function MonthTable(props) {
    console.log('MonthTable', props);
    return (
        <div>
            <h2>Month Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                {props.list.map(item => (
                    <tr>
                        <td>{item.month}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

function WrapperComponent(props){
    const monthFiltered = props.list.filter(item => item.date.toDate().getMonth());
}

export default class Aggregation extends React.Component {
    state = {
        list: [],
        monthAggregated: [],
        yearAggregated: []
    };

    componentDidMount() {
        fetch(API_URL)
            .then(response => {
                if(!response){
                    throw new Error('Error')
                } else {
                    return response.json()
                }
            })
            .then( data => {
                    const list = data.list;
                    const monthFiltered = {};
                    const months = [
                        'January', 'February', 'March', 'April',
                        'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];

                    const yearFiltered = {};

                    list.forEach(item => {
                        const date = new Date(item.date);
                        const month = date.getMonth();
                        const year = date.getFullYear();

                        monthFiltered[month] = (monthFiltered[month] || 0) + item.amount;
                        yearFiltered[year] = (yearFiltered[year] || 0) + item.amount;
                    })

                    list.sort((a, b) => new Date(a.date) - new Date(b.date));

                    const monthAggregated = Object.entries(monthFiltered).map(([month, amount]) => ({
                        month: months[month],
                        amount
                    }));

                    const yearAggregated = Object.entries(yearFiltered).map(([year, amount]) => ({
                        year,
                        amount
                    }))



                    this.setState({list, monthAggregated, yearAggregated})
                }
            )
            .catch(error => {
                console.error(error)
            })

    }

    render() {
        const {list, monthAggregated, yearAggregated} = this.state;
        return (
            <div id="app">
                <MonthTable list={monthAggregated} />
                <YearTable list={yearAggregated} />
                <SortTable list={list} />
            </div>
        );
    }
}