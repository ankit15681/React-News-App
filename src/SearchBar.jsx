import React from 'react';
import logoSearch from './logo-search.png';
import algolia from './algolia.svg';

class SearchBar extends React.Component{
	
	render(){
		return(
		<div className="searchBarMain">
				<img className="logoSearch" src={logoSearch}/>
				<p className="searchBarTitle">Hi, Ankit</p>
				<div className="searchBar">
					<i className="fa fa-search searchIcon"></i>
					<input type="text" className="searchBarInput" placeholder="Search stories by title, url or author"
						onChange={(e) => this.props.handleChangeSearchBar(e.target.value)}
					/>
				<p className="pAfterSearchBar">Search by</p>
				<img className="logoAfterSearch" src={algolia}/>
				</div>
				
				
				
				
			</div>
		);
	}
	
}

export default SearchBar;