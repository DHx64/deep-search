# Deep Search

MADE BY: dionya_z, made another repo because @dionya_z/deep-search does not exist anymore, tried contacting maintainer but no response.

Library that implements deep search in any arrays by keywords. Finds elements which can include infinite nested objects.
Takes only two parameters: keyword and array and one optional parameter: "excluded" object that contains two properties: "props" - array of keys you need to exclude from search and "isInAllNesting" - boolean that defines exclude your "props" from all nesting or only from the first level of nesting and returns a filtered array.

## Instructions

- Create any array with many nesting
- Use it as initial state
- Create text input that reacts on change
- Use function from this library to filter initial array by passing input value as first parameter and initial array as second parameter
- Use setState (or any other action that re-renders component) to set filtered array
- Render this array in return section

## Usage example

Below you can see a React.js usage example, but you can also use it with Vue.js, Angular.js, React Native and other JavaScript entities or frameworks.

```js
import React, { useState } from "react";

const boxes = [
  {
    id: 1,
    width: 150,
    height: 150,
    color: "Aqua",
  },
  {
    id: 2,
    width: 150,
    height: 100,
    color: "Yellow",
  },
  {
    id: 3,
    width: 180,
    height: 200,
    color: "AntiqueWhite",
    // Additional nested object:
    nestedBox: {
      anotherNestedBox: {
        width: 300,
        height: 200,
        content: [
          "Flashlight",
          "Toy",
          {
            anotherNestedBox: {
              isNested: true,
              id: 1,
              anythingElse: [
                "Hello",
                {
                  o: "World",
                  weirdNesting: {
                    someProp: "Love letter",
                  },
                },
                999,
              ],
            },
          },
        ],
      },
    },
  },
];

export const BoxesComponent = () => {
  const [filteredBox, setFilteredBox] = useState(boxes);
  const [searchInputValue, setSearchInputValue] = useState("");

  const findBoxes = (e) => {
    setSearchInputValue(e.target.value);
    setFilteredBox(
      deepSearch(
        e.target.value,
        boxes,
        // Optional object to exclude some
        // props from search
        {
          props: ["id", "width"],
          isInAllNesting: true,
        }
      )
    );
  };

  return (
    <div>
      <label htmlFor="input">Find boxes by infinite nesting</label>
      <input id="input" onChange={findBoxes} value={searchInputValue} />

      <div>
        {filteredBox.map((box) => (
          <div
            key={box.id}
            style={{
              background: box.color,
              height: box.height,
              width: box.width,
            }}
          >
            <div>Width: {box.width}</div>
            <div>Height: {box.height}</div>
            <div>Color: {box.color}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
```
