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

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        // { id: "0", title: "title1", author: "author1", publisher: "publisher1", userId: "user1"},
        // { id: "1", title: "title2", author: "author2", publisher: "publisher2", userId: "user1"},
        // { id: "2", title: "title3", author: "author3", publisher: "publisher3", userId: "user1"},

      ],
      selectedTabValue: 0,
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
    try{
      call("/book", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
    }catch(e){
      alert("다시 시도해 주세요.")
    };
    
  };

  delete = (item) => {  // 작동 ok
    call("/book", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    ).catch(alert("다시 시도해주세요."))
  };


  deleteFromTitle = (item) => { // title하나만 들어있음. ok

    call(`/book/${item.title}`, "GET")
    .then((response) => {
      const deleteItem = response.data[0]; // 배열을 객체로 변환
      return call("/book", "DELETE", deleteItem);
    })
    .then((response) => {
      this.setState({ items: response.data });
    })
    .catch((error) => {
      alert("해당 도서가 존재하지 않습니다");
      console.error("해당 도서가 존재하지 않습니다");

    });
  }

  retrieve = (item) => {
    
      const title = item.title;
      call(`/book/${title}`, "GET").then((response) => {
        if(response.data[0]){ // 추가기능: 예외처리
        this.setState({ searchResult: response.data[0] }); // 받은 데이터가 배열=>하나를 추출
        console.log("set searchResult: ", this.state.searchResult);
        }else {alert("다시 시도해주세요.");}
      }); 
    
  }
  retrieveForUpdate = (item) => {
    const title = item.title;
    call(`/book/${title}`, "GET").then((response) => {
      if(response.data[0]){
      this.setState({ searchResultForUpdate: response.data[0] }); // 받은 데이터가 배열=>하나를 추출
      console.log("set searchResultForUpdate: ", this.state.searchResultForUpdate)
      }else {alert("다시 시도해주세요.");}
    });

    
  }
  
  update = (item) => {
    // 업데이트 하기
    call("/book", "PUT", item) // 수정
      .then(() => call("/book", "GET")) // 리스트를 적용
      .then((response) => {
        this.setState({ items: response.data });
        console.log("update: "+JSON.stringify(response, null, 3));
      } 
      );
      
  }

  /*
  
   add = (item) => { // 작동 ok
    call("/book", "POST", item).then((response) => this.setState({ items: response.data })
    );
  };
  
  */

  CenteredTabs = () => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  }

  tabsChanged = (event, selectedTabValue) => { // 인덱스 값을 받아옴
    // tab번호 설정
    this.setState({ selectedTabValue : selectedTabValue });
  };

  render() {
    // console.log("searchResultForUpdate:", this.state.searchResultForUpdate);
    var BookItems = (this.state.items.length > 0 &&( // 리스트: 기존 코드
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Book item={item} key={item.id} delete={this.delete} />
          ))}
        </List>
      </Paper>
    )
    )

    
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

    var addBook = (<Container id="1" maxWidth="md">
          <AddBook />
          <div className="BookList">{BookItems}</div>

        </Container>)
        

    var BookTables = (this.state.items.length > 0 &&(
          <tbody>
            
          {this.state.items.map((item, idx) => (
            <BookRows item={item} key={item.id}  /> 
          ))}
          </tbody> 
        )
    )
    var booktable = (
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
                  <th>link</th>
                  
                </tr>
              </thead>
              {/*<tbody>*/}
                {BookTables}
                
              {/*</tbody>*/}
            </table>
            
          </div>
        </Container>
    )
    var bookadd = (
      <Container id="3"> {/* 제품 정보 추가 UI 구현 */}
          <BookAdd add={this.add} />
        </Container>
    )
    var bookdelete = (
      <Container id="4">
          <BookDelete deleteFromTitle={this.deleteFromTitle} />
        </Container>
        
    )
    var bookretrieve = (
      <Container id="5">
          <BookRetrieve retrieve={this.retrieve} searchResult={this.state.searchResult} />
        </Container>
    )
    var bookupdate = (
      <Container id="6">
        <BookUpdate retrieveForUpdate={this.retrieveForUpdate} searchResultForUpdate={this.state.searchResultForUpdate} update={this.update} />
        </Container>
    )

    
    return (
      <div className="App">
        {navigationBar}{/**내비게이션 바 렌더링 */}
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs centered onChange={this.tabsChanged}>
            <Tab value = {1} label="Add" />
            <Tab value = {2} label="Delete" />
            <Tab value = {3} label="Retrieve " />
            <Tab value = {4} label="Update" />
          </Tabs>
        </Box>
        {this.state.selectedTabValue === 1 && bookadd}
        {this.state.selectedTabValue === 2 && bookdelete}
        {this.state.selectedTabValue === 3 && bookretrieve}
        {this.state.selectedTabValue === 4 && bookupdate}
        {booktable}{/**테이블 */}
        
      </div>
    );
  }
}

export default App;