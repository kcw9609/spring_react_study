import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class BookRetrieve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { title: "" },
    };
    this.retrieve = props.retrieve;
  }

  onButtonClick = () => {
    const { item } = this.state;
    this.retrieve(item);
  };

  onInputChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      item: { ...prevState.item, title: value },
    }));
  };

  render() {
    const { item } = this.state;
    const { searchResult } = this.props;

    const author = searchResult.author || ""; // author가 없을 경우 빈 문자열로 설정
    const publisher = searchResult.publisher || ""; // publisher가 없을 경우 빈 문자열로 설정
    const userId = searchResult.userId || ""; // userId가 없을 경우 빈 문자열로 설정

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
            <TextField id="author" value={author} />
          </Grid>
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>publisher: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField id="publisher" value={publisher} />
          </Grid>
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>userid: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField id="userId" value={userId} />
          </Grid>
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
        </Grid>
        <div>
          <h3>검색:</h3>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      </Paper>
    );
  }
}

export default BookRetrieve;

