import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import SearchBar from './components/search';
import { fetchGames } from './actions/gameAction';
import { saveKey } from './actions/keyAction';
import './styles/App.scss'


const KeyIcon = (props) => (
    <svg
        className={'searchIcon'}
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        style={{
            fill: "#fff",
        }}
    >
        <path d="M7 17a5.007 5.007 0 0 0 4.898-4H14v2h2v-2h2v3h2v-3h1v-2h-9.102A5.007 5.007 0 0 0 7 7c-2.757 0-5 2.243-5 5s2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z" />
    </svg>
)


const App = ({ games, loading, error, keyError, fetchGames }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(1);

    const [inputApiKey, setInputApiKey] = useState('');
    const dispatch = useDispatch();
    const [storedApiKey, setStoredApiKey] = useState('');

    useEffect(() => {
        window.addEventListener('beforeunload', clearLocalStorage);

        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage);
        };
    }, []);

    const clearLocalStorage = () => {
        localStorage.clear();
    };

    const handleApiKeyChange = (event) => {
        setInputApiKey(event.target.value);
    }
    useEffect(() => {
        const sap = localStorage.getItem('apiKey');
        new Promise(resolve => setTimeout(resolve, 1000)).then(()=>{
            setStoredApiKey(sap)
        });
    })


    useEffect(() => {
        const delay = setTimeout(() => {
            fetchGames(searchTerm, page);
        }, 500);
        return () => clearTimeout(delay);
    }, [fetchGames, searchTerm, page]);

    const handleSearch = (query) => {
        setSearchTerm(query);
        settotalPages(parseInt(localStorage.getItem('pages')))
    };

    const handleSaveKey = () => {
        dispatch(saveKey(inputApiKey));
        fetchGames(searchTerm, page);
        settotalPages(parseInt(localStorage.getItem('pages')))
    }
    useEffect(() => {
        settotalPages(parseInt(localStorage.getItem('pages')))
    })
    const handleChangePage = event => {
        const inputValue = parseInt(event.target.value);

        if(inputValue > 0 && inputValue <= totalPages) {
            setPage(inputValue);
        } else if(inputValue < 1) {
            setPage(1);
        } else {
            setPage(totalPages);
        }
    };


    if(storedApiKey){
        return (
            <div>
                <div className={'header'}>
                    <SearchBar onSearch={handleSearch} isDisabled={false}/>
                    <div className={'searchboxContainer1'} >

                        <KeyIcon />
                        <input className={'rightinput'} type="text" value={inputApiKey} onChange={handleApiKeyChange} />

                    </div>
                    <button className={'rightbutton'} onClick={handleSaveKey}>Save API Key</button>

                </div>
                <div>

                    <div className={'containerforgames'}>
                        {keyError && <p>{keyError}</p>}
                        {loading}
                        {error && <p>{error}</p>}
                        {games.map((game) => (
                            <div key={game.id} className={'oneGame'}>
                                <div className={'image'} style={{
                                    backgroundImage: `url("${game.background_image}")`
                                }}/>                                <div className={'imagespan-container'}>
                                    <span className={'imagespan'}>{game.name}</span>
                                        {game.platforms.map((platform, index) => (
                                            <span key={platform.platform.id} className={'imagedesc'}>{platform.platform.name}{index !== game.platforms.length - 1 ? ', ' : ''}</span>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <input className={'pagination'} placeholder={'Page'} type={"number"} value={page} onChange={handleChangePage} disabled={false}/>
            </div>
        );
    }else{
        return (
            <div>
                <div className={'header'}>

                    <SearchBar onSearch={handleSearch} isDisabled={true}/>

                    <div className={'searchboxContainer1'}>

                        <KeyIcon />
                        <input className={'rightinput'} type="text" value={inputApiKey} onChange={handleApiKeyChange} />

                    </div>
                    <button className={'rightbutton'} onClick={handleSaveKey}>Save API Key</button>
                </div>
                <div className={'containerforgames'}>
                    {keyError && <p>{keyError}</p>}
                </div>
                <div className={'laeblcont'}>
                    <span className={'label'}>Go to page</span>
                    <input  className={'pagination'} value={page} onChange={handleChangePage} disabled={true}/>
                </div>


            </div>
        );
    }

};

const mapStateToProps = (state) => ({
    games: state.games.list,
    loading: state.games.loading,
    error: state.games.error,
    apiKey: state.key.apiKey,
    keyError: state.key.keyError
});

export default connect(mapStateToProps, { fetchGames })(App);
