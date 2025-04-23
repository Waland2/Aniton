
import api from "../main";
import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../AppContext';
import { formatTime } from "../utils";

function AnimeForm({timeoutSeconds, setTimeoutSeconds, setIsResultVisible, setLastAnimeResult, setIsTasksVisible}) {
    const {user, setUser} = useContext(AppContext);  

    const [animeName, setAnimeName] = useState(''); 
    const [selectedType, setSelectedType] = useState('');
    const [episodeCount, setEpisodeCount] = useState(1);
    const [isSliderDisabled, setIsSliderDisabled] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    let [isFormCompleted, setIsFormCompleted] = useState(false);
    const [isTimeout, setIsTimeout] = useState(true);

    useEffect(() => {
        if (selectedType === 'Фильм' || selectedType === 'Короткометражка') {
            setIsSliderDisabled(true);
            setEpisodeCount(1);
        } else {
            setIsSliderDisabled(false);
        }

        if (animeName !== "" && selectedType !== "") {
            setIsFormCompleted(true);
        } else {
            setIsFormCompleted(false)
        }

    }, [selectedType, animeName]);

    useEffect(() => {
        if (timeoutSeconds > 0) {
            if (!isTimeout) setIsTimeout(true);
        }
        else setIsTimeout(false);

    }, [timeoutSeconds]);

    const toggleFormVisibility = () => {
        if (isFormVisible) {
            setAnimeName('');
            setSelectedType('');
            setEpisodeCount(1);
            setAnimeName('');
            setIsSliderDisabled(false);
            setIsFormCompleted(false);
            setIsTasksVisible(true)
        }else {
            setIsTasksVisible(false)
        }
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = () => {
        setTimeoutSeconds(3);
        api.post("game/createanime", { name: animeName, type: selectedType, number_of_series: episodeCount })
            .then(resp => {
                let data = resp.data
                console.log(data);
                setLastAnimeResult(data);
                setIsResultVisible(true);
                setTimeoutSeconds(data.timeout)
                setUser({ ...user, money: user.money + data.money_profit, influence: user.influence + data.influence_profit })
                toggleFormVisibility()
            })
            .catch(error => {
                let data = error.response.data;
                if (data.error === "timeout") setTimeoutSeconds(data.time_to_end);
            })
    };

    return <>
        <div className="create-div">
            <button
                disabled={isTimeout}
                id="create-btn"
                className={isFormVisible ? "hidden" : ""}
                onClick={toggleFormVisibility}>
                {isTimeout ? `Осталось: ${formatTime(timeoutSeconds)}` : "Новое аниме!"}
            </button>
        </div>

        {
            isFormVisible && (
                <div className="anime-form">
                    <button onClick={toggleFormVisibility} className="cancel-creation-btn">Отмена</button>
                    <input
                        type="text"
                        id="anime-title"
                        placeholder="Название"
                        className="input"
                        onChange={e => setAnimeName(e.target.value)}
                    />

                    <div className="type-buttons">
                        {['Сериал', 'Фильм', 'Короткометражка'].map((type) => (
                            <button
                                key={type}
                                className={`type-button ${selectedType === type ? 'selected' : ''}`}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="slider-container">
                        <label htmlFor="episode-slider">
                            Количество серий: {episodeCount}
                        </label>
                        <input
                            type="range"
                            id="episode-slider"
                            min="1"
                            max="36"
                            value={episodeCount}
                            onChange={(e) => setEpisodeCount(e.target.value)}
                            className="slider"
                            disabled={isSliderDisabled}
                        />
                    </div>

                    <button disabled={!isFormCompleted} className="submit-btn" onClick={handleSubmit}>Создать!</button>
                </div>
            )
        }</>
}

export default AnimeForm;
