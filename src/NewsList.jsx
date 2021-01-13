import React from 'react';


class NewsList extends React.Component {
	
	componerLiPages(nPages){
		var lis = [];
		if(nPages > 1 && this.props.page !== 0){ //boton "<"
			lis.push(<li className="liPages"><button 
			onClick={(e) => this.props.handleClickButtonPage(e.target.value)}
			value="previous">{"<"}</button></li>);
		}
		if(nPages <= 5){ //Si hay menos de 5 paginas
			for(let i = 0; i < nPages; i++){
				lis.push(<li className="liPages"><button 
				className={this.props.page === i ? "buttonHighlighted": ""}
				onClick={(e) => this.props.handleClickButtonPage(e.target.value)}
				value={i}>{i}</button></li>);
			} 
		}else{//Si hay mas de 5 paginas
			let cont = 0;
			//el primer boton se pone a fuego
			lis.push(<li className="liPages"><button value="0"
			className={this.props.page === 0 ? "buttonHighlighted": ""}
					onClick={(e) => this.props.handleClickButtonPage(e.target.value)}
					>0</button></li>);
			
			for(let i = this.props.page-3; i < this.props.page + 5 ; i++){
				
				if(i >= 1 && i < (nPages-1) && cont <6){ //calculamos que haya siempre 5 botones y el ultimo y el primero siempre lo ponemos a fuego
					lis.push(<li className="liPages"><button value={i}
					className={this.props.page === i ? "buttonHighlighted": ""}
					onClick={(e) => this.props.handleClickButtonPage(e.target.value)}
					>{i}</button></li>);
					cont ++;
				}
			} 
		//	lis.push(<li className="liPages"><button value="..." disabled>...</button></li>)
			
			lis.push(<li className="liPages"><button value={nPages-1} // el ultimo boton se pone a fuego tambien
			className={this.props.page === (nPages-1) ? "buttonHighlighted": ""}
			onClick={(e) => this.props.handleClickButtonPage(e.target.value)}
			>{nPages-1}</button></li>);
		}
		if(nPages > 1 && this.props.page !== (nPages-1)){ //boton ">"
			lis.push(<li className="liPages"><button value="next"
			onClick={(e) => this.props.handleClickButtonPage(e.target.value)}
			>{">"}</button></li>);
		}
		return lis;
	}
	render() {
		return (
		<div className="newsList">
			
			{this.props.noticias}
			
			<div className="divPages">
				<ul className="ulPages">
					{this.componerLiPages(this.props.nbPages)}		
				</ul>
			</div>
		</div>
		);
	}
}
export default NewsList;