import React, {useState} from 'react';
import './dateItem.css';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');
function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}
function DateTimePretty(Component) {
    return function (props){
        const date = moment(props.date).locale('ru');
        return (
            <Component {...props} date={date.fromNow()}/>
        )
    }
}

const DateTimeWithPretty = DateTimePretty(DateTime);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} allow="autoplay; encrypted-media" ></iframe>
            <DateTimeWithPretty date={props.date} />
        </div>
    )
}
function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} key={item.id}/>);
}

export default function DateFormat() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2025-04-20 13:24:00',
            id: 1
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00',
            id: 2
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00',
            id: 3
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00',
            id: 4
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00',
            id: 5
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00',
            id: 6
        },
    ]);

    return (
        <div className={'container'}>
            <VideoList list={list} />
        </div>
    );
}