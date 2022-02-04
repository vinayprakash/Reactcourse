import React,{ Component, useState, useEffect} from "react";
import ReactDOM from 'react-dom';

//--> below is written using useState.
// const App = () => {
// const [count, setCount] = useState(0);

// const increment = () => {
//   setCount(count + 1);
// };

// return (
//   <div> 
//     <h2> counter App</h2>
//     <button onClick={increment}> clicked {count} times 
//           </button>
//   </div>
// );

// };


// class App extends Component {
//   state = {
//     count: 0
//   }

//   increment = () => {
//     this.setState ({
//       count: this.state.count+ 1
//     });
//   }


//   render(){ 
//     return (
//         <div> 
//         <h2> counter App</h2>
//         <button onClick={this.increment}> clicked {this.state.count} times 
//         </button>
//       </div>
//     );
  
//   }
// }

//-> use effect hook
// class App extends Component {
//     state = {
//       count: 0
//     }
  
//     increment = () => {
//       this.setState ({
//         count: this.state.count+ 1
//       });
//     };

//     componentDidMount(){
//       document.title = `clicked ${this.state.count} times`
//     }
  
//     componentDidUpdate(){
//       document.title = `clicked ${this.state.count} times`
//     }
  
//     render(){ 
//       return (
//           <div> 
//           <h2> counter App</h2>
//           <button onClick={this.increment}> clicked {this.state.count} times 
//           </button>
//         </div>
//       );
    
//     }
//   }

//--> using Effect

//  const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
// document.title = `clicked ${count} times`;

//   });
  
//   const increment = () => {
//     setCount(count + 1);
//   };
  
//   return (
//     <div> 
//       <h2> counter App</h2>
//       <button onClick={increment}> clicked {count} times 
//             </button>
//     </div>
//   );
  
//   };


const App = () => { 
// state 
 const [news, setNews] = useState([]);
 const [searchQuery, setSearchQuery] = useState('react')
 const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react');
 const [loading, setLoading] = useState(false);


 // fetch news
 const fetchNews = () => {
   //set loading
   setLoading(true)
fetch(url)
.then(result => result.json())
.then(data => (setNews(data.hits), setLoading(false)))
.catch(error => console.log(error));
 };

 useEffect(() => {
   fetchNews();
 }, [url]);

const handleChange = (e) => {
setSearchQuery(e.target.value)
}

const handleSubmit = e => {
  e.preventDefault()
  setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
};

 const showLoading = () => (loading ? <h2>Loading...</h2> : "");

const searchForm =() => (
<form onSubmit={handleSubmit}>
       <input type ='text' value={searchQuery} onChange={handleChange}/>
       <button>Search</button>
     </form>

)

const showNews = () => (
  news.map((n, i) => (<p key={i}>{n.title}</p>))
)

 return (
   <div>
     <h2>news</h2>
     {showLoading()}
     {searchForm()}
     
     {showNews()}
   </div>
 )
};

export default App;
