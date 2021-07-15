import { css } from 'lit';

 export const style = css`.textarea {
  grid-column: 1/3;
}
.textarea > * {
  display: block;
  width: 100%;
}

textarea {
  height: 200px;
}

input[type=text],
input[type=email] {
  padding: 0.5em 0.5em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid gray;
  font-size: 12pt;
}

input[type=checkbox] {
  height: 1rem;
  width: 1rem;
}`;
