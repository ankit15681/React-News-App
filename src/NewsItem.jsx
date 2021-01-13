import React from 'react';



class NewsItem extends React.Component{
	render (){
		let title = ""
		if(this.props.type === 'comment'){
			title = (<div className ="newsTitleDiv" dangerouslySetInnerHTML ={{__html: this.props.title}}></div>);
		}else{
			title = (<div><p className="newsTitle">{this.props.title} <span><a href={this.props.url}>({this.props.url})</a></span></p></div>);
		}
		return(
			<div className="newsItem">
			{title}
				
				<div className="divSpans">
					<span><a href={"https://news.ycombinator.com/item?id=" + this.props.objectID}>{this.props.points} points</a> </span> 
					<span className="separador">|</span> 
					<span><a href={"https://news.ycombinator.com/user?id=" + this.props.author}>{this.props.author}</a></span>
					<span className="separador">|</span>
					<span><a href={"https://news.ycombinator.com/item?id=" + this.props.objectID}>{this.props.created_at}</a></span>
					<span className="separador">|</span>
					<span><a href={"https://news.ycombinator.com/item?id=" + this.props.objectID}>{this.props.num_comments} comments</a></span>
					<span className="separador">|</span>
					
				</div>
			</div>
		);
	}
	
}

export default NewsItem;

