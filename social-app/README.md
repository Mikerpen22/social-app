### Project information:

- NetId: ms198
- Frontend: https://half-good-ms198.surge.sh
- Backend: https://msonrails.herokuapp.com/
- Slipday used: 1

### Currenrt issues:

- complexity of the website is too high without redux.
- testing coverage is difficult to reach 80% given states are separated in each component
  - Test Suites: 2 failed, 2 passed, 4 total
  - Tests: 2 failed, 5 passed, 7 total
  - Snapshots: 0 total
  - Time: 3.017 s, estimated 4 s
- Still having trouble figuring out the search function, since I choose not to use redux, I'm not sure how to access the feed components state from the search component(they are parallel level-wise)

### Next Step:

- Considering a total rewrite in order to add redux?
