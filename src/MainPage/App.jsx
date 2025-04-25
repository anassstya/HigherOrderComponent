import { useState } from 'react'
import './App.css';
import DateFormat from "../Format Publication Date/DateFormat.jsx";
import Wrapper from "../Popular and New/Wrapper.jsx";
import Aggregation from "../DataAgregation/Agregation.jsx";
export default function App() {
    const [currentPage, setCurrentPage] = useState(null);

    const handleButtonClick = (page) => {
        setCurrentPage(page);
    };
    const handleBackClick = () => {
        setCurrentPage(null);
    };

    return(
        <div className={'mainPage'}>
            <div>
                {currentPage === null ? (
                    <>
                        <button className={'mainPage__btn'} onClick={() => handleButtonClick('DateFormat')}>
                            Форматирование даты публикации
                        </button>
                        <button className={'mainPage__btn'} onClick={() => handleButtonClick('PopularAndNew')}>
                            Популярное и новое
                        </button>
                        <button className={'mainPage__btn'} onClick={() => handleButtonClick('Aggregation')}>
                            Агрегация данных для таблиц
                        </button>

                    </>
                ) : (
                    <button className={'mainPage__btn'}  onClick={handleBackClick}>Назад</button>
                )}
            </div>
            {currentPage === 'DateFormat' && <DateFormat />}
            {currentPage === 'PopularAndNew' && <Wrapper />}
            {currentPage === 'Aggregation' && <Aggregation />}
        </div>
    )
}

