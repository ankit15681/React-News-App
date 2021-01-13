import React from 'react';


class Filters extends React.Component{
	
	render(){
		
		
		return(
			<div className="filters">
				<div className="filtersLeft">
					
					<p className="pFilters">Search</p>
					
					<select id="categoriesSelect"  
					onChange={(e) => this.props.handleChangeCategories(e.target.value)}
					>
					  <option value="all">All</option>
					  <option value="story">Stories</option>
					  <option value="comment">Comments</option>
					</select>
					
					<p className="pFilters">by</p>
					
					<select id="preferenceSelect"  onChange={(e) => this.props.handleChangePreference(e.target.value)}>
					  <option value="popularity">Popularity</option>
					  <option value="date">Date</option>				  
					</select>
					
					<p className="pFilters">for</p>
					
					<select id="periodSelect" onChange={(e) => this.props.handleChangePeriod(e.target.value)}>
						 <option value="all">All Time</option>
						 <option value="24h">Last 24 hours</option>				  
						 <option value="week">Past Week</option>
						 <option value="month">Past Month</option>
						 <option value="year">Past Year</option>	
					</select>
					
				</div>
				
				<div className="filtersRight">
					<p className="pFiltersResults">{this.props.nResults} results ({this.props.tProcesamiento} seconds)</p>
				</div>
			</div>
		);
	}
}
export default Filters;