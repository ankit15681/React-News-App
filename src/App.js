import React from 'react';
import './App.css';
import {formatDate,numberWithCommas} from './utils.js';
import NewsList from './NewsList';
import NewsItem from './NewsItem';
import SearchBar from './SearchBar';
import Filters from './Filters';


class App extends React.Component {
	
	constructor(){
		super();
		this.state = {
			noticias:[],
			selectedFilterCategory:"",
			selectedSortPreference:"",
			selectedSortPeriod:"",
			searchBarText:"",
			page:0
			
		};
		this.handleChangeCategories = this.handleChangeCategories.bind(this);
		this.handleChangePreference = this.handleChangePreference.bind(this);
		this.handleChangePeriod = this.handleChangePeriod.bind(this);
		this.handleChangeSearchBar = this.handleChangeSearchBar.bind(this);
		this.composeQuery = this.composeQuery.bind(this);
		this.handleClickButtonPage = this.handleClickButtonPage.bind(this);
		
	}
	handleChangeSearchBar(value){
		this.setState({searchBarText:value,page:0},() =>{
			this.getListaNoticias(this.composeQuery());
		});
	}
	handleChangeCategories(value){
		this.setState({selectedFilterCategory:value,page:0}
		, () =>{
			this.getListaNoticias(this.composeQuery());
		});
		
	}
	handleChangePreference(value){
		this.setState({selectedSortPreference:value,page:0}, () => {
				this.getListaNoticias(this.composeQuery());
		});
		
	}
	handleChangePeriod(value){
		
		this.setState({selectedSortPeriod:value,page:0}, () =>{
			this.getListaNoticias(this.composeQuery());
		});
		
		
	}
	handleClickButtonPage(value){
		let page = "";
		if(value === "next"){
			page = this.state.page + 1;
			
		}else if (value === "previous"){
			page = this.state.page - 1;
		}else if(!isNaN(value)){
			page = value;
			
		}
		this.setState({page:page}, () =>{
			this.getListaNoticias(this.composeQuery());
		});
		
	}
	queryChangePeriod(){
		let period = this.state.selectedSortPeriod;
		var d = new Date();
		let secNow = d.getTime() / 1000;
		
		let sec24h = secNow - (3600 * 24);
		let pastWeek = secNow - (3600 * 24 * 7);
		let pastMonth = secNow - (3600 * 24 * 7 * 30);
		let pastYear = secNow - (3600* 24 * 7 * 365);
		let query ="";
		switch (period){
			case "all":
			break;
			case "24h":
				query = "&numericFilters=created_at_i>"+sec24h;
			break;
			case "week":
				query = "&numericFilters=created_at_i>"+pastWeek;
			break;
			case "month":
				query = "&numericFilters=created_at_i>"+pastMonth;
			break;
			case "year":
				query = "&numericFilters=created_at_i>"+pastYear;
			break;
			
		}
		
		return query;
	}
	
	
	
	composeQuery(){
		
		
		//from
		let date = this.queryChangePeriod();
		//page
		let pageQ = "";
		if(this.state.page !== 0){
			pageQ = '&page='+this.state.page;
		}
		//tags
		let tags = "";
		if(this.state.selectedFilterCategory !== 'all' && this.state.selectedFilterCategory !== ''){
			tags = '&tags=' + this.state.selectedFilterCategory;
		}
		//sort
		let search ='search';
		if(this.state.selectedSortPreference === 'date'){
			search = 'search_by_date';
		}
		
		let query = 'https://hn.algolia.com/api/v1/'+search+'?query=' +this.state.searchBarText + tags + pageQ + date;//+ '&page=' + 
		
		return query;
	
	}
	
	
	
	getListaNoticias(url){
		//alert(url);
	  	fetch(url,{mode: 'cors'})
		.then(results => {
			console.error(this.props.url, results.toString())
			return results.json();
			
		}).then(data => {
			let nResults = numberWithCommas(data.nbHits);
			let tProcesamiento = data.processingTimeMS/1000;
			this.setState({nbPages: data.nbPages,page:data.page});
			
			let list = data.hits;
			console.log(list);
			let news = [];
			let key=0;
			for(let i=0;i<list.length;i++){
				
				let comment_text = list[i].comment_text;
				let title = list[i].title;				
				let url = list[i].url;
				let author = list[i].author;
				let num_comments = list[i].num_comments;
				let created_at = formatDate(list[i].created_at_i);//esto esta en segundos
				let points = list[i].points;
				let objectID = list[i].objectID;
				
				if(title !== null && title !== ""){
					news.push({
						title:title,
						url: url,
						author: author,
						num_comments: num_comments,
						created_at:created_at,
						points:points,
						key:key,
						type:'story',
						objectID: objectID
					});
					key = key+1;
				}else if(comment_text !== null && comment_text !== ""){ //prueba para meter comentarios
					news.push({
						title: (list[i].comment_text),
						url: url,
						author: author,
						num_comments: num_comments,
						created_at:created_at,
						points:points,
						key:key,
						type:'comment',
						objectID: objectID
					});
					key = key+1;
				}
			
			}
			console.log(news);
			let noticias = news.map((noticia) => 
				
				<NewsItem 
					points={noticia.points}
					title={noticia.title}
					url={noticia.url}
					author={noticia.author}
					num_comments={noticia.num_comments}		
					created_at={noticia.created_at}
					type={noticia.type}
					key={noticia.key}
					objectID={noticia.objectID}
				/>
			);
			this.setState({noticias:noticias});
			this.setState({nResults:nResults, tProcesamiento:tProcesamiento});
			
		})
	  
	  
  }
	
	componentDidMount(){
		
		
		this.getListaNoticias(this.composeQuery());
	}
	
  render() {
    return (
	<div>
	  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossOrigin="anonymous"/>
      <div className="menuSuperior">
		  <SearchBar 
			handleChangeSearchBar = {this.handleChangeSearchBar}
		  />
		  <Filters 
			  tProcesamiento={this.state.tProcesamiento}
			  nResults = {this.state.nResults}
			  handleChangeCategories = {this.handleChangeCategories}
			  handleChangePreference = {this.handleChangePreference}
			  handleChangePeriod = {this.handleChangePeriod}
			  page = {this.state.page}
		  />
	  </div>
	  <NewsList
		handleClickButtonPage={this.handleClickButtonPage}
		noticias={this.state.noticias}
		nbPages ={this.state.nbPages}
		page = {this.state.page}
	  />
	
	</div>
    );
  }
}

export default App;
