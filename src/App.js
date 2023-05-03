import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import SearchBar from './components/search';
import { fetchGames } from './actions/gameAction';

const App = ({ games, loading, error, fetchGames }) => {
    const searchGames = debounce((query) => {
        fetchGames(query);
    }, 500);

    useEffect(() => {
        fetchGames('');
    }, [fetchGames]);

    return (
        <div>
            <SearchBar onSearch={searchGames} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    games: state.games.list,
    loading: state.games.loading,
    error: state.games.error,
});

export default connect(mapStateToProps, { fetchGames })(App);
