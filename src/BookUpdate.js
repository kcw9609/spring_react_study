import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class BookUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { title: "" },
      updateItem: { id: "", title: "", author: "", publisher: "", userId: "" },
    };
    this.retrieve = props.retrieve;
  }

  onButtonClick = () => {
    const { item } = this.state;
    this.retrieve(item);
    this.copy();
  };
  onUpdateButtonClick = () => {
    
    console.log("updated after click button: ", this.state.updateItem );
  }

  onInputChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      item: { ...prevState.item, title: value },
    }));
  };

  copy = () => { // 복사
    const { searchResult } = this.props;
    const { updateItem } = this.state;

    const id = searchResult.id;
    const title = searchResult.title || "";
    const author = searchResult.author || ""; // author가 없을 경우 빈 문자열로 설정
    const publisher = searchResult.publisher || ""; // publisher가 없을 경우 빈 문자열로 설정
    const userId = searchResult.userId || ""; // userId가 없을 경우 빈 문자열로 설정

    updateItem.id = id;
    updateItem.title = title;
    updateItem.author = author;
    updateItem.publisher = publisher;
    updateItem.userId = userId;

    this.setState({ updateItem: updateItem });
  };

  onInputChangeTextField = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      updateItem: { ...prevState.updateItem, [id]: value },
    }));
  };

  render() {
    const { item, updateItem } = this.state; // 객체 복사

    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>title: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="title"
              placeholder="add here"
              onChange={this.onInputChange}
              value={item.title}
            />
          </Grid>
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>author: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="author"
              value={updateItem.author}
              onChange={this.onInputChangeTextField}
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>publisher: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="publisher"
              value={updateItem.publisher}
              onChange={this.onInputChangeTextField}
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>userId: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="userId"
              value={updateItem.userId}
              onChange={this.onInputChangeTextField}
            />
          </Grid>
        </Grid>

        <Grid>
          
          <Grid xs={4} md={4} item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              제품 검색
            </Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onUpdateButtonClick}
            >
              제품 수정
            </Button>
          </Grid>
        </Grid>
        <div><h3>검색 결과:</h3>
          <pre>{JSON.stringify(this.state.updateItem, null, 2)}</pre>
        </div>
      </Paper>
    );
  }
}

export default BookUpdate;


