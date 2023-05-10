import React from 'react';
import Book from './Book';
import AddBook from './AddBook';
import BookRows from './BookRows';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: "0", title: "title1", author: "author1", publisher: "publisher1"},
        { id: "1", title: "title2", author: "author2", publisher: "publisher2"}
      ],
    };
  }
  
  delete = (item) => {
    const thisItems = this.state.items;
    console.log("delete item: ", this.state.items)
    const newItems = thisItems.filter( e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      // 디버깅 콜백 나중에 구현
      console.log("delete after items: ", this.state.items)
    });
  }
  render() {
    var BookItems =this.state.items.length > 0 &&(
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Book item={item} key={item.id} delete={this.delete} />
          ))}
        </List>
      </Paper>
    );

    var BookTables =this.state.items.length > 0 &&(
      
      <tbody>
      {this.state.items.map((item, idx) => (
        <BookRows item={item} key={item.key} delete={this.delete} />
      ))}
</tbody> 
    );


    return (
      
      <div className="App">
        <Container maxWidth="md">
          <AddBook />
          <div className="BookList">{BookItems}</div>

        </Container>
        <Container>
          <div className="booktable">
            <table>
            <caption>Book item table</caption>
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>author</th>
                  <th>publisher</th>
                  <th>삭제버튼</th>
                </tr>
              </thead>
              {/*<tbody>*/}
                {BookTables}
              {/*</tbody>*/}
            </table>
            
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
