import React from 'react';
import Book from './Book';
import AddBook from './AddBook';
import BookRows from './BookRows';
import BookAdd from './BookAdd';
import { Paper, List, Container, AppBar, Toolbar, Typography, Grid, Button} from "@material-ui/core";
import './App.css';
import BookDelete from './BookDelete';
import BookRetrieve from './BookRetrieve';
import BookUpdate from './BookUpdate';
import { call, signout } from "./service/ApiService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        // { id: "0", title: "title1", author: "author1", publisher: "publisher1", userId: "user1"},
        // { id: "1", title: "title2", author: "author2", publisher: "publisher2", userId: "user1"},
        // { id: "2", title: "title3", author: "author3", publisher: "publisher3", userId: "user1"},

      ],
      loading: true, // 로딩 중이라는 상태를 표현
      searchResult: {}, // BookRetireve클래스에서 사용
      searchResultForUpdate: {}, // BookUpdate클래스에서 사용
    };

  }
  componentDidMount() { // 작동 ok
    call("/book", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false }) // 로딩이 완료되었다는 표시
    );
  }

  add = (item) => { // 작동 ok
    call("/book", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {  // 작동 ok
    call("/book", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  // add = (item) => {
  //   const thisItems = this.state.items;
  //   item.id = "ID-" + thisItems.length; // key를 위한 id 추가
  //   thisItems.push(item); // 리스트에 아이템 추가
  //   this.setState({ items: thisItems }); // 업데이트
  //   console.log("add after items : ", this.state.items);
  // }
  
  // delete = (item) => {
  //   const thisItems = this.state.items;
  //   console.log("delete item: ", this.state.items)
  //   const newItems = thisItems.filter( e => e.id !== item.id);
  //   this.setState({ items: newItems }, () => {
  //     // 디버깅 콜백 나중에 구현
  //     console.log("delete after items: ", this.state.items)
  //   });
  // }
  deleteFromTitle = (item) => { // title하나만 들어있음. ok
    // const thisItems = this.state.items;
    // console.log("before delete item from title: ", this.state.items)
    // const newItems = thisItems.filter( e => e.title !== item.title);
    // const deleteItem = thisItems.filter( e => e.title === item.title); // retrieve메소드로 가져와야함
    // // call("/book", "DELETE", deleteItem).then((response) =>
    // //   this.setState({ items: response.data })
    // // );
    call(`/book/${item.title}`, "GET")
    .then((response) => {
      const deleteItem = response.data[0]; // 배열을 객체로 변환
      return call("/book", "DELETE", deleteItem);
    })
    .then((response) => {
      this.setState({ items: response.data });
    });
  }

  retrieve = (item) => {
    const title = item.title;
    call(`/book/${title}`, "GET").then((response) => {
      this.setState({ searchResult: response.data[0] }); // 받은 데이터가 배열=>하나를 추출
      console.log("set searchResult: ", this.state.searchResult)
    });

    
  }
  retrieveForUpdate = (item) => {
    const title = item.title;
    call(`/book/${title}`, "GET").then((response) => {
      this.setState({ searchResultForUpdate: response.data[0] }); // 받은 데이터가 배열=>하나를 추출
      console.log("set searchResultForUpdate: ", this.state.searchResultForUpdate)
    });

    
  }
  
  update = (item) => { // ok 문제점: 새로고침해야 테이블에 업데이트가 됨
    // 업데이트 하기
    call("/book", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );

  }

  render() {
    console.log("searchResultForUpdate:", this.state.searchResultForUpdate);
    var BookItems =this.state.items.length > 0 &&( // 리스트: 기존 코드
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
        <BookRows item={item} key={item.id} delete={this.delete} />
      ))}
      </tbody> 
    );
    // navigationBar추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">도서 관리</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )


    return (
      <div className="App">
        {navigationBar}{/**내비게이션 바 렌더링 */}
        <Container id="1" maxWidth="md">
          <AddBook />
          <div className="BookList">{BookItems}</div>

        </Container>
        <Container id="2">
          <div className="booktable">
            <table border="1px">
            <caption>Book item table</caption>
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>author</th>
                  <th>publisher</th>
                  <th>userId</th>
                  <th>삭제버튼</th>
                </tr>
              </thead>
              {/*<tbody>*/}
                {BookTables}
              {/*</tbody>*/}
            </table>
            
          </div>
        </Container>
        <Container id="3"> {/* 제품 정보 추가 UI 구현 */}
          <BookAdd add={this.add} />
        </Container>
        <Container id="4">
          <BookDelete deleteFromTitle={this.deleteFromTitle} />
        </Container>
        <Container id="5">
          <BookRetrieve retrieve={this.retrieve} searchResult={this.state.searchResult} />
        </Container>
        <Container id="6">
        <BookUpdate retrieveForUpdate={this.retrieveForUpdate} searchResultForUpdate={this.state.searchResultForUpdate} update={this.update} />
        </Container>
      </div>
    );
  }
}

export default App;
