import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          quotes:[],
          activeQuote: {},
          activeIndex : 0
        }
        this.size = 10;
      }

      componentDidMount(){
        this.getQuotes(this.size);
        
      }


      getQuotes(num) {
        axios.get(`https://thesimpsonsquoteapi.glitch.me/quotes?count=${num}`).then((resp)=>{
          let quotes = [];
          resp.data.forEach(element => {
            let quote = {};
            quote.quote = element.quote;
            quote.author = element.character;
            quotes.push(quote);
          });
          console.log("Size :::" + quotes.length)
          this.setState({
            quotes,
            activeQuote : quotes[0],
            activeIndex : 0
          })
        }) 
      }

      getRandomQuote = () => {
        let size = this.size
        let n =  Math.floor(Math.random()*(size-0)) + 0;
        console.log(n);
        if(n!=this.state.activeIndex) {
          console.log(n);
          let activeQuote = this.state.quotes[n];
          this.setState({
            activeIndex : n,
            activeQuote 
          })
          return;
        }
        this.getRandomQuote();
      }


      render() { 
        const { activeQuote } = this.state;
        return ( 
          <div id="quote-box">
            <q id = "text">
              {activeQuote.quote}
            </q>
            <div id ="author">
              ~ {activeQuote.author}
            </div>
            <div id = "footer">
              <div id = "tweet" >
              
              <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false"><FontAwesomeIcon icon={faTwitter}/></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>
              <div id ="quote-button">
                 <button onClick = {this.getRandomQuote}> New Quote </button>
              </div>
            </div>
           </div>
        )
      }
}
export { Home }